# Provocatio 빠른 시작 가이드

## 1단계: 백엔드 설정 및 실행

```bash
cd provocatio/backend

# Python 패키지 설치
pip install -r requirements.txt --break-system-packages

# 데모 데이터 생성 (선택사항)
python create_demo_data.py

# 백엔드 서버 실행
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

백엔드가 http://localhost:8000 에서 실행됩니다.
API 문서는 http://localhost:8000/docs 에서 확인할 수 있습니다.

## 2단계: 프론트엔드 설정 및 실행

**새 터미널을 열어서:**

```bash
cd provocatio/frontend

# Node.js 패키지 설치
npm install

# 프론트엔드 개발 서버 실행
npm run dev
```

프론트엔드가 http://localhost:3000 에서 실행됩니다.

## 3단계: 애플리케이션 사용

1. 브라우저에서 http://localhost:3000 접속
2. 회원가입 또는 테스트 계정으로 로그인:
   - 개발자: developer@test.com / password123
   - 의뢰자: customer@test.com / password123
   - 학생: student@test.com / password123

## 또는 간편 실행 스크립트 사용

### Linux/Mac:
```bash
# 백엔드 실행
./start_backend.sh

# 프론트엔드 실행 (새 터미널에서)
./start_frontend.sh
```

## 주요 기능

- 🏠 **홈**: 최신 프로그램과 의뢰 목록 확인
- 💻 **프로그램**: 등록된 프로그램 탐색 및 검색
- 📋 **의뢰**: 등록된 의뢰 탐색 및 검색
- 🔐 **인증**: 회원가입/로그인 후 프로그램/의뢰 등록 가능

## 문제 해결

### 포트가 이미 사용 중인 경우
- 백엔드: `--port 8001` 로 포트 변경
- 프론트엔드: vite.config.js 에서 포트 변경

### CORS 오류
- backend/app/main.py 의 CORS 설정 확인
- 프론트엔드 URL이 allow_origins에 포함되어 있는지 확인

### 데이터베이스 초기화
```bash
cd provocatio/backend
rm provocatio.db  # 기존 DB 삭제
python create_demo_data.py  # 새로 생성
```
