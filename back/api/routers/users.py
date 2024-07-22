from api.schemas.users import UserSchema, UserList
from fastapi import APIRouter, HTTPException
from api.database.database import client
from http import HTTPStatus

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/', response_model=UserList)
def get_users():
    """
    Returns all users from the database.

    Returns:
        dict: A dictionary containing a list of users.
    """
    users = client.get_users()
    return {'users': users}

@router.get('/{user_id}', response_model=UserSchema)
def get_user(user_id: str):
    """
    Returns a user from the database.

    Args:
        user_id (str): The user id.

    Returns:
        dict: A dictionary containing the user data.
    """
    user = client.get_user(user_id)
    if user is None:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="User not found.")
    return user