from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import get_db
from ..models.database import Program, Tag, User
from ..schemas.schemas import ProgramCreate, ProgramResponse, ProgramUpdate
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/programs", tags=["Programs"])

@router.get("/", response_model=List[ProgramResponse])
def get_programs(
    skip: int = 0,
    limit: int = 20,
    search: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Program).filter(Program.is_public == True)
    
    if search:
        query = query.filter(Program.title.contains(search) | Program.description.contains(search))
    
    if tag:
        query = query.join(Program.tags).filter(Tag.name == tag)
    
    programs = query.offset(skip).limit(limit).all()
    return programs

@router.get("/{program_id}", response_model=ProgramResponse)
def get_program(program_id: int, db: Session = Depends(get_db)):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program

@router.post("/", response_model=ProgramResponse, status_code=status.HTTP_201_CREATED)
def create_program(
    program: ProgramCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_program = Program(
        title=program.title,
        description=program.description,
        price=program.price,
        github_url=program.github_url,
        demo_url=program.demo_url,
        image_url=program.image_url,
        license_type=program.license_type,
        is_public=program.is_public,
        owner_id=current_user.id
    )
    
    # Add tags
    if program.tag_ids:
        tags = db.query(Tag).filter(Tag.id.in_(program.tag_ids)).all()
        new_program.tags = tags
    
    db.add(new_program)
    db.commit()
    db.refresh(new_program)
    return new_program

@router.put("/{program_id}", response_model=ProgramResponse)
def update_program(
    program_id: int,
    program_update: ProgramUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    if program.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this program")
    
    update_data = program_update.dict(exclude_unset=True)
    tag_ids = update_data.pop('tag_ids', None)
    
    for key, value in update_data.items():
        setattr(program, key, value)
    
    if tag_ids is not None:
        tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
        program.tags = tags
    
    db.commit()
    db.refresh(program)
    return program

@router.delete("/{program_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_program(
    program_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    
    if program.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this program")
    
    db.delete(program)
    db.commit()
    return None
