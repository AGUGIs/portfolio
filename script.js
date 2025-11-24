document.addEventListener('DOMContentLoaded', () => {
  // Мобильное меню
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }

  // Активный пункт меню
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Форма контактов
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
          document.getElementById('successMessage').classList.remove('d-none');
          this.reset();
          setTimeout(() => {
            document.getElementById('successMessage').classList.add('d-none');
          }, 5000);
        } else {
          throw new Error('Ошибка отправки');
        }
      })
      .catch(() => alert('Ошибка при отправке формы.'));
    });
  }
});
