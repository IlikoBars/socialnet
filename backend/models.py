from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    password: str
    firstName: str
    lastName: str

class Post(BaseModel):
    id: str
    title: str
    content: str
