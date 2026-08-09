// Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:0.14});
  revealEls.forEach(el=>io.observe(el));

  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', ()=>{
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
  });
  document.querySelectorAll('#mobileMenu a').forEach(a=>{
    a.addEventListener('click', ()=>{ menu.style.display='none'; });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Formspree registration form (AJAX submit, no page reload)
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('regStatus');
      status.textContent = 'Envoi en cours…';
      fetch(regForm.action, {
        method: 'POST',
        body: new FormData(regForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          status.textContent = 'Merci ! Votre demande a bien été envoyée.';
          regForm.reset();
        } else {
          status.textContent = "Erreur d'envoi — merci de réessayer ou de nous contacter sur WhatsApp.";
        }
      }).catch(function () {
        status.textContent = "Erreur d'envoi — merci de réessayer ou de nous contacter sur WhatsApp.";
      });
    });
  }