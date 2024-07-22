from datetime import datetime
from typing import Optional
from api.schemas.complaints import ComplaintUserSchema, ComplaintUserList
from api.schemas.group_bys import *
from fastapi import APIRouter, HTTPException
from api.database.database import client
from http import HTTPStatus

router = APIRouter(prefix='/complaints', tags=['complaints'])

@router.get('/', response_model=ComplaintUserList)
def get_complaints(start_date: Optional[str] = None, end_date: Optional[str] = None):
    """
    Returns all complaints from the database.

    Args:
        start_date (str): The start date.
        end_date (str): The end date.
    
    Returns:
        dict: A dictionary containing a list of complaints.

    Raises:
        HTTPException: If the complaints are not found.
    """
    if (start_date):
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
    if (end_date):
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
    complaints = client.get_complaints(start_date, end_date)

    if complaints is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Complaints not found.")

    return {'complaints': complaints}

@router.get('/{complaint_id}', response_model=ComplaintUserSchema)
def get_complaint(complaint_id: str):
    """
    Returns a complaint from the database.

    Args:
        complaint_id (str): The complaint id.
    
    Returns:
        dict: A dictionary containing the complaint data.

    Raises:
        HTTPException: If the complaint is not found.
    """
    complaint = client.get_complaint(complaint_id)
    
    if complaint is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Complaint not found.")

    return complaint

@router.get('/user/{user_id}', response_model=ComplaintUserList)
def get_complaints_from_user(user_id: str):
    """
    Returns all complaints from a user.

    Args:
        user_id (str): The user id.
    
    Returns:
        dict: A dictionary containing a list of complaints.
    
    Raises:
        HTTPException: If the complaints are not found.
    """
    complaints = client.get_complaints_from_user(user_id)

    if complaints is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Complaints not found.")

    return {'complaints': complaints}

@router.get('/group/types', response_model=GroupByTypes)
def get_complaints_group_by_types():
    """
    Returns all complaints grouped by types.

    Returns:
        dict: A dictionary containing the complaints grouped by types.
    """
    grouped_by_type = client.group_by('type')

    if (len(grouped_by_type) == 0):
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No types found.")

    return grouped_by_type

@router.get('/group/genders', response_model=GroupByGenders)
def get_complaints_group_by_genders():
    """
    Returns all complaints grouped by

    Returns:
        dict: A dictionary containing the complaints grouped
    
    Raises:
        HTTPException: If no genders are found.
    """
    grouped_by_gender = client.group_by_gender()

    if (len(grouped_by_gender)) == 0:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No genders found.")

    return grouped_by_gender

@router.get('/group/age_group', response_model=GroupByAgeGroup)
def get_complaints_group_by_age_group():
    """
    Returns all complaints grouped by age group.

    Returns:
        dict: A dictionary containing the complaints grouped by age group.

    Raises:
        HTTPException: If no age groups are found.
    """
    grouped_by_age = client.group_by_age_group()

    if (len(grouped_by_age) == 0):
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No age groups found.")

    return grouped_by_age

@router.get('/group/at_moment', response_model=GroupByMoment)
def get_complaints_group_by_moment():
    """
    Returns all complaints grouped by moment.

    Returns:
        dict: A dictionary containing the complaints grouped by moment.
    
    Raises:
        HTTPException: If no moments are found.
    """
    grouped_by_at_moment = client.group_by('at_moment')
    output = { str(key): value for key, value in grouped_by_at_moment.items() }
    if (len(output) == 0):
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No moments found.")

    return output

@router.get('/group/months', response_model=GroupByMonths)
def get_complaints_group_by_months():
    """
    Returns all complaints grouped by months.

    Returns:
        dict: A dictionary containing the complaints grouped by months.

    Raises:
        HTTPException: If no months are found.
    """
    grouped_by_month = client.group_by_month()

    if (len(grouped_by_month) == 0):
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No months found.")
    
    return grouped_by_month

@router.get('/group/neighborhoods', response_model=list[GroupByNeighborhoods])
def get_complaints_group_by_neighborhoods():
    """
    Returns all complaints grouped by neighborhoods.

    Returns:
        dict: A dictionary containing the complaints grouped by neighborhoods.
    
    Raises:
        HTTPException: If no neighborhoods are found.
    """
    grouped_by_neighborhoods = client.group_by('neighborhood')
    output = [
        {'name': neighborhood, 'count': count }
        for neighborhood, count
        in grouped_by_neighborhoods.items()
    ]

    if len(output) == 0:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="No neighborhoods found.")

    return output