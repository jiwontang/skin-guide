window.addEventListener('load', () => {
  const checkBtn = document.getElementById('check-homecare-btn');
  const resultArea = document.getElementById('result-area');
  const checkboxes = document.querySelectorAll('input[name="habit"]');

  if (!checkBtn || !resultArea) return;

  checkBtn.addEventListener('click', () => {
    let checkedCount = 0;
    let checkedValues = [];

    checkboxes.forEach(box => {
      if (box.checked) {
        checkedCount++;
        checkedValues.push(box.value);
      }
    });

    let resultTitle = '';
    let resultColor = '';
    let resultDesc = '';

    if (checkedCount <= 1) {
      resultTitle = '🌟 아주 훌륭한 0원 홈케어 마스터';
      resultColor = '#4ADE80'; // Green
      resultDesc = '기본기가 아주 탄탄합니다! 비싼 화장품의 효과를 100% 흡수할 수 있는 건강한 피부 바탕을 가지고 계시네요.';
    } else if (checkedCount <= 3) {
      resultTitle = '⚠️ 돈 새어나가는 피부 장벽 주의보';
      resultColor = '#FBBF24'; // Yellow
      resultDesc = '조금만 주의하면 훨씬 좋아질 수 있습니다. 무의식적인 습관들이 피부 장벽을 조금씩 갉아먹고 있으니, 오늘부터 꼭 교정해 보세요.';
    } else {
      resultTitle = '🚨 비싼 화장품 발라도 소용없는 습관 경고';
      resultColor = '#F87171'; // Red
      resultDesc = '지금 당장 습관을 멈춰야 합니다! 아무리 좋은 화장품을 발라도 밑빠진 독에 물 붓기입니다. 기초부터 다시 바로잡아야 합니다.';
    }

    let guides = [];
    if (checkedValues.includes('shower')) {
      guides.push('<strong>🚿 뜨거운 샤워기 세안 금지:</strong> 뜨거운 물과 강한 수압은 얼굴의 천연 보습막을 싹 씻어내어 극심한 속건조와 홍조를 유발합니다. 세면대에 미지근한 물을 받아 손으로 부드럽게 세안하세요.');
    }
    if (checkedValues.includes('touch')) {
      guides.push('<strong>🖐️ 얼굴에 손대지 않기:</strong> 우리 손에는 변기보다 많은 세균이 있습니다. 턱을 괴거나 무의식적으로 트러블을 만지는 습관은 염증을 덧나게 하는 1등 공신입니다.');
    }
    if (checkedValues.includes('towel')) {
      guides.push('<strong>🛏️ 침구 및 수건 관리:</strong> 자는 동안 흘린 땀과 피지가 묻은 베개 커버는 피부 트러블균의 온상입니다. 일주일에 최소 1~2회 교체하고, 세안 후엔 깨끗한 일회용 타월이나 전용 수건을 사용하세요.');
    }
    if (checkedValues.includes('overcare')) {
      guides.push('<strong>🧴 화장품 다이어트:</strong> 여러 단계를 겹쳐 바른다고 다 흡수되지 않습니다. 오히려 모공을 막고 성분끼리 충돌해 피부를 민감하게 만들 수 있습니다. [수분 앰플 + 보습 크림] 등 내 피부에 꼭 필요한 2~3단계로 줄이세요.');
    }
    if (checkedValues.includes('suncream')) {
      guides.push('<strong>🧼 꼼꼼한 선크림 클렌징:</strong> 선크림은 일반 폼클렌징만으로는 완벽히 지워지지 않는 경우가 많습니다. 잔여물이 남아 모공을 막지 않도록, 클렌징 워터나 오일/밀크로 1차 세안을 한 후 폼클렌징으로 2차 세안을 하세요.');
    }

    let guideHtml = '';
    if (guides.length > 0) {
      guideHtml = `
        <div class="result-ingredients" style="margin-top: 1.5rem; background: rgba(15, 23, 42, 0.4); padding: 2.4rem;">
          <p class="result-ingredients-title" style="color: #60A5FA; font-size: 1.8rem; margin-bottom: 1.6rem;">🛠️ 맞춤형 습관 교정 가이드</p>
          <ul style="color: #E2E8F0; font-size: 1.5rem; line-height: 1.8; padding-left: 2rem; list-style-type: decimal;">
            ${guides.map(g => `<li style="margin-bottom: 1.6rem;">${g}</li>`).join('')}
          </ul>
        </div>
      `;
    } else {
      guideHtml = `
        <div class="result-ingredients" style="margin-top: 1.5rem; background: rgba(15, 23, 42, 0.4); padding: 2.4rem; text-align: center;">
          <p class="result-ingredients-title" style="color: #4ADE80; font-size: 1.8rem; margin-bottom: 0;">✨ 완벽합니다! 지금의 훌륭한 습관을 계속 유지해 주세요.</p>
        </div>
      `;
    }

    resultArea.innerHTML = `
      <div class="result-box result-safe" style="border: 0.15rem solid rgba(96, 165, 250, 0.3);">
        <h3 class="result-title" style="color: ${resultColor}; margin-bottom: 0.8rem; font-size: 2.2rem;">${resultTitle}</h3>
        <p class="result-description" style="color: #E2E8F0; margin-bottom: 2.4rem;">${resultDesc}</p>
        
        ${guideHtml}
      </div>
    `;

    resultArea.classList.remove('hidden');
    resultArea.style.display = 'block';

    setTimeout(() => {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });
});
