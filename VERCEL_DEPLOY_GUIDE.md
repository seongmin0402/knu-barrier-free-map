# Vercel 배포 가이드

## 🚀 방법 1: 간단한 자동 배포 (권장)

### Windows 사용자:
```bash
# 더블클릭으로 실행
deploy-vercel.bat
```

### Mac/Linux 사용자:
```bash
# 실행 권한 부여 (최초 1회)
chmod +x deploy-vercel.sh

# 실행
./deploy-vercel.sh
```

---

## 🚀 방법 2: 수동 Git Push

```bash
# 1. 변경사항 추가
git add .

# 2. 커밋
git commit -m "feat: Update barrier-free map"

# 3. GitHub에 push (자동으로 Vercel 배포됨)
git push origin main
```

**배포 확인:**
- GitHub Actions: https://github.com/seongmin0402/knu-barrier-free-map/actions
- Vercel Dashboard: https://vercel.com/dashboard

---

## 🚀 방법 3: Vercel CLI 직접 사용

### 설치 (최초 1회):
```bash
npm install -g vercel
```

### 로그인:
```bash
vercel login
```

### 배포:
```bash
# 프로덕션 배포
vercel --prod

# 프리뷰 배포 (테스트용)
vercel
```

---

## 🚀 방법 4: Vercel Dashboard 수동 배포

1. https://vercel.com/dashboard 접속
2. `knu-barrier-free-map` 프로젝트 선택
3. **Deployments** 탭
4. **Redeploy** 버튼 클릭

---

## ⚙️ 배포 전 필수 체크리스트

### 1. Vercel 환경 변수 설정
```
Settings → Environment Variables에서 확인:

✅ NEXT_PUBLIC_NAVER_MAP_CLIENT_ID = 82qb1njpxy
```

### 2. 네이버 클라우드 플랫폼 도메인 등록
```
https://console.ncloud.com
→ AI·NAVER API → Application

Web 서비스 URL:
✅ https://knu-barrier-free-map.vercel.app
✅ https://*.vercel.app
✅ http://localhost:3000
```

### 3. 로컬 빌드 테스트
```bash
# 빌드가 성공하는지 확인
npm run build

# 로컬에서 프로덕션 모드 실행
npm start
```

---

## 📊 GitHub Actions 자동 배포 (이미 설정됨)

현재 프로젝트는 **GitHub Actions**가 설정되어 있습니다.

### 작동 방식:
```
main 브랜치에 push
    ↓
GitHub Actions 자동 실행
    ↓
1. Lint 검사
2. 빌드
3. Vercel 배포
    ↓
배포 완료! 🎉
```

### GitHub Secrets 설정 (필수):

https://github.com/seongmin0402/knu-barrier-free-map/settings/secrets/actions

다음 시크릿들을 추가해야 합니다:

| Name | Value | 설명 |
|------|-------|------|
| `VERCEL_TOKEN` | Vercel에서 발급 | Vercel 인증 토큰 |
| `VERCEL_ORG_ID` | Vercel 프로젝트 정보 | Organization ID |
| `VERCEL_PROJECT_ID` | Vercel 프로젝트 정보 | Project ID |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | `82qb1njpxy` | 네이버 지도 API 키 |

#### Vercel 토큰 발급 방법:
1. https://vercel.com/account/tokens
2. **Create Token**
3. 이름: `GitHub Actions`
4. Scope: **Full Account**
5. 생성된 토큰 복사

#### Project ID & Org ID 확인 방법:
```bash
# 방법 1: Vercel CLI
vercel link
cat .vercel/project.json

# 방법 2: Vercel Dashboard
프로젝트 Settings → General
```

---

## 🔍 배포 상태 확인

### 1. GitHub Actions 로그
```
GitHub 저장소 → Actions 탭
→ 최신 워크플로우 클릭
→ 각 단계별 로그 확인
```

### 2. Vercel 배포 로그
```
Vercel Dashboard → Deployments
→ 최신 배포 클릭
→ Building, Function Logs 확인
```

### 3. 배포 URL
```
Production: https://knu-barrier-free-map.vercel.app
Preview: https://knu-barrier-free-map-git-[branch].vercel.app
```

---

## ❌ 문제 해결

### "Authentication Failed" 에러
**원인:** 네이버 클라우드에 도메인 미등록
**해결:** 
1. https://console.ncloud.com
2. Application 설정에 Vercel URL 추가
3. 저장 후 2-3분 대기

### "Build Failed" 에러
**원인:** 환경 변수 미설정 또는 코드 오류
**해결:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 확인 및 수정
git add .
git commit -m "fix: Build error"
git push origin main
```

### "Deployment Failed" 에러
**원인:** Vercel 인증 문제
**해결:**
1. GitHub Secrets 확인
2. VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID 확인
3. 토큰 재발급

### 환경 변수가 적용되지 않음
**원인:** 재배포 안 함
**해결:**
```
Vercel Dashboard → Deployments → Redeploy
```

---

## 🎯 빠른 배포 가이드

### 초기 설정 (1회만):
```bash
1. GitHub에 저장소 생성 ✅
2. Vercel에 프로젝트 연결 ✅
3. Vercel 환경 변수 설정 ⚠️ (필수!)
4. 네이버 클라우드 도메인 등록 ⚠️ (필수!)
5. GitHub Secrets 설정 (자동 배포 원할 시)
```

### 이후 배포 (매번):
```bash
# 1. 코드 수정
# 2. 배포
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main

# 3. 대기 (2-3분)
# 4. 확인: https://knu-barrier-free-map.vercel.app
```

---

## 📚 유용한 링크

- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions](https://github.com/seongmin0402/knu-barrier-free-map/actions)
- [네이버 클라우드 플랫폼](https://console.ncloud.com)
- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

---

## 🎉 완료!

이제 코드를 수정하고 `git push`만 하면 자동으로 배포됩니다!

**배포 URL:** https://knu-barrier-free-map.vercel.app
