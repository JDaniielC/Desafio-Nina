from .db_exceptions import MonthNumberException
from sqlalchemy import create_engine
from sqlalchemy.sql import func
from sqlalchemy.orm import Session
from settings import Settings
from models import User, Complaint
from datetime import datetime

DATE_FORMAT = "%Y-%m-%d"
engine = create_engine(Settings().DATABASE_URL) 

class Database:
    def __increment_count(self, d: dict, key: str):
        """ Increments the value of a key in a dictionary. """
        if key not in d:
            d[key] = 0
        d[key] += 1

    def __get_age(self, birthdate: datetime):
        """ Returns an age in years based on the birthdate and the current date. """
        today = datetime.today()
        age = today.year - birthdate.year
        if (today.month, today.day) < (birthdate.month, birthdate.day):
            age -= 1
        return age

    def __get_age_group(self, birthdate: datetime):
        """ Returns a string representing an age_group based on the birthdate. """
        age = self.__get_age(birthdate)
        
        if age < 14:
            return "< 14"
        if age <= 18:
            return "14 - 18"
        if age <= 29:
            return "19 - 29"
        if age <= 39:
            return "30 - 39"
        if age <= 49:
            return "40 - 49"
        if age <= 59:
            return "50 - 59"
        return "> 60"
    
    def __translate_month_int_to_name(self, month_num: int):
        """ Translates a month number to its name. """
        months = {
            1: "Jan",
            2: "Fev",
            3: "Mar",
            4: "Abr",
            5: "Mai",
            6: "Jun",
            7: "Jul",
            8: "Ago",
            9: "Set",
            10: "Out",
            11: "Nov",
            12: "Dez",
        }

        try:
            month_name = months[month_num]
        except:
            raise MonthNumberException("Month Number outside of range (1 .. 12).")

        return month_name

    def __get_all_complaints(self):
        """ Returns all complaints from the database. """
        with Session(engine) as session:
            return session.query(Complaint).all()
    
    def __complaint_user_treatment(self, complaints: list):
        """ Returns a list of complaints with user data. """
        complaints_with_user_data = []
        for complaint, user in complaints:
            complaint = complaint.__dict__
            user = user.__dict__
            for key, value in user.items():
                complaint[f'user_{key}'] = value
            complaints_with_user_data.append(complaint)

        return complaints_with_user_data

    def get_complaints_filter(self, start_date: str = None, end_date: str = None):
        """ Returns a list of filters to be used in a query. """
        filters = list()
        if start_date is not None:
            filters.append(Complaint.date >= start_date)
        if end_date is not None:
            filters.append(Complaint.date <= end_date)

        return filters
    
    def get_complaints(self, start_date: str = None, end_date: str = None):
        """ Returns all complaints with user data. """
        with Session(engine) as session:
            filters = self.get_complaints_filter(start_date, end_date)
            complaints = (session
                .query(Complaint, User)
                .join(User, Complaint.user_id == User.id)
                .filter(*filters)
                .order_by(Complaint.id)
                .all())
            return self.__complaint_user_treatment(complaints)
        
    def get_complaints_with_pagination(self, start_date: str = None,
                                       end_date: str = None, page: int = 1,
                                       limit: int = 6):
        """ Returns a list of complaints with user data and pagination. """
        offset = (page - 1) * limit
        with Session(engine) as session:
            filters = self.get_complaints_filter(start_date, end_date)
            complaints = (session
                .query(Complaint, User)
                .join(User, Complaint.user_id == User.id)
                .filter(*filters)
                .order_by(Complaint.id)
                .offset(offset)
                .limit(limit)
                .all())
            total_complaints = (session
                .query(Complaint)
                .filter(*filters)
                .count())
            total_pages = (total_complaints / limit) + 1
            complaints = self.__complaint_user_treatment(complaints)
            return complaints, total_pages
        
    def get_complaint(self, _id: str = None):
        """ Returns a complaint with user data. """
        with Session(engine) as session:
            complaints = (session
                         .query(Complaint, User)
                         .join(User, Complaint.user_id == User.id)
                         .filter(Complaint.id == _id)
                         .all())
            return self.__complaint_user_treatment(complaints)[0]
    
    def get_complaints_from_user(self, user_id: str):
        """ Returns all complaints from a user. """
        with Session(engine) as session:
            complaints = (session
                         .query(Complaint, User)
                         .join(User, Complaint.user_id == User.id)
                         .filter(User.id == user_id)
                         .all())
            return self.__complaint_user_treatment(complaints)
    
    def insert_complaint(self, new_complaint: dict):
        """ Inserts a new complaint into the database. """
        with Session(engine) as session:
            complaint = Complaint(**new_complaint)
            session.add(complaint)
            session.commit()

    def update_complaint(self, _id: str, new_complaint: dict):
        """ Updates a complaint in the database. """
        with Session(engine) as session:
            (session
                .query(Complaint)
                .filter(Complaint.id == _id)
                .update(new_complaint))
            session.commit()

    def delete_complaint(self, _id: str):
        """ Deletes a complaint from the database. """
        with Session(engine) as session:
            session.query(Complaint).filter(Complaint.id == _id).delete()
            session.commit()

    def group_by_gender(self):
        """ Groups the number of complaints by gender """
        with Session(engine) as session:
            tuples = (session
                    .query(User.gender, func.count(User.gender))
                    .select_from(Complaint)
                    .join(User, Complaint.user_id == User.id)
                    .group_by(User.gender))
            return {key: value for key, value in tuples} 

    def group_by(self, complaint_key: str):
        """ Groups the number of complaints by each value of given key. """
        column = getattr(Complaint, complaint_key)
        with Session(engine) as session:
            tuples = session.query(column, func.count(column)).group_by(column).all()
            return {key: value for key, value in tuples}
   
    def group_by_month(self):
        """ Groups the number of complaints by each month. """
        grouped_data = {}
        complaints = self.__get_all_complaints()
        for complaint in complaints:
            date = datetime.strptime(complaint.date, DATE_FORMAT)
            month_name = self.__translate_month_int_to_name(date.month)
            self.__increment_count(grouped_data, month_name)

        return grouped_data
    
    def group_by_age_group(self):
        """ Groups the number of complaints by age groups. """
        grouped_data = {}
        complaints = self.get_complaints()
        for complaint in complaints:
            user_birthdate = datetime.strptime(complaint['user_birthdate'], DATE_FORMAT)  
            age_group = self.__get_age_group(user_birthdate) 
            self.__increment_count(grouped_data, age_group)

        return grouped_data

    def get_users(self):
        """ Returns all users from the database. """
        with Session(engine) as session:
            return session.query(User).all()

    def get_user(self, _id: str = None):
        """ Returns a user from the database. """
        with Session(engine) as session:
            return session.query(User).filter(User.id == _id).first()
    
client = Database()