from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    role: Optional[str] = "developer"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    bio: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Tag Schemas
class TagBase(BaseModel):
    name: str
    category: Optional[str]

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: int
    
    class Config:
        from_attributes = True

# Program Schemas
class ProgramBase(BaseModel):
    title: str
    description: str
    price: Optional[str]
    github_url: Optional[str]
    demo_url: Optional[str]
    image_url: Optional[str]
    license_type: Optional[str]
    is_public: bool = True

class ProgramCreate(ProgramBase):
    tag_ids: List[int] = []

class ProgramUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    price: Optional[str]
    github_url: Optional[str]
    demo_url: Optional[str]
    image_url: Optional[str]
    license_type: Optional[str]
    is_public: Optional[bool]
    tag_ids: Optional[List[int]]

class ProgramResponse(ProgramBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    tags: List[TagResponse] = []
    owner: Optional[UserResponse]
    
    class Config:
        from_attributes = True

# Request Schemas
class RequestBase(BaseModel):
    title: str
    description: str
    budget: Optional[str]
    deadline: Optional[str]
    is_public: bool = True

class RequestCreate(RequestBase):
    tag_ids: List[int] = []

class RequestUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    budget: Optional[str]
    deadline: Optional[str]
    is_public: Optional[bool]
    tag_ids: Optional[List[int]]

class RequestResponse(RequestBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    tags: List[TagResponse] = []
    owner: Optional[UserResponse]
    
    class Config:
        from_attributes = True
