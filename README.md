# Provocatio

코드를 만들고, 배우고, 거래하는 개발자의 한국형 통합 플랫폼

## 프로젝트 개요

Provocatio는 개발자, 학부생, 메이커들이 만든 프로그램을 소개하고 판매/배포할 수 있으며, 일반 사용자가 필요한 프로그램을 의뢰할 수 있는 플랫폼입니다.

### 주요 기능

- 🔐 사용자 인증 (회원가입/로그인)
- 💻 프로그램 등록 및 탐색
- 📋 의뢰 등록 및 탐색
- 🏷️ 태그 기반 검색 및 필터링
- 🎯 역할 기반 사용자 관리 (개발자/의뢰자/학생)

## 기술 스택

### Backend
- FastAPI (Python)
- SQLAlchemy (ORM)
- SQLite (Database)
- JWT (Authentication)
- Pydantic (Data Validation)

### Frontend
- React 18
- React Router
- Axios
- Vite

## 설치 및 실행

### 사전 요구사항
- Python 3.8+
- Node.js 16+
- npm or yarn

### 백엔드 설정

```bash
cd backend

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 환경 변수 설정
# .env 파일의 SECRET_KEY를 변경하세요

# 서버 실행
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

백엔드 서버는 http://localhost:8000 에서 실행됩니다.

### 프론트엔드 설정

```bash
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 http://localhost:3000 에서 실행됩니다.

## API 문서

백엔드 서버가 실행된 후, 다음 URL에서 자동 생성된 API 문서를 확인할 수 있습니다:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 프로젝트 구조

```
provocatio/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI 애플리케이션
│   │   ├── models/
│   │   │   ├── __init__.py      # DB 연결 설정
│   │   │   └── database.py      # SQLAlchemy 모델
│   │   ├── routes/
│   │   │   ├── auth.py          # 인증 라우트
│   │   │   ├── programs.py      # 프로그램 라우트
│   │   │   ├── requests.py      # 의뢰 라우트
│   │   │   └── tags.py          # 태그 라우트
│   │   ├── schemas/
│   │   │   └── schemas.py       # Pydantic 스키마
│   │   └── utils/
│   │       └── auth.py          # 인증 유틸리티
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Programs.jsx
    │   │   └── Requests.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 주요 엔티티

### User (사용자)
- 이메일, 사용자명, 역할(개발자/의뢰자/학생)
- 프로그램 및 의뢰 작성

### Program (프로그램)
- 제목, 설명, 가격, GitHub/데모 링크
- 태그 기반 분류

### Request (의뢰)
- 제목, 설명, 예산, 마감일
- 태그 기반 분류

### Tag (태그)
- 프로그램 및 의뢰 분류를 위한 태그

## 개발 로드맵

### v1.0 (현재)
- ✅ 기본 인증 시스템
- ✅ 프로그램 CRUD
- ✅ 의뢰 CRUD
- ✅ 태그 시스템
- ✅ 검색 기능

### v1.1 (예정)
- [ ] 프로그램 상세 페이지
- [ ] 의뢰 상세 페이지
- [ ] 사용자 프로필 페이지
- [ ] 프로그램/의뢰 등록 페이지
- [ ] 이미지 업로드 기능

### v1.2 (예정)
- [ ] 댓글/문의 시스템
- [ ] 알림 시스템
- [ ] 태그 기반 추천
- [ ] 고급 검색 필터

### v2.0 (계획)
- [ ] 거래/결제 시스템
- [ ] 커뮤니티 기능
- [ ] LLM 기반 요약/태그 추천
- [ ] 관리자 대시보드

## 라이선스

MIT License

## 기여

이슈와 PR은 언제나 환영합니다!

## 연락처

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.
