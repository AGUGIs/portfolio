document.addEventListener('DOMContentLoaded', () => {
  // Мобильное меню
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Активация пункта меню
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Простые модалки
  function openModal(id) {
    document.getElementById(id).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.querySelectorAll('.modal').forEach(m => {
      m.style.display = 'none';
    });
    document.body.style.overflow = '';
  }

  const tetrisCard = document.getElementById('tetrisCard');
  const chikChirikCard = document.getElementById('chikChirikCard');
  if (tetrisCard) tetrisCard.addEventListener('click', () => openModal('modalTetris'));
  if (chikChirikCard) chikChirikCard.addEventListener('click', () => openModal('modalChikChirik'));

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModal();
  });

  // Форма
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          document.getElementById('successMessage').classList.remove('hidden');
          this.reset();
          setTimeout(() => document.getElementById('successMessage').classList.add('hidden'), 5000);
        } else {
          throw new Error('Ошибка отправки');
        }
      })
      .catch(() => alert('Ошибка при отправке формы.'));
    });
  }
});
