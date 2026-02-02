"""
데모 데이터 생성 스크립트
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from app.models import SessionLocal, init_db
from app.models.database import User, Tag, Program, Request
from app.utils.auth import get_password_hash

def create_demo_data():
    # Initialize database
    init_db()
    
    db = SessionLocal()
    
    try:
        # Create tags
        tags_data = [
            {"name": "웹개발", "category": "web"},
            {"name": "모바일", "category": "mobile"},
            {"name": "AI/ML", "category": "ai"},
            {"name": "게임", "category": "game"},
            {"name": "데이터분석", "category": "data"},
            {"name": "백엔드", "category": "backend"},
            {"name": "프론트엔드", "category": "frontend"},
            {"name": "파이썬", "category": "language"},
            {"name": "자바스크립트", "category": "language"},
            {"name": "React", "category": "framework"},
        ]
        
        tags = []
        for tag_data in tags_data:
            tag = Tag(**tag_data)
            db.add(tag)
            tags.append(tag)
        
        db.commit()
        print(f"✅ {len(tags)} 태그 생성 완료")
        
        # Create demo users
        users_data = [
            {"email": "developer@test.com", "username": "developer1", "password": "password123", "role": "developer"},
            {"email": "customer@test.com", "username": "customer1", "password": "password123", "role": "customer"},
            {"email": "student@test.com", "username": "student1", "password": "password123", "role": "student"},
        ]
        
        users = []
        for user_data in users_data:
            user = User(
                email=user_data["email"],
                username=user_data["username"],
                hashed_password=get_password_hash(user_data["password"]),
                role=user_data["role"]
            )
            db.add(user)
            users.append(user)
        
        db.commit()
        print(f"✅ {len(users)} 사용자 생성 완료")
        
        # Create demo programs
        programs_data = [
            {
                "title": "커스텀 키오스크 솔루션",
                "description": "음식점이나 카페에서 사용할 수 있는 터치 기반 주문 키오스크 프로그램입니다. React와 Node.js로 개발되었으며, 결제 시스템 연동이 가능합니다.",
                "price": "500,000원 ~ 1,000,000원",
                "github_url": "https://github.com/example/kiosk",
                "license_type": "MIT",
                "owner_id": 1,
                "tags": [0, 6, 9]
            },
            {
                "title": "재고 관리 자동화 시스템",
                "description": "소상공인을 위한 간단한 재고 관리 프로그램입니다. 엑셀 연동과 바코드 스캐너를 지원하며, 재고 부족 시 자동 알림 기능이 있습니다.",
                "price": "300,000원",
                "demo_url": "https://demo.inventory.com",
                "license_type": "Commercial",
                "owner_id": 1,
                "tags": [0, 5, 7]
            },
            {
                "title": "학습용 AI 챗봇",
                "description": "대학생 포트폴리오 프로젝트로 제작한 AI 챗봇입니다. OpenAI API를 활용하며, 커스터마이징이 가능합니다.",
                "price": "무료 (오픈소스)",
                "github_url": "https://github.com/example/chatbot",
                "license_type": "GPL-3.0",
                "owner_id": 3,
                "tags": [2, 7, 9]
            },
        ]
        
        for prog_data in programs_data:
            tag_indices = prog_data.pop("tags", [])
            program = Program(**prog_data)
            program.tags = [tags[i] for i in tag_indices]
            db.add(program)
        
        db.commit()
        print(f"✅ {len(programs_data)} 프로그램 생성 완료")
        
        # Create demo requests
        requests_data = [
            {
                "title": "헬스장 회원 관리 프로그램 개발",
                "description": "헬스장에서 사용할 회원 관리 및 출석 체크 프로그램이 필요합니다. 모바일 앱 형태를 원하며, 회원권 만료 알림 기능이 필요합니다.",
                "budget": "200만원 ~ 300만원",
                "deadline": "2개월",
                "owner_id": 2,
                "tags": [1, 5]
            },
            {
                "title": "부동산 매물 크롤링 및 분석 도구",
                "description": "부동산 사이트에서 매물 정보를 자동으로 수집하고 가격 추이를 분석해주는 프로그램을 제작해주실 분을 찾습니다.",
                "budget": "협의",
                "deadline": "1개월",
                "owner_id": 2,
                "tags": [4, 7]
            },
            {
                "title": "온라인 퀴즈 게임 제작",
                "description": "교육용 온라인 퀴즈 게임을 제작하고자 합니다. 웹 기반으로 여러 명이 동시에 참여할 수 있는 형태를 원합니다.",
                "budget": "150만원",
                "deadline": "3주",
                "owner_id": 2,
                "tags": [0, 3, 8]
            },
        ]
        
        for req_data in requests_data:
            tag_indices = req_data.pop("tags", [])
            request = Request(**req_data)
            request.tags = [tags[i] for i in tag_indices]
            db.add(request)
        
        db.commit()
        print(f"✅ {len(requests_data)} 의뢰 생성 완료")
        
        print("\n🎉 데모 데이터 생성이 완료되었습니다!")
        print("\n📝 테스트 계정:")
        print("  개발자: developer@test.com / password123")
        print("  의뢰자: customer@test.com / password123")
        print("  학생: student@test.com / password123")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_demo_data()
