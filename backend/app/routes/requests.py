from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import get_db
from ..models.database import Request, Tag, User
from ..schemas.schemas import RequestCreate, RequestResponse, RequestUpdate
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/requests", tags=["Requests"])

@router.get("/", response_model=List[RequestResponse])
def get_requests(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Request).filter(Request.is_public == True)
    
    if search:
        query = query.filter(Request.title.contains(search) | Request.description.contains(search))
    
    if tag:
        query = query.join(Request.tags).filter(Tag.name == tag)
    
    requests = query.offset(skip).limit(limit).all()
    return requests

@router.get("/{request_id}", response_model=RequestResponse)
def get_request(request_id: int, db: Session = Depends(get_db)):
    request = db.query(Request).filter(Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    return request

@router.post("/", response_model=RequestResponse, status_code=status.HTTP_201_CREATED)
def create_request(
    request: RequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_request = Request(
        title=request.title,
        description=request.description,
        budget=request.budget,
        deadline=request.deadline,
        is_public=request.is_public,
        owner_id=current_user.id
    )
    
    # Add tags
    if request.tag_ids:
        tags = db.query(Tag).filter(Tag.id.in_(request.tag_ids)).all()
        new_request.tags = tags
    
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

@router.put("/{request_id}", response_model=RequestResponse)
def update_request(
    request_id: int,
    request_update: RequestUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    request = db.query(Request).filter(Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    if request.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this request")
    
    update_data = request_update.dict(exclude_unset=True)
    tag_ids = update_data.pop('tag_ids', None)
    
    for key, value in update_data.items():
        setattr(request, key, value)
    
    if tag_ids is not None:
        tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
        request.tags = tags
    
    db.commit()
    db.refresh(request)
    return request

@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    request = db.query(Request).filter(Request.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    if request.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this request")
    
    db.delete(request)
    db.commit()
    return None
