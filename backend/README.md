Provocatio - Backend (FastAPI)

간단한 프로토타입 백엔드입니다.

실행 방법(개발):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

엔드포인트 예시:
- GET /health
- GET /requests
- POST /requests
- GET /programs
- POST /programs
