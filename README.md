# 🎓 AI 프리패스 학생증 (AI Student ID)

**우리아이 안전하고 즐거운 학교 AI 실습을 위한 단 두 개의 공용 계정 준비 가이드 & 100% 보안(No-DB) 학생증 이미지 발급 웹앱입니다.**

아이들이 학교 컴퓨터에서 다양한 AI 서비스(ChatGPT, Gemini, Copilot 등)를 원활히 실습할 수 있도록 학부모님들께 필수 계정(Google, Microsoft) 준비를 안내합니다. 더불어, 아이들이 어려운 영문 비밀번호를 잊지 않도록 **어떠한 서버 저장도 없이 브라우저 단에서 안전하게 이미지만 생성해주는 귀여운 학생증 발급기**를 제공합니다.

## ✨ 주요 특징 (Key Features)

- **🛡️ 100% 클라이언트 사이드 보안 (No-DB)**
  - 사용자가 입력한 아이디와 비밀번호 정보는 그 어떠한 서버(Database)나 로컬 스토리지에도 전송되거나 저장되지 않습니다. 
  - 오직 사용자 기기(브라우저) 안에서 입력과 동시에 암호화/이미지화가 이루어지고 **휘발**됩니다.
  
- **🎨 2026 트렌드 기반의 따뜻한 웜톤 & 일러스트 UI**
  - 딱딱한 정책 안내를 벗어나, 학교 공책(모눈종이)과 교실 감성의 따뜻한 오렌지/옐로우/파스텔블루 테마로 가독성을 높였습니다.
  - 단순 텍스트가 아닌 고화질 SVG 일러스트 형 아바타(남/여학생 커스텀)와 구글/MS 공식 로고를 지원합니다.

- **📸 고화질 렌더링 & 다이렉트 쉐어 (Web Share API)**
  - `html-to-image` 패키지에 고해상도 옵션(`pixelRatio: 4`)을 주어 텍스트나 바코드가 깨지지 않고 선명하게 기기 갤러리에 저장됩니다.
  - 모바일에서는 OS 기본 메신저(카카오톡, 문자 등)로 **즉시 전송(Share)** 이 지원되어 부모님이 만들어서 자녀에게 바로 공유할 수 있습니다.
  - PC 환경이나 브라우저 공유를 미지원 할 경우엔, 안전하게 `downloadjs` 모듈을 통해 데스크톱 내 이미지 파일로 폴백 다운로드됩니다.

- **📱 완벽한 반응형 레이아웃 및 가독성 최적화**
  - Tailwind CSS의 `v4` 컨테이너 쿼리를 활용해 다양한 모바일 및 태블릿 화면에서도 어색함 없이 완벽한 비율의 1.58:1 학생증 컴포넌트를 제공합니다.
  - 한국어 문장 자동 줄나눔(`break-keep`) 처리를 적용해 어절이 어색하게 끊기는 현상을 방지했습니다.

## 🛠 기술 스택 (Tech Stack)

*   **Frontend Library**: React 18
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
*   **Animation**: Framer Motion
*   **Icons**: Lucide React
*   **Image Processing**: `html-to-image`, `downloadjs`

## 🚀 로컬 실행 방법 (Getting Started)

프로젝트를 클론하고 로컬 환경에서 실행하는 방법입니다.

```bash
# 1. 저장소 클론
git clone https://github.com/사용자계정명/ai-student-id.git

# 2. 프로젝트 폴더로 이동
cd ai-student-id

# 3. 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```


## 📞 팀 (Team & Contact)

> 본 랜딩 페이지와 생성 로직은 **Aklabs (아크랩스)** 에서 제작/가이드 되었습니다.
> 더욱 다양하고 재미있는 교육 및 AI 프로젝트 정보를 확인하시려면 아래 홈페이지를 방문해 주세요!
> 
> 🔗 **아크랩스 홈페이지**: [https://litt.ly/aklabs](https://litt.ly/aklabs)
