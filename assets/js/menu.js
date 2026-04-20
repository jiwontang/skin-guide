// ========================================
// 햄버거 메뉴 - 독립 모듈
// ========================================

window.addEventListener('load', () => {
  // 요소 선택
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const menuLinks = document.querySelectorAll('.menu-link');

  // 요소 존재 확인
  if (!hamburgerBtn || !menuOverlay || !menuCloseBtn) {
    console.error('햄버거 메뉴: 필수 요소를 찾을 수 없습니다.');
    return;
  }

  // 메뉴 열기
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    openMenu();
  });

  // 메뉴 닫기 버튼
  menuCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // 메뉴 링크 클릭 시 닫기
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!link.classList.contains('current')) {
        closeMenu();
      }
    });
  });

  // 오버레이 배경 클릭 시 닫기
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });

  // ========================================
  // 메뉴 제어 함수
  // ========================================
  function openMenu() {
    menuOverlay.classList.add('active');
    hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
