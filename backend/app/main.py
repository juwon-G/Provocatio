from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .schemas import RequestCreate, ProgramCreate, RequestOut, ProgramOut

app = FastAPI(title="Provocatio API - Dev Prototype")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory stores for prototype
_requests: List[RequestOut] = []
_programs: List[ProgramOut] = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/requests", response_model=List[RequestOut])
def list_requests():
    return _requests

@app.post("/requests", response_model=RequestOut)
def create_request(req: RequestCreate):
    item = RequestOut(id=len(_requests)+1, **req.dict())
    _requests.append(item)
    return item

@app.get("/programs", response_model=List[ProgramOut])
def list_programs():
    return _programs

@app.post("/programs", response_model=ProgramOut)
def create_program(prog: ProgramCreate):
    item = ProgramOut(id=len(_programs)+1, **prog.dict())
    _programs.append(item)
    return item
