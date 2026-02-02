from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class Role(str, Enum):
    customer = "customer"
    developer = "developer"
    learner = "learner"

class RequestCreate(BaseModel):
    title: str = Field(..., max_length=200)
    description: str
    tags: List[str] = []
    budget: Optional[str] = None
    due_date: Optional[str] = None

class RequestOut(RequestCreate):
    id: int

class ProgramCreate(BaseModel):
    title: str = Field(..., max_length=200)
    description: str
    tags: List[str] = []
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    price: Optional[float] = None

class ProgramOut(ProgramCreate):
    id: int

class User(BaseModel):
    id: Optional[int]
    email: Optional[str]
    display_name: Optional[str]
    roles: Optional[List[Role]] = []
    interests: Optional[List[str]] = []
