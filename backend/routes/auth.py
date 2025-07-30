from fastapi import APIRouter, HTTPException
from models import User
from uuid import uuid4

router = APIRouter()

users_db = []  # временная база пользователей

@router.post("/register")
def register(user: User):
    if any(u.email == user.email for u in users_db):
        raise HTTPException(status_code=400, detail="Почта уже используется")
    
    user.id = str(uuid4())
    users_db.append(user)
    return {"msg": "Регистрация успешна"}

@router.get("/me")
def get_profile():
    if not users_db:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return users_db[0]  # позже заменим на JWT-аутентификацию

