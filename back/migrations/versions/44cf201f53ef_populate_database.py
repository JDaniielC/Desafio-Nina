"""populate database

Revision ID: 44cf201f53ef
Revises: 5062341559d4
Create Date: 2024-07-21 22:27:40.570102

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '44cf201f53ef'
down_revision: Union[str, None] = '5062341559d4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Faker database

from sqlalchemy.sql import table
from datetime import datetime
from faker import Faker
import bson

faker = Faker()

START_DATE = datetime(2024, 3, 1, 0, 0, 0)
END_DATE = datetime(2024, 6, 30, 23, 59, 59)
BIRTH_START_DATE = datetime(1980, 1, 1, 0, 0, 0)
BIRTH_END_DATE = datetime(2010, 12, 31, 23, 59, 59)

TYPES = [
    "GROPING",
    "STALKING",
    "UNWANTED_PHOTOS",
    "UNWANTED_COMMENTS",
    "THREATENING",
    "FLASHING",
]

NEIGHBORHOODS = [
    "Taquacara",
    "Sé",
    "República",
    "Liberdade",
    "Braz",
    "Boa Vista",
    "Madalena",
    "Boa Viagem",
    "Água Fria",
    "Aflitos",
]

def generate_new_user():
    return {
        'id': str(bson.ObjectId()),
        'name': faker.name(),
        'email': faker.email(),
        'phone_number': faker.phone_number(),
        'birthdate': faker.date_of_birth(minimum_age=18, maximum_age=50).strftime('%Y-%m-%d'),
        'gender': faker.random_element(['CIS_MALE', 'CIS_FEMALE', 'TRANS_MALE', 'TRANS_FEMALE', 'OTHER']),
        'ethnicity': faker.random_element(['BLACK', 'BROWN', 'WHITE', 'OTHER']),
        'created_at': faker.date().format('%Y-%m-%dT%H:%M:%S'),
        'updated_at': faker.date().format('%Y-%m-%dT%H:%M:%S'),
    }

def generate_new_complaint(user_id: str):
    return {
        'id': str(bson.ObjectId()),
        'user_id': user_id,
        'date': faker.date_between(START_DATE, END_DATE),
        'at_moment': faker.random_element([True, False]),
        'type': faker.random_element(TYPES),
        'neighborhood': faker.random_element(NEIGHBORHOODS),
        'description': faker.text(),
        'situation': faker.random_element(['VICTIM', 'WITNESS']),
        'created_at': faker.date().format('%Y-%m-%dT%H:%M:%S'),
        'updated_at': faker.date().format('%Y-%m-%dT%H:%M:%S'),
    }

users = []
complaints = []

user_number = 100
complaint_per_user = 3

for _ in range(user_number):
    new_user = generate_new_user()
    users.append(new_user)
    
    for _ in range (complaint_per_user):
        new_complaint = generate_new_complaint(new_user['id'])
        complaints.append(new_complaint)

meta_data = sa.MetaData()
bind = op.get_bind()

ComplaintTable = table('complaints', 
                        sa.Column('id', sa.String, primary_key=True),
                        sa.Column('type', sa.String),
                        sa.Column('user_id', sa.String),
                        sa.Column('situation', sa.String),
                        sa.Column('at_moment', sa.Boolean),
                        sa.Column('neighborhood', sa.String),
                        sa.Column('description', sa.String),
                        sa.Column('date', sa.String),
                        sa.Column('created_at', sa.String),
                        sa.Column('updated_at', sa.String),
)
UserTable = table('users',
                sa.Column('id', sa.String, primary_key=True),
                sa.Column('name', sa.String),
                sa.Column('email', sa.String),
                sa.Column('phone_number', sa.String),
                sa.Column('birthdate', sa.String),
                sa.Column('gender', sa.String),
                sa.Column('ethnicity', sa.String),
                sa.Column('created_at', sa.String),
                sa.Column('updated_at', sa.String)
)

def upgrade() -> None:
    op.bulk_insert(UserTable, users)
    op.bulk_insert(ComplaintTable, complaints)

def downgrade() -> None:
    op.execute('DELETE FROM complaints')
    op.execute('DELETE FROM users')
