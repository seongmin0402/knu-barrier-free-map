# 공주대학교 배리어프리 맵 프로젝트 요약

## 프로젝트 개요

공주대학교 신관캠퍼스의 23개 건물에 대한 배리어프리 시설 정보를 시각적으로 제공하는 웹 애플리케이션입니다.

## 완성된 기능

### ✅ 1. 메인 지도 페이지
- **네이버 지도 API 통합**: 공주대학교 중심 좌표로 초기화
- **건물 마커 시스템**: 
  - 🟢 녹색: 모든 주요 시설 완비 (엘리베이터, 화장실, 경사로)
  - 🟡 노란색: 일부 시설 있음
  - 🔴 빨간색: 시설 부족
- **마커 클릭 상세정보**: 건물별 배리어프리 시설 정보 표시

### ✅ 2. 상세정보 패널
- 건물명, 층수 정보
- 8가지 배리어프리 시설 아이콘:
  - ♿ 휠체어 접근
  - 🛗 엘리베이터
  - 🚻 장애인 화장실
  - 🅿️ 장애인 주차장 (수량 표시)
  - 📐 경사로
  - 🚪 자동문
  - 🔤 점자 안내
  - ⚠️ 문턱 주의
- 주차장 정보 (입구에서의 거리)
- 상세 설명
- 층별 사진 갤러리 (Supabase 이미지)

### ✅ 3. 검색 및 필터 기능
- **건물명 검색**: 실시간 검색 바
- **시설별 필터링**: 7가지 시설 조건으로 필터
- **필터 결과 표시**: 검색된 건물 개수 실시간 업데이트

### ✅ 4. 접근성 기능
- **고대비 모드**: 시각 장애인을 위한 명암 대비 강화
- **WCAG 2.1 AA 준수**: 웹 접근성 표준 준수
- **키보드 네비게이션**: 키보드로 모든 기능 접근 가능
- **ARIA 레이블**: 스크린 리더 호환
- **큰 터치 영역**: 모바일 최적화

### ✅ 5. 반응형 디자인
- **모바일**: 하단 시트 스타일의 상세정보 패널
- **태블릿**: 사이드바 패널
- **데스크톱**: 넓은 지도 + 사이드바

### ✅ 6. 관리자 대시보드
- 건물 목록 테이블
- 시설 정보 배지 표시
- Firebase 설정 안내
- 향후 CRUD 기능 추가 가능

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| 프레임워크 | Next.js 15, React 19 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 지도 | 네이버 지도 API |
| 백엔드 | Firebase (선택사항) |
| 배포 | Vercel |

## 프로젝트 구조

```
KNU_B/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # 메인 지도 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   ├── globals.css              # 전역 스타일 (고대비 모드 포함)
│   └── admin/                   # 관리자 페이지
│       ├── page.tsx             # 대시보드
│       └── layout.tsx           # 관리자 레이아웃
├── components/
│   ├── map/
│   │   ├── NaverMap.tsx         # 네이버 지도 + 마커
│   │   └── DetailPanel.tsx      # 건물 상세정보
│   ├── ui/
│   │   ├── SearchBar.tsx        # 검색창
│   │   ├── FilterPanel.tsx      # 필터 패널
│   │   ├── Button.tsx           # 버튼
│   │   └── Toggle.tsx           # 고대비 토글
│   └── icons/
│       └── FacilityIcons.tsx    # 시설 아이콘 (8종)
├── lib/
│   ├── types.ts                 # TypeScript 타입 정의
│   ├── utils.ts                 # 유틸리티 함수
│   └── firebase.ts              # Firebase 설정
├── hooks/
│   ├── useBuildings.ts          # 건물 데이터 훅
│   └── useHighContrast.ts       # 고대비 모드 훅
├── data/
│   └── buildings.json           # 23개 건물 데이터
├── public/                      # 정적 파일
├── .env.local                   # 환경 변수
├── package.json                 # 의존성
├── tsconfig.json                # TypeScript 설정
├── tailwind.config.ts           # Tailwind 설정
├── README.md                    # 프로젝트 README
├── DEPLOYMENT.md                # 배포 가이드
├── CONTRIBUTING.md              # 기여 가이드
└── PROJECT_SUMMARY.md           # 이 문서
```

## 핵심 컴포넌트 설명

### 1. NaverMap.tsx
- 네이버 지도 API 초기화
- 건물 마커 생성 및 관리
- 마커 색상 구분 (good/partial/poor)
- 마커 클릭 이벤트 처리

### 2. DetailPanel.tsx
- 슬라이드 인 애니메이션
- 시설 정보 아이콘 표시
- 층별 이미지 갤러리
- 스크롤 가능한 긴 콘텐츠

### 3. FilterPanel.tsx
- 7가지 시설 체크박스
- 실시간 필터링
- 아이콘 + 텍스트 레이블

### 4. useBuildings Hook
- JSON 데이터 로드
- 로딩 상태 관리
- 에러 핸들링

### 5. useHighContrast Hook
- localStorage 기반 상태 저장
- DOM 클래스 토글
- 자동 초기화

## 데이터 구조

### BuildingData 타입
```typescript
interface BuildingData {
  id: string;
  lat: number;
  lng: number;
  building_name: string;
  floor: string;
  wheelchair_access: boolean;
  elevator_available: boolean;
  braille_available: boolean;
  toilet_available: boolean;
  auto_door_available: boolean;
  threshold_present: boolean;
  parking_capacity: number;
  parking_distance_entrance_m: number;
  ramp_available: boolean;
  description: string;
  floorPhotoGroupsJson: string;
  imageNames: string;
}
```

## 다음 단계 (향후 개선사항)

### 1. Firebase 연동 (선택사항)
- [ ] Firebase 프로젝트 설정
- [ ] Firestore 데이터베이스 마이그레이션
- [ ] 관리자 인증 (Authentication)
- [ ] 실시간 데이터 업데이트

### 2. 추가 기능
- [ ] 건물 간 경로 안내
- [ ] 즐겨찾기 기능
- [ ] 사용자 피드백 시스템
- [ ] 다국어 지원 (영어, 중국어)
- [ ] PWA 지원 (오프라인 모드)

### 3. 성능 최적화
- [ ] 이미지 레이지 로딩
- [ ] 마커 클러스터링
- [ ] 서버 사이드 렌더링 최적화

### 4. 분석 및 모니터링
- [ ] Google Analytics 연동
- [ ] 사용자 행동 분석
- [ ] 에러 모니터링 (Sentry)

## 배포 방법

### 1. 로컬 테스트
```bash
npm install
npm run dev
```

### 2. 프로덕션 빌드
```bash
npm run build
npm start
```

### 3. Vercel 배포
자세한 내용은 `DEPLOYMENT.md` 참조

## 환경 변수

### 필수
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`: 네이버 지도 API 키

### 선택 (Firebase 사용 시)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 성능 지표

- **Lighthouse 점수 목표**:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+

- **로딩 시간**:
  - First Contentful Paint: < 1.5s
  - Time to Interactive: < 3s
  - Largest Contentful Paint: < 2.5s

## 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)
- 모바일: iOS Safari 12+, Android Chrome 90+

## 라이선스

공주대학교 소유

## 연락처

문의사항은 GitHub Issues를 통해 제출해주세요.

---

**프로젝트 완성일**: 2026-05-09  
**버전**: 1.0.0  
**상태**: ✅ 프로덕션 준비 완료
