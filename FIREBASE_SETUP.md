# Firebase 설정 가이드

이 가이드는 공주대학교 배리어프리 맵 프로젝트에서 Firebase를 설정하는 방법을 안내합니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속합니다
2. **프로젝트 추가** 버튼을 클릭합니다
3. 프로젝트 이름을 입력합니다 (예: `knu-barrier-free-map`)
4. Google Analytics는 선택 사항입니다 (권장: 사용 안 함)
5. **프로젝트 만들기**를 클릭합니다

## 2. Firebase 웹 앱 등록

1. Firebase 콘솔의 프로젝트 개요 페이지에서 **웹 아이콘(</>)**을 클릭합니다
2. 앱 닉네임을 입력합니다 (예: `KNU Barrier Free Map`)
3. Firebase Hosting은 체크하지 않습니다 (Vercel 사용 예정)
4. **앱 등록**을 클릭합니다
5. Firebase SDK 구성 정보를 복사해둡니다

## 3. Firestore Database 설정

1. Firebase 콘솔 왼쪽 메뉴에서 **Firestore Database**를 선택합니다
2. **데이터베이스 만들기** 버튼을 클릭합니다
3. **프로덕션 모드로 시작**을 선택합니다
4. Cloud Firestore 위치를 선택합니다 (권장: `asia-northeast3 (Seoul)`)
5. **사용 설정**을 클릭합니다

### 3.1. Firestore 보안 규칙 설정

**규칙** 탭에서 다음 규칙을 설정합니다:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 건물 데이터는 모든 사용자가 읽을 수 있음
    match /buildings/{buildingId} {
      allow read: if true;
      // 관리자만 쓰기 가능 (인증된 사용자)
      allow write: if request.auth != null;
    }
    
    // 다른 모든 문서는 관리자만 접근 가능
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3.2. Firestore 인덱스 생성 (선택 사항)

**인덱스** 탭에서 필요시 복합 인덱스를 추가합니다:

- 컬렉션 ID: `buildings`
- 필드: `building_name` (Ascending), `wheelchair_access` (Ascending)

## 4. Firebase Storage 설정

1. Firebase 콘솔 왼쪽 메뉴에서 **Storage**를 선택합니다
2. **시작하기** 버튼을 클릭합니다
3. **프로덕션 모드로 시작**을 선택합니다
4. 위치는 Firestore와 동일하게 설정합니다 (`asia-northeast3`)
5. **완료**를 클릭합니다

### 4.1. Storage 보안 규칙 설정

**Rules** 탭에서 다음 규칙을 설정합니다:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // 이미지는 모든 사용자가 읽을 수 있음
    match /images/{allPaths=**} {
      allow read: if true;
      // 관리자만 업로드 가능
      allow write: if request.auth != null;
    }
    
    // 다른 모든 파일은 관리자만 접근 가능
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 5. Firebase Authentication 설정

1. Firebase 콘솔 왼쪽 메뉴에서 **Authentication**을 선택합니다
2. **시작하기** 버튼을 클릭합니다
3. **로그인 방법** 탭에서 **이메일/비밀번호**를 활성화합니다
4. **저장**을 클릭합니다

### 5.1. 관리자 계정 생성

1. **Users** 탭으로 이동합니다
2. **사용자 추가** 버튼을 클릭합니다
3. 관리자 이메일과 비밀번호를 입력합니다
4. **사용자 추가**를 클릭합니다

## 6. 환경 변수 설정

1. 프로젝트 루트의 `.env.local` 파일을 열거나 생성합니다
2. Firebase SDK 구성 정보를 다음 형식으로 입력합니다:

```env
# 네이버 지도 API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. **주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

## 7. 초기 데이터 업로드

프로젝트의 `data/buildings.json` 파일에 있는 건물 데이터를 Firestore에 업로드하려면:

### 방법 1: Firebase Console에서 수동 업로드

1. Firestore Database로 이동합니다
2. **컬렉션 시작**을 클릭하고 컬렉션 ID를 `buildings`로 입력합니다
3. 각 건물 데이터를 문서로 추가합니다

### 방법 2: 스크립트를 사용한 자동 업로드 (권장)

프로젝트에 아래 스크립트를 생성하고 실행합니다:

**scripts/uploadToFirestore.js**:

```javascript
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase 설정 (.env.local에서 가져옴)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// buildings.json 파일 읽기
const buildingsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'buildings.json'), 'utf-8')
);

async function uploadBuildings() {
  try {
    for (const building of buildingsData) {
      await setDoc(doc(db, 'buildings', building.id), building);
      console.log(`✅ Uploaded: ${building.building_name}`);
    }
    console.log(`\n🎉 Successfully uploaded ${buildingsData.length} buildings!`);
  } catch (error) {
    console.error('❌ Error uploading buildings:', error);
  }
}

uploadBuildings();
```

실행:

```bash
# .env.local 파일을 먼저 설정한 후
node -r dotenv/config scripts/uploadToFirestore.js
```

**Note**: `dotenv` 패키지가 필요합니다:

```bash
npm install dotenv --save-dev
```

## 8. Vercel 환경 변수 설정

Vercel에 배포할 때도 환경 변수를 설정해야 합니다:

1. [Vercel Dashboard](https://vercel.com/dashboard)에서 프로젝트를 선택합니다
2. **Settings** → **Environment Variables**로 이동합니다
3. `.env.local`의 모든 변수를 추가합니다:
   - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. 각 변수를 **Production**, **Preview**, **Development** 환경 모두에 적용합니다
5. **Save**를 클릭합니다
6. 프로젝트를 재배포합니다

## 9. 테스트

### 로컬 테스트

```bash
npm run dev
```

1. `http://localhost:3000`에서 지도가 정상적으로 표시되는지 확인합니다
2. `/admin`으로 이동하여 로그인 기능을 테스트합니다
3. 관리자 계정으로 로그인 후 건물 데이터 관리가 가능한지 확인합니다

### 프로덕션 테스트

Vercel 배포 후:

1. 배포된 URL에서 지도가 정상 작동하는지 확인합니다
2. 관리자 페이지 로그인이 정상 작동하는지 확인합니다
3. 모든 건물 데이터가 올바르게 표시되는지 확인합니다

## 10. 문제 해결

### Firebase API Key 오류

- `.env.local` 파일의 모든 환경 변수가 정확한지 확인합니다
- 따옴표 없이 값만 입력했는지 확인합니다
- 개발 서버를 재시작합니다

### Firestore 권한 오류

- Firestore 보안 규칙이 올바르게 설정되었는지 확인합니다
- 읽기는 모든 사용자에게 허용되어야 합니다
- 쓰기는 인증된 사용자만 가능해야 합니다

### Storage 업로드 오류

- Storage 보안 규칙을 확인합니다
- 관리자 계정으로 로그인했는지 확인합니다
- 파일 크기 제한(기본 5MB)을 확인합니다

### 네이버 지도 API 오류

- 네이버 클라우드 플랫폼에서 API 키를 발급받았는지 확인합니다
- Web Dynamic Map API가 활성화되었는지 확인합니다
- 배포된 도메인이 허용된 도메인 목록에 추가되었는지 확인합니다

## 11. 추가 보안 설정 (선택 사항)

### Firebase App Check 활성화

1. Firebase 콘솔에서 **App Check**를 선택합니다
2. 웹 앱을 등록합니다
3. reCAPTCHA Enterprise 또는 reCAPTCHA v3를 설정합니다
4. **Enforce**를 활성화합니다

### 네이버 지도 API 도메인 제한

1. [네이버 클라우드 플랫폼 콘솔](https://console.ncloud.com/)에 로그인합니다
2. **Services** → **AI·NAVER API** → **Application**으로 이동합니다
3. 애플리케이션을 선택하고 **Web 서비스 URL** 설정에서 허용할 도메인을 추가합니다

## 완료!

이제 Firebase 설정이 완료되었습니다. 관리자 페이지에서 건물 정보를 관리하고, 사용자는 배리어프리 시설 정보를 쉽게 확인할 수 있습니다.

## 참고 문서

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Next.js Firebase 통합 가이드](https://firebase.google.com/docs/web/setup)
- [네이버 지도 API 문서](https://navermaps.github.io/maps.js.ncp/)
- [Vercel 환경 변수 문서](https://vercel.com/docs/concepts/projects/environment-variables)
