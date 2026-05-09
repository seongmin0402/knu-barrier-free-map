# GitHub Actions 자동 배포 설정 가이드

이 문서는 GitHub Actions를 통해 Vercel에 자동으로 배포하는 방법을 설명합니다.

## 1. Vercel 토큰 발급

### 1.1. Vercel 계정 로그인
1. https://vercel.com 접속
2. GitHub 계정으로 로그인

### 1.2. Vercel 토큰 생성
1. Vercel 대시보드 → 우측 상단 프로필 클릭
2. **Settings** 선택
3. 좌측 메뉴에서 **Tokens** 선택
4. **Create Token** 클릭
5. 토큰 이름 입력 (예: `GitHub Actions`)
6. Scope: **Full Account** 선택
7. **Create** 클릭
8. 생성된 토큰을 **복사**해서 안전한 곳에 보관

## 2. Vercel 프로젝트 정보 확인

### 2.1. 프로젝트 생성 (아직 안 했다면)
1. Vercel 대시보드에서 **Add New** → **Project**
2. GitHub 저장소 `knu-barrier-free-map` 선택
3. **Import** 클릭
4. 환경 변수 설정 (아래 참고)
5. **Deploy** 클릭

### 2.2. Project ID 및 Org ID 확인
프로젝트를 생성한 후:

1. 프로젝트 **Settings** 이동
2. **General** 탭에서 다음 정보 확인:
   - **Project ID**: `prj_xxxxxxxxxxxxx` 형태
   - **Organization ID**: 프로필 Settings → General에서 확인 가능

또는 터미널에서 확인:
```bash
# Vercel CLI 설치 (없다면)
npm install -g vercel

# 로그인
vercel login

# 프로젝트 디렉토리에서 실행
vercel link

# 정보 확인 (프로젝트 디렉토리에서)
cat .vercel/project.json
```

출력 예시:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

## 3. GitHub Secrets 설정

### 3.1. GitHub 저장소 Settings 이동
1. https://github.com/seongmin0402/knu-barrier-free-map
2. 상단 메뉴에서 **Settings** 클릭
3. 좌측 메뉴에서 **Secrets and variables** → **Actions** 선택

### 3.2. Repository Secrets 추가
**New repository secret** 버튼을 클릭하여 다음 시크릿들을 추가:

#### Vercel 관련 시크릿
| Name | Value | 설명 |
|------|-------|------|
| `VERCEL_TOKEN` | `your_vercel_token` | 1단계에서 생성한 토큰 |
| `VERCEL_ORG_ID` | `team_xxxxxxxxxxxxx` | Organization ID |
| `VERCEL_PROJECT_ID` | `prj_xxxxxxxxxxxxx` | Project ID |

#### 환경 변수 시크릿
| Name | Value |
|------|-------|
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | `82qb1njpxy` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key (선택) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain (선택) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID (선택) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket (선택) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID (선택) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID (선택) |

**주의**: Firebase 관련 시크릿은 관리자 기능을 사용할 때만 필요합니다.

## 4. Vercel 환경 변수 설정

Vercel 대시보드에서도 환경 변수를 설정해야 합니다:

1. Vercel 프로젝트 → **Settings** → **Environment Variables**
2. 다음 변수들을 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | `82qb1njpxy` | Production, Preview, Development |

Firebase를 사용한다면 Firebase 관련 변수들도 동일하게 추가합니다.

## 5. 자동 배포 테스트

### 5.1. 코드 Push
```bash
# 변경사항 커밋
git add .
git commit -m "feat: Add GitHub Actions auto-deploy"

# GitHub에 push
git push origin main
```

### 5.2. GitHub Actions 확인
1. GitHub 저장소로 이동
2. **Actions** 탭 클릭
3. 워크플로우 실행 상태 확인
4. 각 단계별 로그 확인 가능

### 5.3. 배포 결과 확인
- ✅ 성공 시: Vercel에서 자동으로 배포됨
- ❌ 실패 시: Actions 탭에서 에러 로그 확인

## 6. 작동 방식

### Main 브랜치에 Push할 때:
```
1. 코드 체크아웃
2. Node.js 설정
3. 의존성 설치
4. Lint 검사
5. 빌드
6. Vercel Production 배포 🚀
```

### Pull Request 생성 시:
```
1-5. 동일
6. Vercel Preview 배포 (프리뷰 URL 생성)
```

## 7. 문제 해결

### 토큰 오류
```
Error: Invalid token
```
**해결**: Vercel 토큰을 다시 생성하고 GitHub Secrets 업데이트

### 빌드 실패
```
Error: Build failed
```
**해결**: 
1. 로컬에서 `npm run build` 실행하여 오류 확인
2. `.env.local` 파일의 환경 변수 확인
3. GitHub Secrets가 올바르게 설정되었는지 확인

### 배포 실패
```
Error: Deployment failed
```
**해결**:
1. `VERCEL_ORG_ID`와 `VERCEL_PROJECT_ID`가 올바른지 확인
2. Vercel 프로젝트가 올바른 저장소와 연결되었는지 확인

### 환경 변수 없음
```
Error: NEXT_PUBLIC_NAVER_MAP_CLIENT_ID is not defined
```
**해결**:
1. GitHub Secrets에 환경 변수 추가
2. Vercel 대시보드에서도 환경 변수 추가
3. 재배포

## 8. 수동 배포

GitHub Actions를 사용하지 않고 수동으로 배포하려면:

```bash
# Vercel CLI로 배포
vercel --prod

# 또는 Vercel 대시보드에서
# Deployments 탭 → Redeploy 버튼
```

## 9. 브랜치 전략 (선택사항)

더 나은 워크플로우를 위해:

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/* (기능 개발)
```

### 워크플로우 수정 예시:
```yaml
on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main
      - develop
```

## 10. 유용한 링크

- [Vercel 문서](https://vercel.com/docs)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

## 완료! 🎉

이제 `main` 브랜치에 코드를 push할 때마다 자동으로 Vercel에 배포됩니다!

배포 URL은 다음과 같은 형식입니다:
- **Production**: `https://knu-barrier-free-map.vercel.app`
- **Preview**: `https://knu-barrier-free-map-git-[branch]-[username].vercel.app`
