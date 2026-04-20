// 트러블 감별기 확인 로직
window.addEventListener('load', function () {
  const checkboxes = document.querySelectorAll('.checkbox-input');
  const ctaButton = document.querySelector('.hero-tool__cta');
  const heroToolContent = document.querySelector('.hero-tool__content');

  if (!ctaButton || !heroToolContent) return;

  // 확인 결과를 표시할 영역 생성
  const resultContainer = document.createElement('div');
  resultContainer.className = 'diagnosis-result';
  resultContainer.style.display = 'none';
  heroToolContent.appendChild(resultContainer);

  // 확인 로직
  function checkTrouble() {
    const checkedSymptoms = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.nextElementSibling.textContent.trim());

    if (checkedSymptoms.length === 0) {
      alert('최소 1개 이상의 증상을 선택해주세요.');
      return;
    }

    let checkResult = '';
    let description = '';
    let warning = '';

    // 확인 알고리즘
    const hasWhiteheads = checkedSymptoms.some(s => s.includes('고름'));
    const hasPain = checkedSymptoms.some(s => s.includes('아프'));
    const hasRoughness = checkedSymptoms.some(s => s.includes('울퉁불퉁'));
    const hasItching = checkedSymptoms.some(s => s.includes('가렵'));
    const hasRecentShaving = checkedSymptoms.some(s => s.includes('면도'));

    // 모낭염 확인
    if (hasRecentShaving && (hasItching || hasRoughness)) {
      checkResult = '🔴 모낭염';
      description = '최근 면도나 제모 후 피부가 민감해진 상태입니다.';
      warning = '⚠️ 가이드: 강한 자극은 피하시고 진정 성분(센텔라, 나이아신아마이드)이 도움됩니다.';
    }
    // 화농성 트러블 확인
    else if (hasWhiteheads && hasPain) {
      checkResult = '🟠 화농성 트러블';
      description = '붉고 아픈 화농성 트러블입니다.';
      warning = '⚠️ 가이드: 짜지 마시고 국소 진정 제품(티트리, 시카 등)을 사용하세요.';
    }
    // 좁쌀 트러블 확인
    else if (hasRoughness || hasItching) {
      checkResult = '🟡 좁쌀 트러블';
      description = '각질이 모공을 막아 생기는 오돌토돌한 트러블입니다.';
      warning = '⚠️ 가이드: 순한 각질 케어 제품(AHA/BHA)을 주 1-2회 사용하고, 보습을 충분히 해주세요.';
    }
    // 기본 확인
    else {
      checkResult = '🔵 피부 트러블';
      description = '정확한 확인을 위해 더 많은 증상을 선택해주세요.';
      warning = '';
    }

    // 결과 표시
    displayResult(checkResult, description, warning);
  }

  function displayResult(checkResult, description, warning) {
    resultContainer.innerHTML = `
      <div class="result-box">
        <h3 class="result-title">${checkResult}</h3>
        <p class="result-description">${description}</p>
        ${warning ? `<p class="result-warning">${warning}</p>` : ''}
        <button class="result-reset-btn">다시 확인하기</button>
      </div>
    `;
    resultContainer.style.display = 'block';

    // 다시 확인하기 버튼
    const resetBtn = resultContainer.querySelector('.result-reset-btn');
    resetBtn.addEventListener('click', resetCheck);

    // 부드러운 스크롤
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetCheck() {
    checkboxes.forEach(checkbox => checkbox.checked = false);
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
  }

  // 버튼 클릭 이벤트
  ctaButton.addEventListener('click', checkTrouble);
});
