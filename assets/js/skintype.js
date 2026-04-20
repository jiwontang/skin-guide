window.addEventListener('load', () => {
  const checkBtn = document.getElementById('check-skintype-btn');
  const resultArea = document.getElementById('result-area');
  const options1 = document.querySelectorAll('input[name="q1"]');
  const options2 = document.querySelectorAll('input[name="q2"]');
  const options3 = document.querySelectorAll('input[name="q3"]');

  if (!checkBtn || !resultArea) return;

  checkBtn.addEventListener('click', () => {
    let q1Value = null;
    let q2Value = null;
    let q3Value = null;

    options1.forEach(opt => { if (opt.checked) q1Value = opt.value; });
    options2.forEach(opt => { if (opt.checked) q2Value = opt.value; });
    options3.forEach(opt => { if (opt.checked) q3Value = opt.value; });

    if (!q1Value || !q2Value || !q3Value) {
      alert('모든 질문에 답해주세요!');
      return;
    }

    // 피부 타입 판별 로직
    let dryCount = 0;
    let oilyCount = 0;
    let comboCount = 0;

    [q1Value, q2Value, q3Value].forEach(val => {
      if (val === 'dry') dryCount++;
      else if (val === 'oily') oilyCount++;
      else if (val === 'combo') comboCount++;
    });

    let resultType = '';
    let resultDesc = '';
    let goodTexture = '';
    let badTexture = '';
    let coreAdvice = '';

    if (dryCount >= 2) {
      resultType = '💧 악건성 / 건성 피부';
      resultDesc = '유분과 수분이 모두 심각하게 부족하여 쉽게 당기고 푸석해지며 잔주름이 생기기 쉬운 타입입니다.';
      goodTexture = '고농축 오일 세럼, 피부 장벽을 모사하는 세라마이드 크림';
      badTexture = '알코올(에탄올) 함량이 높은 토너, 뽀득하게 닦이는 알칼리성 폼 클렌저';
      coreAdvice = '세안 직후 물기가 마르기 전 1분 이내에 즉각적인 보습을 해주는 것이 매우 중요합니다.';
      localStorage.setItem('userSkinType', 'dry');
    } else if (oilyCount >= 2) {
      resultType = '🛢️ 극지성 / 지성 피부';
      resultDesc = '피지 분비가 매우 활발하여 얼굴 전체가 쉽게 번들거리고 모공이 넓어 트러블이 잦은 타입입니다.';
      goodTexture = '산뜻한 워터리 젤 로션, 약산성 클렌저, 모공 컨트롤 BHA 토너';
      badTexture = '모공을 막을 수 있는 고점도 밤(Balm) 제형, 미네랄 오일이나 시어버터가 다량 함유된 제품';
      coreAdvice = '유분을 과도하게 닦아내면 보상성 피지가 분비되므로, 부드러운 약산성 세안과 수분 보충에 집중하세요.';
      localStorage.setItem('userSkinType', 'oily');
    } else {
      resultType = '🌗 수부지 / 복합성 피부';
      resultDesc = 'T존은 번들거리지만 U존은 건조한, 수분은 부족하고 유분은 부분적으로 넘치는 복합성 타입입니다.';
      goodTexture = '수분감 가득한 앰플, T존과 U존을 나눠 바르기 좋은 가벼운 수분 크림';
      badTexture = '얼굴 전체에 바르는 꾸덕한 영양 크림, 유분기가 과도한 선크림';
      coreAdvice = '얼굴의 부위별로 유수분 상태가 다르므로, 건조한 U존에는 크림을 한 겹 더 덧바르는 스킵케어(Skip-care)가 효과적입니다.';
      localStorage.setItem('userSkinType', 'combo');
    }

    resultArea.innerHTML = `
      <div class="result-box result-safe" style="border: 0.15rem solid rgba(96, 165, 250, 0.3);">
        <h3 class="result-title" style="color: #F8FAFC; margin-bottom: 0.8rem; font-size: 2.2rem;">${resultType}</h3>
        <p class="result-description" style="color: #E2E8F0; margin-bottom: 2.4rem;">${resultDesc}</p>
        
        <div class="result-ingredients" style="margin-bottom: 1.5rem; background: rgba(15, 23, 42, 0.4); padding: 2rem;">
          <p class="result-ingredients-title" style="color: #60A5FA; font-size: 1.6rem; margin-bottom: 0.8rem;">👍 추천 제형</p>
          <p class="result-ingredients-text" style="color: #E2E8F0; margin-bottom: 2rem;">${goodTexture}</p>
          
          <p class="result-ingredients-title" style="color: #F87171; font-size: 1.6rem; margin-bottom: 0.8rem;">⛔ 피해야 할 성분/제형</p>
          <p class="result-ingredients-text" style="color: #E2E8F0; margin-bottom: 2rem;">${badTexture}</p>
          
          <p class="result-ingredients-title" style="color: #4ADE80; font-size: 1.6rem; margin-bottom: 0.8rem;">💡 핵심 조언</p>
          <p class="result-ingredients-text" style="color: #E2E8F0; margin-bottom: 0;">${coreAdvice}</p>
        </div>
        
        <div class="result-tip" style="margin-top: 2.4rem; font-size: 1.3rem; opacity: 0.8; color: #E2E8F0; text-align: center;">
          ※ 본 결과는 피부과 진단이 아니며, 화장품 선택을 위한 참고 가이드입니다.
        </div>
      </div>
    `;

    resultArea.classList.remove('hidden');
    resultArea.style.display = 'block';

    // 부드럽게 결과 스크롤
    setTimeout(() => {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });
});
