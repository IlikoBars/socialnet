from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

# ✅ Разрешаем запросы с фронта (Next.js на localhost и IP по локалке)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://172.20.10.2:3000",  # ← IP твоего MacBook в локальной сети
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Модели данных
class Post(BaseModel):
    id: str
    title: str
    content: str

# 🗂️ Временное хранилище постов
posts_db: List[Post] = []

# 📮 Получить все посты
@app.get("/posts")
def get_posts():
    return posts_db

# ✏️ Создать новый пост
@app.post("/posts")
def create_post(post: Post):
    post.id = str(uuid4())
    posts_db.append(post)
    return {"message": "Пост создан", "id": post.id}

# 🔍 Проверка работоспособности
@app.get("/")
def root():
    return {"message": "Сервер работает 🚀"}


