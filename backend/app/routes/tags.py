from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..models import get_db
from ..models.database import Tag
from ..schemas.schemas import TagCreate, TagResponse

router = APIRouter(prefix="/api/tags", tags=["Tags"])

@router.get("/", response_model=List[TagResponse])
def get_tags(db: Session = Depends(get_db)):
    tags = db.query(Tag).all()
    return tags

@router.post("/", response_model=TagResponse, status_code=status.HTTP_201_CREATED)
def create_tag(tag: TagCreate, db: Session = Depends(get_db)):
    # Check if tag already exists
    db_tag = db.query(Tag).filter(Tag.name == tag.name).first()
    if db_tag:
        return db_tag
    
    new_tag = Tag(name=tag.name, category=tag.category)
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    return new_tag
