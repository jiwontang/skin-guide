// ========================================
// 전성분 분석기 - CORS 문제 해결 버전
// ========================================

// 주의 성분 데이터베이스 (내장형 - fetch 불필요)
const ingredientData = [
  {
    name: '에탄올',
    category: '알코올',
    risk: 'medium',
    description: '피부 건조 및 자극 유발 가능'
  },
  {
    name: '페녹시에탄올',
    category: '방부제',
    risk: 'medium',
    description: '민감성 피부 자극 가능'
  },
  {
    name: '파라벤',
    category: '방부제',
    risk: 'high',
    description: '호르몬 교란 물질 의심'
  },
  {
    name: '메틸파라벤',
    category: '방부제',
    risk: 'high',
    description: '호르몬 교란 물질 의심'
  },
  {
    name: '프로필파라벤',
    category: '방부제',
    risk: 'high',
    description: '호르몬 교란 물질 의심'
  },
  {
    name: '부틸파라벤',
    category: '방부제',
    risk: 'high',
    description: '호르몬 교란 물질 의심'
  },
  {
    name: '인공향료',
    category: '향료',
    risk: 'high',
    description: '알레르기 반응 유발 가능'
  },
  {
    name: '향료',
    category: '향료',
    risk: 'high',
    description: '알레르기 반응 유발 가능'
  },
  {
    name: '미네랄오일',
    category: '오일',
    risk: 'medium',
    description: '모공 막힘 유발 가능'
  },
  {
    name: '피이지',
    category: '계면활성제',
    risk: 'high',
    description: '피부 장벽 손상 가능'
  },
  {
    name: '소듐라우릴설페이트',
    category: '계면활성제',
    risk: 'high',
    description: '피부 장벽 손상 및 자극'
  },
  {
    name: '소듐라우릴',
    category: '계면활성제',
    risk: 'high',
    description: '피부 장벽 손상 및 자극'
  },
  {
    name: 'SLS',
    category: '계면활성제',
    risk: 'high',
    description: '피부 장벽 손상 및 자극'
  },
  {
    name: '에센셜오일',
    category: '향료',
    risk: 'medium',
    description: '민감성 피부 자극 가능'
  },
  {
    name: '시어버터',
    category: '오일',
    risk: 'medium',
    description: '코메도제닉 - 모공 막힘 가능'
  },
  {
    name: '코코넛오일',
    category: '오일',
    risk: 'medium',
    description: '코메도제닉 - 여드름 악화 가능'
  },
  {
    name: '트리클로산',
    category: '항균제',
    risk: 'high',
    description: '호르몬 교란 및 내성균 발생'
  },
  {
    name: '포름알데히드',
    category: '방부제',
    risk: 'high',
    description: '발암 물질 의심'
  },
  {
    name: '포름알데히드 방출제',
    category: '방부제',
    risk: 'high',
    description: '발암 물질 의심'
  },
  {
    name: '벤조산',
    category: '방부제',
    risk: 'medium',
    description: '민감성 피부 자극 가능'
  },
  {
    name: '벤조산나트륨',
    category: '방부제',
    risk: 'medium',
    description: '민감성 피부 자극 가능'
  },
  {
    name: '황산염',
    category: '계면활성제',
    risk: 'medium',
    description: '피부 건조 유발'
  },
  {
    name: '황산나트륨',
    category: '계면활성제',
    risk: 'medium',
    description: '피부 건조 유발'
  },
  {
    name: '황산마그네슘',
    category: '계면활성제',
    risk: 'medium',
    description: '피부 건조 유발'
  },
  {
    name: '프로필렌글리콜',
    category: '용매',
    risk: 'medium',
    description: '민감성 피부 자극 가능'
  },
  {
    name: '부틸렌글리콜',
    category: '용매',
    risk: 'low',
    description: '일반적으로 안전하나 고농도 시 자극 가능'
  },
  {
    name: '디메티콘',
    category: '실리콘',
    risk: 'low',
    description: '모공 막힘 가능 (개인차 있음)'
  },
  {
    name: '시클로메티콘',
    category: '실리콘',
    risk: 'low',
    description: '모공 막힘 가능 (개인차 있음)'
  },
  {
    name: '페놀',
    category: '방부제',
    risk: 'high',
    description: '강한 자극 및 독성'
  },
  {
    name: '포름산',
    category: '방부제',
    risk: 'high',
    description: '강한 자극성'
  },
  {
    name: '아세트산',
    category: '산',
    risk: 'medium',
    description: '고농도 시 자극 가능'
  },
  {
    name: '살리실산',
    category: '각질제거제',
    risk: 'low',
    description: '적정 농도 사용 시 안전 (과다 사용 주의)'
  },
  {
    name: '글리콜산',
    category: '각질제거제',
    risk: 'low',
    description: '적정 농도 사용 시 안전 (과다 사용 주의)'
  },
  {
    name: '락틱산',
    category: '각질제거제',
    risk: 'low',
    description: '적정 농도 사용 시 안전 (과다 사용 주의)'
  }
];

// 간단한 검색용 배열 (빠른 매칭)
const warningKeywords = ingredientData.map(item => item.name.toLowerCase());

// ========================================
// 모든 리소스 로드 후 실행 (CORS 안전)
// ========================================
window.addEventListener('load', () => {
  console.log('✅ 전성분 분석기 로드 완료');
  console.log('📊 내장 데이터 개수:', ingredientData.length, '개');

  try {
    // 요소 선택 (ID 강제 동기화)
    const btn = document.getElementById('analyze-btn');
    const input = document.getElementById('ingredient-input');
    const resultArea = document.getElementById('result-area');

    // 요소 존재 확인
    if (!btn || !input || !resultArea) {
      console.error('❌ 전성분 분석기: 필수 요소를 찾을 수 없습니다.');
      console.log('버튼:', btn, '입력창:', input, '결과창:', resultArea);

      // 페이지에 에러 메시지 표시
      if (resultArea) {
        resultArea.innerHTML = `
          <div class="result-message warning">
            ⚠️ 페이지 요소를 찾을 수 없습니다. 페이지를 새로고침해주세요.
          </div>
        `;
      }
      return;
    }

    console.log('✅ 모든 요소 연결 완료');
    console.log('  - 버튼 ID:', btn.id);
    console.log('  - 입력창 ID:', input.id);
    console.log('  - 결과창 ID:', resultArea.id);

    // 분석 버튼 클릭 이벤트
    btn.addEventListener('click', () => {
      try {
        const text = input.value.trim();
        console.log('🔍 분석 시작');
        console.log('  - 입력 길이:', text.length, '자');

        // 입력값 검증
        if (!text) {
          resultArea.innerHTML = `
            <div class="result-message warning">
              ⚠️ 성분을 입력해주세요.
            </div>
          `;
          return;
        }

        // 성분 분석 실행
        analyzeIngredients(text, resultArea);
      } catch (error) {
        console.error('❌ 분석 중 오류 발생:', error);
        resultArea.innerHTML = `
          <div class="result-message warning">
            ⚠️ 분석 중 오류가 발생했습니다: ${error.message}
          </div>
        `;
      }
    });

    // Ctrl+Enter 단축키 지원
    input.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        console.log('⌨️ Ctrl+Enter 단축키 실행');
        btn.click();
      }
    });

    console.log('✅ 이벤트 리스너 등록 완료');

    // 버튼 클릭 테스트
    btn.addEventListener('click', () => {
      console.log('🖱️ 버튼 클릭 감지됨!');
    }, { once: true });

  } catch (error) {
    console.error('❌ 초기화 중 오류 발생:', error);
  }
});

// ========================================
// 핵심 분석 로직 (내장 데이터 사용)
// ========================================
function analyzeIngredients(inputText, resultArea) {
  try {
    console.log('🔬 analyzeIngredients 함수 실행');

    // 입력 텍스트를 쉼표, 개행, 공백으로 분리
    const ingredients = inputText
      .split(/[,\n\s]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0);

    console.log('📋 분리된 성분 개수:', ingredients.length);
    console.log('📋 첫 5개 성분:', ingredients.slice(0, 5));

    // 주의 성분 검색 (대소문자 무시, 부분 매칭)
    const foundWarnings = [];
    const foundDetails = [];

    const highlightedText = ingredients
      .map(ingredient => {
        const lowerIngredient = ingredient.toLowerCase();

        // 데이터베이스에서 매칭되는 성분 찾기
        const matchedData = ingredientData.find(data =>
          lowerIngredient.includes(data.name.toLowerCase()) ||
          data.name.toLowerCase().includes(lowerIngredient)
        );

        if (matchedData) {
          foundWarnings.push(ingredient);
          foundDetails.push({
            name: ingredient,
            ...matchedData
          });
          console.log('  ⚠️ 매칭됨:', ingredient, '→', matchedData.name);
          return `<span class="warning-highlight">${ingredient}</span>`;
        }
        return ingredient;
      })
      .join(', ');

    console.log('⚠️ 발견된 주의 성분:', foundWarnings.length, '개');

    // 결과 렌더링
    if (foundWarnings.length === 0) {
      console.log('✅ 주의 성분 없음 - 안전 메시지 표시');
      resultArea.innerHTML = `
        <div class="result-message safe">
          ✓ 주의 성분이 발견되지 않았습니다. 안심하고 사용하세요!
        </div>
      `;
      resultArea.style.display = 'block';
    } else {
      console.log('⚠️ 주의 성분 발견 - 상세 결과 표시');

      // 위험도별 분류
      const highRisk = foundDetails.filter(item => item.risk === 'high');
      const mediumRisk = foundDetails.filter(item => item.risk === 'medium');
      const lowRisk = foundDetails.filter(item => item.risk === 'low');

      console.log('  - 높은 위험:', highRisk.length, '개');
      console.log('  - 중간 위험:', mediumRisk.length, '개');
      console.log('  - 낮은 위험:', lowRisk.length, '개');

      resultArea.innerHTML = `
        <div class="result-box">
          <h3 class="result-title">✅ 성분 확인 완료</h3>
          <p class="result-warning-count">
            주의 성분 <strong>${foundWarnings.length}</strong>개 발견됨
          </p>
          
          <div class="result-ingredients">
            <p class="result-label">입력된 성분 (주의 성분 강조):</p>
            <p class="result-text">${highlightedText}</p>
          </div>

          ${highRisk.length > 0 ? `
          <div class="result-warning-list risk-high">
            <p class="result-label">🔴 높은 주의 필요 (${highRisk.length}개):</p>
            <ul class="warning-list">
              ${highRisk.map(item => `
                <li>
                  <strong>${item.name}</strong> 
                  <span class="category">[${item.category}]</span>
                  <br><span class="desc">${item.description}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}

          ${mediumRisk.length > 0 ? `
          <div class="result-warning-list risk-medium">
            <p class="result-label">🟡 중간 주의 필요 (${mediumRisk.length}개):</p>
            <ul class="warning-list">
              ${mediumRisk.map(item => `
                <li>
                  <strong>${item.name}</strong> 
                  <span class="category">[${item.category}]</span>
                  <br><span class="desc">${item.description}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}

          ${lowRisk.length > 0 ? `
          <div class="result-warning-list risk-low">
            <p class="result-label">🟢 낮은 주의 필요 (${lowRisk.length}개):</p>
            <ul class="warning-list">
              ${lowRisk.map(item => `
                <li>
                  <strong>${item.name}</strong> 
                  <span class="category">[${item.category}]</span>
                  <br><span class="desc">${item.description}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}

          <div class="result-tip">
            💡 <strong>가이드:</strong> 위 성분들은 개인의 피부 타입에 따라 반응이 다를 수 있습니다. 
            새 제품 사용 전 패치 테스트를 권장합니다.
          </div>
        </div>
      `;
      resultArea.style.display = 'block';
    }

    // 결과 영역으로 부드럽게 스크롤
    setTimeout(() => {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      console.log('📜 결과 영역으로 스크롤 완료');
    }, 100);

  } catch (error) {
    console.error('❌ analyzeIngredients 함수 오류:', error);
    resultArea.innerHTML = `
      <div class="result-message warning">
        ⚠️ 분석 중 오류가 발생했습니다: ${error.message}
      </div>
    `;
    resultArea.style.display = 'block';
  }
}
