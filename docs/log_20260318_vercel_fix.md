# 📝 작업 로그 (Work Log)

## 📅 작성일: 2026-03-18

---

### 🚨 [에러] (Error)
- **현상**: Vercel 배포 후 화면이 비어 보이거나 페이지 로드가 정상적으로 되지 않음.
- **원인**: `vite.config.ts`의 `base` 경로가 `'/ai-student-id/'`로 고정되어 있었기 때문에, Vercel의 루트(`/`) 배포 환경에서 애셋(Asset) 경로를 찾지 못하는 문제 발생 (404 템플릿 로드 에러 추정). 원래 이 설정은 GitHub Pages 등을 타겟팅할 때 유용함.

---

### 💡 [해결] (Fix)
- **방향**: 배포 환경에 따라 `base` 경로를 동적으로 분기 처리합니다.
- **코드**:
  ```typescript
  base: process.env.VERCEL || process.env.NODE_ENV === 'development' ? '/' : '/ai-student-id/'
  ```
  - `process.env.VERCEL`가 존재하면 Vercel 배포 환경이므로 `'/'` 사용.
  - `process.env.NODE_ENV === 'development'`이면 로컬 테스트 환경이므로 `'/'` 사용.
  - 그 외(예: GitHub Pages 배포 시) `'/ai-student-id/'` 사용.

---

### ✅ [구현 및 검증] (Implementation & Verification)
1. **`vite.config.ts` 수정 완료**: 조건부 `base` 경로 설정 반영.
2. **로컬 빌드 테스트 성공**:
   - `npm run build` 명령어 정상 종료 (Exit code: 0)
   - `dist/index.html` 및 에셋 정상 생성 확인.

---

### 📌 [다음 작업 시 참고 사항] (Notes for Next Tasks)
- 앞으로 다른 플랫폼에 배포할 때 배포 환경에 따라 고정된 경로가 문제될 수 있으므로 환경 변수를 활용한 동적 할당을 권장합니다.
- 깃허브에 푸시 시 Vercel에서 즉시 변경 사항을 반영하여 빌드가 진행되므로 정상적인 화면 출력을 기대할 수 있습니다.
