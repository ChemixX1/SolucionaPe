/* SolucionaPe – JS principal */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── 1. HEADER SHADOW ON SCROLL ─── */
  const headerInner = document.querySelector('.container-header-mobile');
  if (headerInner) {
    window.addEventListener('scroll', function () {
      headerInner.classList.toggle('header-with-shadow', window.scrollY > 10);
    }, { passive: true });
  }

  /* ─── 2. TOP BANNER CLOSE ─── */
  const bannerClose = document.getElementById('topBannerClose');
  const banner      = document.getElementById('topBanner');
  if (bannerClose && banner) {
    bannerClose.addEventListener('click', function () { banner.remove(); });
  }

  /* ─── 3. WHATSAPP MODAL ─── */
  const wspModal      = document.getElementById('whatsappModal');
  const wspClose      = document.getElementById('whatsappModalClose');
  const wspOverlay    = document.getElementById('whatsappModalOverlay');

  function openModal()  { if (wspModal) { wspModal.classList.add('active');    document.body.classList.add('body-no-scroll'); } }
  function closeModal() { if (wspModal) { wspModal.classList.remove('active'); document.body.classList.remove('body-no-scroll'); } }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });
  if (wspClose)   wspClose.addEventListener('click', closeModal);
  if (wspOverlay) wspOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ─── 4. MOBILE MENU ─── */
  const menuBtn     = document.getElementById('menuIcon');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuClose   = document.getElementById('menuClose');

  function openMenu()  { if (menuOverlay) { menuOverlay.classList.add('active');    document.body.classList.add('body-no-scroll'); } }
  function closeMenu() { if (menuOverlay) { menuOverlay.classList.remove('active'); document.body.classList.remove('body-no-scroll'); } }

  if (menuBtn)     menuBtn.addEventListener('click', openMenu);
  if (menuClose)   menuClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', function (e) { if (e.target === menuOverlay) closeMenu(); });

  document.querySelectorAll('.menu-link[data-section]').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
      var id     = this.dataset.section;
      var target = id && document.getElementById(id);
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
    });
  });

  /* ─── 5. STEPS – DESKTOP ─── */
  var stepItems  = document.querySelectorAll('.step-li[data-step]');
  var stepImages = document.querySelectorAll('.step-image[data-step]');
  var prevBtn    = document.getElementById('prevStepDesktop');
  var nextBtn    = document.getElementById('nextStepDesktop');
  var current    = 1;
  var total      = stepItems.length;

  function goToStep(n) {
    current = Math.max(1, Math.min(total, n));
    stepItems.forEach(function (li) {
      li.classList.toggle('active', parseInt(li.dataset.step) === current);
    });
    stepImages.forEach(function (img) {
      img.classList.toggle('active', parseInt(img.dataset.step) === current);
    });
    if (prevBtn) prevBtn.style.display = current === 1      ? 'none' : '';
    if (nextBtn) nextBtn.style.display = current === total  ? 'none' : '';
  }

  if (stepItems.length) {
    stepItems.forEach(function (li) {
      li.addEventListener('click', function () { goToStep(parseInt(li.dataset.step)); });
    });
    goToStep(1);
  }
  if (prevBtn) prevBtn.addEventListener('click', function () { goToStep(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goToStep(current + 1); });

  /* ─── 6. SWIPER MOBILE ─── */
  if (document.querySelector('.swiper-mobile') && typeof Swiper !== 'undefined') {
    new Swiper('.swiper-mobile', {
      slidesPerView: 1.15,
      spaceBetween: 14,
      centeredSlides: true,
      grabCursor: true,
      navigation: {
        nextEl: '.swiper-button-next-mobile',
        prevEl: '.swiper-button-prev-mobile',
      },
      pagination: {
        el: '.swiper-pagination-mobile',
        clickable: true,
      },
      breakpoints: {
        480: { slidesPerView: 1.4 },
        640: { slidesPerView: 1.7 },
      }
    });
  }

  /* ─── 7. FAQ ACCORDION ─── */
  document.querySelectorAll('.acordeon-item').forEach(function (item) {
    var hdr = item.querySelector('.acordeon-header');
    if (!hdr) return;
    hdr.addEventListener('click', function () {
      var open = item.classList.contains('active');
      document.querySelectorAll('.acordeon-item.active').forEach(function (a) { a.classList.remove('active'); });
      if (!open) item.classList.add('active');
      hdr.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ─── 8. FOOTER ACCORDION (MOBILE) ─── */
  document.querySelectorAll('.footer-accordion-item').forEach(function (item) {
    var hdr = item.querySelector('.footer-accordion-header');
    if (!hdr) return;
    hdr.addEventListener('click', function () { item.classList.toggle('active'); });
  });

  /* ─── 9. FLOATING BUTTON – avoid footer overlap ─── */
  var floatBtn = document.querySelector('.button-solicitar-mobile-fixed');
  var footerEl = document.querySelector('.footer');
  if (floatBtn && footerEl) {
    function adjustBtn() {
      if (window.innerWidth >= 1024) { floatBtn.style.bottom = ''; return; }
      var footerTop = footerEl.getBoundingClientRect().top;
      floatBtn.style.bottom = footerTop < window.innerHeight
        ? (window.innerHeight - footerTop + 8) + 'px'
        : '16px';
    }
    window.addEventListener('scroll', adjustBtn, { passive: true });
    window.addEventListener('resize', adjustBtn, { passive: true });
    adjustBtn();
  }

  /* ─── 10. SMOOTH SCROLL for <a href="#..."> ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
