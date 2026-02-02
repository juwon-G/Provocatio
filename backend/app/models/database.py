from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

# Many-to-Many relationship tables
program_tags = Table(
    'program_tags',
    Base.metadata,
    Column('program_id', Integer, ForeignKey('programs.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

request_tags = Table(
    'request_tags',
    Base.metadata,
    Column('request_id', Integer, ForeignKey('requests.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default='developer')  # customer, developer, student
    bio = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    programs = relationship("Program", back_populates="owner")
    requests = relationship("Request", back_populates="owner")

class Tag(Base):
    __tablename__ = 'tags'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    category = Column(String)  # web, mobile, ai, game, etc.
    
    programs = relationship("Program", secondary=program_tags, back_populates="tags")
    requests = relationship("Request", secondary=request_tags, back_populates="tags")

class Program(Base):
    __tablename__ = 'programs'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(String)  # 무료, 유료, 협의 등
    github_url = Column(String)
    demo_url = Column(String)
    image_url = Column(String)
    license_type = Column(String)
    is_public = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="programs")
    tags = relationship("Tag", secondary=program_tags, back_populates="programs")

class Request(Base):
    __tablename__ = 'requests'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    budget = Column(String)
    deadline = Column(String)
    is_public = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="requests")
    tags = relationship("Tag", secondary=request_tags, back_populates="requests")
