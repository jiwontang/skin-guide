document.addEventListener('DOMContentLoaded', () => {
  const matchingToggleBtn = document.getElementById('matching-toggle-btn');
  const matchingFormArea = document.getElementById('matching-form-area');
  const matchingSubmitBtn = document.getElementById('matching-submit-btn');
  const matchingInput = document.getElementById('matching-ingredient-input');
  const matchingResultArea = document.getElementById('matching-result-area');

  if (matchingToggleBtn && matchingFormArea) {
    matchingFormArea.style.display = 'none'; // Initially hidden
    matchingToggleBtn.addEventListener('click', () => {
      matchingFormArea.style.display = matchingFormArea.style.display === 'none' ? 'block' : 'none';
      if (matchingResultArea) matchingResultArea.style.display = 'none';
    });
  }

  if (matchingSubmitBtn && matchingInput && matchingResultArea) {
    matchingSubmitBtn.addEventListener('click', () => {
      const ingredients = matchingInput.value.trim();
      if (!ingredients) {
        alert('성분을 입력해주세요.');
        return;
      }

      const userSkinType = localStorage.getItem('userSkinType');
      let skinTypeStr = '';
      let isGoodMatch = false;
      let resultMsg = '';

      if (!userSkinType) {
        alert('피부 타입 데이터가 없습니다. 먼저 "내 피부 타입 확인 가이드"를 진행해주세요.');
        window.location.href = 'skintype.html';
        return;
      }

      switch (userSkinType) {
        case 'dry':
          skinTypeStr = '건성';
          break;
        case 'oily':
          skinTypeStr = '지성';
          break;
        case 'combo':
          skinTypeStr = '복합성';
          break;
      }

      // Simple matching logic
      let badWords = [];
      if (userSkinType === 'dry') {
        badWords = ['에탄올', '알코올', '비누', '살리실산', 'BHA', 'bha'];
      } else if (userSkinType === 'oily') {
        badWords = ['시어버터', '미네랄오일', '비즈왁스', '오일', '코코넛', '올리브'];
      } else if (userSkinType === 'combo') {
        badWords = ['시어버터', '미네랄오일', '에탄올', '알코올']; 
      }

      const foundBadWords = badWords.filter(word => ingredients.includes(word));

      if (foundBadWords.length > 0) {
        isGoodMatch = false;
        resultMsg = `이 제품은 유명하지만, <strong>[${skinTypeStr}]</strong> 피부에는 주의가 필요한 성분(${foundBadWords.join(', ')})이 포함되어 있습니다.`;
      } else {
        isGoodMatch = true;
        resultMsg = `당신의 <strong>[${skinTypeStr}]</strong> 피부 타입과 찰떡궁합인 성분입니다!`;
      }

      const resultBoxColor = isGoodMatch ? 'rgba(50, 200, 100, 0.1)' : 'rgba(255, 134, 169, 0.1)';
      const resultBorderColor = isGoodMatch ? 'rgba(50, 200, 100, 0.3)' : 'rgba(255, 134, 169, 0.3)';
      const icon = isGoodMatch ? '💚' : '⚠️';

      matchingResultArea.innerHTML = `
        <div style="margin-top: 1.6rem; padding: 2rem; background: ${resultBoxColor}; border: 1px solid ${resultBorderColor}; border-radius: 1.2rem; animation: slideIn 0.3s ease;">
          <p style="margin:0; font-size: 1.6rem; color: #F8FAFC; line-height: 1.6;">${icon} ${resultMsg}</p>
        </div>
      `;
      matchingResultArea.style.display = 'block';
    });
  }
});
