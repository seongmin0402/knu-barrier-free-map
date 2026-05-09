# 기여 가이드

공주대학교 배리어프리 맵 프로젝트에 기여해 주셔서 감사합니다!

## 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/<your-username>/knu-barrier-free-map.git
cd knu-barrier-free-map
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 새로운 기능 브랜치
- `fix/*`: 버그 수정 브랜치
- `docs/*`: 문서 수정 브랜치

## 커밋 컨벤션

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정 등

### 예시

```
feat(map): 건물 검색 기능 추가

사용자가 건물명으로 검색할 수 있는 기능을 추가했습니다.
- SearchBar 컴포넌트 구현
- 실시간 필터링 로직 추가

Closes #123
```

## Pull Request 프로세스

### 1. 브랜치 생성

```bash
git checkout -b feature/your-feature-name
```

### 2. 변경사항 커밋

```bash
git add .
git commit -m "feat: 기능 설명"
```

### 3. 푸시

```bash
git push origin feature/your-feature-name
```

### 4. Pull Request 생성

1. GitHub 저장소 페이지 접속
2. "Pull requests" > "New pull request"
3. 다음 정보 포함:
   - 변경사항 요약
   - 관련 이슈 번호
   - 스크린샷 (UI 변경 시)
   - 테스트 방법

### 5. 코드 리뷰

- 최소 1명의 리뷰어 승인 필요
- 모든 피드백에 응답
- 요청된 변경사항 반영

## 코드 스타일

### TypeScript

- 엄격 모드 사용
- 명시적 타입 정의
- `any` 타입 최소화

### React

- 함수형 컴포넌트 사용
- Custom Hooks 활용
- Props 타입 명시

### 네이밍 컨벤션

- 컴포넌트: PascalCase (`BuildingCard.tsx`)
- 함수/변수: camelCase (`getBuildings`)
- 상수: UPPER_CASE (`MAX_BUILDINGS`)
- CSS 클래스: kebab-case (Tailwind 사용)

## 테스트

```bash
# 린트 실행
npm run lint

# 빌드 테스트
npm run build
```

## 건물 데이터 추가

`data/buildings.json` 파일에 다음 형식으로 추가:

```json
{
  "id": "building-xx",
  "lat": 36.xxxx,
  "lng": 127.xxxx,
  "building_name": "건물명",
  "floor": "xF",
  "wheelchair_access": true,
  "elevator_available": true,
  "braille_available": false,
  "toilet_available": true,
  "auto_door_available": true,
  "threshold_present": false,
  "parking_capacity": 2,
  "parking_distance_entrance_m": 10,
  "ramp_available": true,
  "description": "상세 설명",
  "floorPhotoGroupsJson": "[]",
  "imageNames": ""
}
```

## 문의

질문이나 제안사항은 [Issues](https://github.com/<your-username>/knu-barrier-free-map/issues)를 통해 문의해주세요.
