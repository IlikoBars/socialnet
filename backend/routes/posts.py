from fastapi import APIRouter, HTTPException
from models import Post
from uuid import uuid4

router = APIRouter()

posts_db = []  # временная база постов

@router.get("/")
def get_posts():
    return posts_db

@router.post("/")
def create_post(post: Post):
    post.id = str(uuid4())
    posts_db.append(post)
    return {"msg": "Пост опубликован"}
