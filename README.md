# 스킨케어 유틸리티 (Skincare Vibe)

내 피부를 위한 스마트 가이드 - 화장품 성분 분석부터 홈케어 루틴까지

## 🚀 주요 기능

### 1. 🚦 화장품 성분 신호등
- 화장품 전성분을 붙여넣으면 주의 성분을 즉시 확인
- 위험도별 색상 구분 (높음/중간/낮음)
- 성분별 상세 설명 제공

### 2. 🔍 피부 특징 확인 가이드
- 세안 후 증상으로 알아보는 피부 성향

### 3. 💆‍♀️ 0원 셀프 홈케어 가이드
- 전문가 도움 없이 집에서 하는 림프 마사지

### 4. ✨ D-1 중요날 찰떡 루틴
- 화장이 잘 먹는 최상의 피부 컨디션 만들기

### 5. 🚨 오늘 밤 긴급 진정 가이드
- 갑작스러운 피부 고민을 위한 화장품 사용 순서

### 6. 🩹 흔적 & 케어 루틴 가이드
- 맑은 피부톤을 위한 부위별 스킨케어 팁

## 🛠️ 기술 스택

- **HTML5** - 시맨틱 마크업
- **CSS3** - 다크 네이비 테마, 반응형 디자인
- **Vanilla JavaScript** - CORS 문제 해결 (내장 데이터 방식)

## 📦 설치 및 실행

### 로컬 환경에서 실행

1. 저장소 클론
```bash
git clone https://github.com/yourusername/skincarevibe.git
cd skincarevibe
```

2. 브라우저에서 열기
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

또는 간단한 로컬 서버 실행:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server
```

그 다음 브라우저에서 `http://localhost:8000` 접속

## 🧪 테스트 방법

### 전성분 분석기 테스트

1. `ingredient.html` 페이지 열기
2. 아래 테스트 성분을 입력창에 붙여넣기:

```
정제수, 글리세린, 부틸렌글리콜, 나이아신아마이드, 페녹시에탄올, 파라벤, 향료, 소듐라우릴설페이트, 시어버터, 에탄올
```

3. "주의 성분 확인하기" 버튼 클릭
4. 결과 확인:
   - 🔴 높은 주의: 파라벤, 향료, 소듐라우릴설페이트
   - 🟡 중간 주의: 페녹시에탄올, 시어버터, 에탄올

### 간단 테스트 페이지

프로젝트에 `test-ingredient.html` 파일이 포함되어 있습니다. 이 파일을 브라우저에서 열면 최소한의 스타일로 기능을 테스트할 수 있습니다.

```bash
# macOS
open test-ingredient.html

# Windows
start test-ingredient.html
```

### 디버깅 방법

브라우저 개발자 도구(F12)의 콘솔을 열면 상세한 로그를 확인할 수 있습니다:

```
✅ 전성분 분석기 로드 완료
📊 내장 데이터 개수: 35 개
✅ 모든 요소 연결 완료
  - 버튼 ID: analyze-btn
  - 입력창 ID: ingredient-input
  - 결과창 ID: result-area
✅ 이벤트 리스너 등록 완료
🖱️ 버튼 클릭 감지됨!
🔍 분석 시작
  - 입력 길이: 123 자
🔬 analyzeIngredients 함수 실행
📋 분리된 성분 개수: 10
  ⚠️ 매칭됨: 페녹시에탄올 → 페녹시에탄올
  ⚠️ 매칭됨: 파라벤 → 파라벤
⚠️ 발견된 주의 성분: 6 개
  - 높은 위험: 3 개
  - 중간 위험: 3 개
  - 낮은 위험: 0 개
📜 결과 영역으로 스크롤 완료
```

만약 버튼이 작동하지 않는다면:
1. 콘솔에서 에러 메시지 확인
2. 요소 ID가 올바른지 확인
3. JavaScript 파일이 제대로 로드되었는지 확인

## 🔧 CORS 문제 해결

이 프로젝트는 **로컬 환경에서 fetch API 사용 시 발생하는 CORS 에러를 해결**하기 위해 다음과 같은 방식을 사용합니다:

### 문제
```javascript
// ❌ 로컬에서 작동하지 않음
fetch('ingredients.json')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 해결책
```javascript
// ✅ 데이터를 JavaScript 파일에 직접 내장
const ingredientData = [
  { name: '에탄올', risk: 'medium', ... },
  { name: '파라벤', risk: 'high', ... }
];
```

이 방식으로 **외부 파일 로드 없이** 모든 기능이 정상 작동합니다.

## 📁 프로젝트 구조

```
skincarevibe/
├── index.html              # 메인 페이지
├── ingredient.html         # 성분 분석 페이지
├── assets/
│   ├── css/
│   │   └── style.css      # 통합 스타일시트
│   └── js/
│       ├── script.js      # 메인 페이지 로직
│       ├── ingredient.js  # 성분 분석 로직 (내장 데이터)
│       └── menu.js        # 햄버거 메뉴 로직
└── README.md
```

## 🎨 디자인 특징

- **다크 네이비 테마**: 눈의 피로를 줄이는 고급스러운 색상
- **KV 배경 애니메이션**: 부드러운 그라데이션 효과
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 대응
- **접근성**: ARIA 레이블, 시맨틱 HTML 사용

## 🚫 제거된 기능

- ~~compatibility.html~~ (폐기됨)
- ~~compatibility.js~~ (폐기됨)

## 📝 라이선스

MIT License

## 👨‍💻 개발자

스킨케어 유틸리티 팀

---

**Note**: 이 프로젝트는 교육 및 정보 제공 목적으로 제작되었습니다. 피부 문제가 심각한 경우 전문의와 상담하세요.