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