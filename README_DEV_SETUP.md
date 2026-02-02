개발자 노트 — Provocatio (React + FastAPI)

빠른 시작

1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

2) Frontend (requires Node.js >= 18)

```bash
cd frontend
npm install
npm run dev
```

설계 참고:
- FastAPI는 프로토타입용 in-memory store를 사용합니다.
- Frontend는 Vite + React로 간단한 뼈대만 포함합니다.

다음 단계 제안:
- 인증(회원가입/소셜) 구현
- DB 연결(Postgres) 및 마이그레이션
- 파일 업로드/이미지 처리, 신고/운영 대시보드
- 테스트 스케줄 추가
