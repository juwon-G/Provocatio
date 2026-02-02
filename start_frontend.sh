#!/bin/bash

echo "🚀 Provocatio 프론트엔드를 시작합니다..."

cd frontend

# node_modules가 없으면 설치
if [ ! -d "node_modules" ]; then
    echo "📦 패키지를 설치합니다..."
    npm install
fi

# 개발 서버 실행
echo "✅ 개발 서버를 시작합니다 (http://localhost:3000)"
npm run dev
