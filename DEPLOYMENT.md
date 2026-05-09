# 배포 가이드

이 문서는 공주대학교 배리어프리 맵을 Vercel에 배포하는 방법을 설명합니다.

## 사전 준비

1. [GitHub](https://github.com) 계정
2. [Vercel](https://vercel.com) 계정
3. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 계정

## 1단계: GitHub 저장소 생성

### 1.1 Git 초기화

```bash
cd c:\Users\seongmin\Desktop\KNU_B
git init
git add .
git commit -m "feat: 공주대학교 배리어프리 맵 초기 버전"
```

### 1.2 GitHub에 저장소 생성

1. [GitHub](https://github.com/new) 접속
2. Repository name: `knu-barrier-free-map` 입력
3. Description: `공주대학교 신관캠퍼스 배리어프리 맵` 입력
4. Public 또는 Private 선택
5. "Create repository" 클릭

### 1.3 원격 저장소 연결 및 푸시

```bash
git remote add origin https://github.com/<your-username>/knu-barrier-free-map.git
git branch -M main
git push -u origin main
```

## 2단계: 네이버 지도 API 설정

### 2.1 API 키 발급

1. [네이버 클라우드 플랫폼 콘솔](https://console.ncloud.com/) 접속
2. Services > Application Service > Maps 선택
3. "Application 등록" 클릭
4. Application 정보 입력:
   - Application 이름: `KNU 배리어프리 맵`
   - Service: `Web Dynamic Map` 체크
   - Web 서비스 URL: `http://localhost:3000` (개발용)
5. "등록" 클릭 후 Client ID 복사

### 2.2 프로덕션 URL 추가 (배포 후)

Vercel 배포 후 프로덕션 URL을 네이버 클라우드에 추가:
1. Application 관리 > 수정
2. Web 서비스 URL에 Vercel URL 추가 (예: `https://your-app.vercel.app`)
3. "수정" 클릭

## 3단계: Vercel 배포

### 3.1 Vercel 프로젝트 생성

1. [Vercel](https://vercel.com/login) 접속 및 로그인
2. "Add New..." > "Project" 클릭
3. GitHub 계정 연동 (처음 사용 시)
4. `knu-barrier-free-map` 저장소 선택

### 3.2 프로젝트 설정

**Framework Preset**: Next.js (자동 감지)

**Root Directory**: `./` (기본값 유지)

**Build Command**: `npm run build` (기본값 유지)

**Output Directory**: `.next` (기본값 유지)

### 3.3 환경 변수 설정

"Environment Variables" 섹션에서 다음 값 추가:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 네이버 지도 API Client ID |

선택사항 (Firebase 사용 시):
| Name | Value |
|------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | your-project-id |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | sender-id |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | app-id |

### 3.4 배포 시작

1. "Deploy" 버튼 클릭
2. 빌드 및 배포 진행 상황 확인 (약 2-3분 소요)
3. 배포 완료 후 프로덕션 URL 복사 (예: `https://knu-barrier-free-map.vercel.app`)

## 4단계: 배포 확인

### 4.1 프로덕션 URL 확인

배포된 URL로 접속하여 다음 사항 확인:

- ✅ 지도가 정상적으로 표시되는지
- ✅ 건물 마커가 표시되는지
- ✅ 건물 클릭 시 상세정보가 나타나는지
- ✅ 검색 및 필터 기능이 작동하는지
- ✅ 고대비 모드 토글이 작동하는지
- ✅ 모바일에서 반응형 디자인이 적용되는지

### 4.2 네이버 지도 API URL 업데이트

프로덕션 URL을 네이버 클라우드 플랫폼에 추가 (2.2 단계 참조)

## 5단계: 자동 배포 설정

이후 `main` 브랜치에 변경사항을 푸시하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

Vercel이 자동으로 빌드 및 배포를 진행합니다.

## 커스텀 도메인 설정 (선택사항)

### 1. Vercel에서 도메인 추가

1. Vercel 프로젝트 페이지 > "Settings" > "Domains"
2. 원하는 도메인 입력 (예: `barrier-free.knu.ac.kr`)
3. DNS 레코드 추가 안내 확인

### 2. DNS 설정

도메인 관리 페이지에서 다음 레코드 추가:

**Type**: CNAME  
**Name**: `barrier-free` (또는 원하는 서브도메인)  
**Value**: `cname.vercel-dns.com`

### 3. SSL 인증서 자동 발급

Vercel이 Let's Encrypt를 통해 SSL 인증서를 자동으로 발급합니다 (수 분 소요).

## 문제 해결

### 지도가 표시되지 않는 경우

1. 브라우저 개발자 도구 (F12) > Console 확인
2. 네이버 지도 API 키가 올바른지 확인
3. 네이버 클라우드에 프로덕션 URL이 등록되었는지 확인

### 빌드 실패 시

1. Vercel 빌드 로그 확인
2. 로컬에서 `npm run build` 실행하여 오류 확인
3. 환경 변수가 올바르게 설정되었는지 확인

### 데이터가 표시되지 않는 경우

1. `data/buildings.json` 파일이 포함되어 있는지 확인
2. 파일 경로가 올바른지 확인
3. JSON 형식이 유효한지 확인

## 유지보수

### 건물 데이터 업데이트

1. `data/buildings.json` 파일 수정
2. 변경사항 커밋 및 푸시

```bash
git add data/buildings.json
git commit -m "update: 건물 데이터 업데이트"
git push origin main
```

Vercel이 자동으로 재배포합니다.

### Firebase 관리자 기능 활성화

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 새 프로젝트 생성
3. Authentication, Firestore, Storage 활성화
4. 웹 앱 등록 및 구성 정보 복사
5. Vercel 환경 변수에 Firebase 설정 추가
6. Vercel에서 재배포

## 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [네이버 지도 API 가이드](https://www.ncloud.com/product/applicationService/maps)
- [Firebase 문서](https://firebase.google.com/docs)
