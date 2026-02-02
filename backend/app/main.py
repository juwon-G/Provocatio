from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import init_db
from .routes import auth, programs, requests, tags

app = FastAPI(title="Provocatio API", version="1.0.0")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 초기화
@app.on_event("startup")
def on_startup():
    init_db()

# 라우터 등록
app.include_router(auth.router)
app.include_router(programs.router)
app.include_router(requests.router)
app.include_router(tags.router)

@app.get("/")
def root():
    return {"message": "Welcome to Provocatio API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
