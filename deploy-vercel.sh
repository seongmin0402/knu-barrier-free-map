#!/bin/bash

# Vercel 자동 배포 스크립트

echo "🚀 Vercel 배포를 시작합니다..."

# Git 변경사항 확인
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 변경사항을 커밋합니다..."
    git add .
    read -p "커밋 메시지를 입력하세요: " commit_msg
    git commit -m "$commit_msg"
else
    echo "✅ 커밋할 변경사항이 없습니다."
fi

# GitHub에 push
echo "📤 GitHub에 push합니다..."
git push origin main

echo "✅ 배포 완료! GitHub Actions가 자동으로 Vercel에 배포합니다."
echo "🌐 배포 상황은 다음에서 확인하세요:"
echo "   - GitHub: https://github.com/seongmin0402/knu-barrier-free-map/actions"
echo "   - Vercel: https://vercel.com/dashboard"
