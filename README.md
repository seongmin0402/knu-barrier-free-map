# 공주대학교 신관캠퍼스 배리어프리 맵

공주대학교 신관캠퍼스의 장애인 편의시설 정보를 제공하는 웹 애플리케이션입니다.

## 주요 기능

- 🗺️ **네이버 지도 기반 인터랙티브 맵**: 공주대학교 신관캠퍼스 건물 위치를 한눈에 확인
- ♿ **23개 건물의 배리어프리 시설 정보**: 
  - 엘리베이터, 장애인 화장실, 장애인 주차장
  - 경사로, 자동문, 점자 안내, 휠체어 접근성
- 🔍 **스마트 검색 및 필터링**: 건물명 검색, 시설별 필터링
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🎨 **고대비 모드**: 시각 장애인을 위한 접근성 향상
- 📊 **시각적 마커 시스템**: 
  - 🟢 녹색: 모든 주요 시설 완비
  - 🟡 노란색: 일부 시설 있음
  - 🔴 빨간색: 시설 부족
- 👨‍💼 **관리자 대시보드**: 건물 정보 실시간 관리 (Firebase 설정 필요)

## 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript
- **스타일링**: Tailwind CSS
- **지도**: 네이버 지도 API
- **백엔드** (선택사항): Firebase (Firestore, Storage, Authentication)
- **배포**: Vercel

## 빠른 시작

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <repository-url>
cd KNU_B
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 네이버 지도 API 키를 설정하세요:

```env
# 필수: 네이버 지도 API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id

# 선택: Firebase (관리자 기능 사용 시)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### 네이버 지도 API 키 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/product/applicationService/maps) 접속
2. 콘솔 로그인 후 "AI·NAVER API" > "Application 등록" 선택
3. "Web Dynamic Map" 서비스 선택
4. Client ID 복사하여 환경 변수에 추가

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
knu-barrier-free-map/
├── app/
│   ├── page.tsx              # 메인 지도 페이지
│   ├── layout.tsx            # 루트 레이아웃
│   ├── globals.css           # 전역 스타일
│   └── admin/                # 관리자 페이지
│       ├── page.tsx          # 대시보드
│       └── layout.tsx        # 관리자 레이아웃
├── components/
│   ├── map/
│   │   ├── NaverMap.tsx      # 네이버 지도 컴포넌트
│   │   └── DetailPanel.tsx   # 건물 상세정보 패널
│   ├── ui/
│   │   ├── SearchBar.tsx     # 검색창
│   │   ├── FilterPanel.tsx   # 필터 패널
│   │   ├── Button.tsx        # 버튼 컴포넌트
│   │   └── Toggle.tsx        # 토글 스위치
│   └── icons/
│       └── FacilityIcons.tsx # 시설 아이콘들
├── lib/
│   ├── types.ts              # TypeScript 타입 정의
│   ├── utils.ts              # 유틸리티 함수
│   └── firebase.ts           # Firebase 설정
├── hooks/
│   ├── useBuildings.ts       # 건물 데이터 훅
│   └── useHighContrast.ts    # 고대비 모드 훅
├── data/
│   └── buildings.json        # 건물 데이터
└── public/                   # 정적 파일
```

## Vercel 배포

### 1. GitHub 연동

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Vercel 프로젝트 생성

1. [Vercel](https://vercel.com/) 접속 및 로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 환경 변수 추가:
   - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`: 네이버 지도 API 키
5. "Deploy" 클릭

### 3. 자동 배포

이후 `main` 브랜치에 푸시하면 자동으로 배포됩니다.

## 데이터 관리

건물 데이터는 `data/buildings.json` 파일에 저장되어 있습니다. Firebase를 설정하면 관리자 페이지에서 실시간으로 수정할 수 있습니다.

### 데이터 구조

```json
{
  "id": "building-1",
  "lat": 36.4663412,
  "lng": 127.1385781,
  "building_name": "건물명",
  "floor": "5F",
  "wheelchair_access": true,
  "elevator_available": true,
  "braille_available": false,
  "toilet_available": true,
  "auto_door_available": true,
  "threshold_present": true,
  "parking_capacity": 4,
  "parking_distance_entrance_m": 3,
  "ramp_available": true,
  "description": "건물 상세 설명",
  "floorPhotoGroupsJson": "[...]"
}
```

## 접근성 기능

- ✅ WCAG 2.1 AA 준수
- ✅ 키보드 네비게이션 지원
- ✅ 스크린 리더 호환
- ✅ 고대비 모드
- ✅ 큰 터치 영역 (모바일 최적화)
- ✅ ARIA 레이블

## 문의

프로젝트 관련 문의사항이 있으시면 Issues를 통해 문의해주세요.

## 라이선스

이 프로젝트는 공주대학교의 자산입니다.
