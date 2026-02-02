#!/bin/bash

echo "🚀 Provocatio 백엔드 서버를 시작합니다..."

cd backend

# 가상환경이 있는지 확인
if [ ! -d "venv" ]; then
    echo "📦 가상환경을 생성합니다..."
    python3 -m venv venv
fi

# 가상환경 활성화
source venv/bin/activate

# 패키지 설치
echo "📚 패키지를 설치합니다..."
pip install -r requirements.txt --break-system-packages

# 서버 실행
echo "✅ 서버를 시작합니다 (http://localhost:8000)"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
