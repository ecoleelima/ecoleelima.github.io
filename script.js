// Gestion du menu de navigation pour les téléphones
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Ouvrir/Fermer le menu
        nav.classList.toggle('nav-active');

        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation de l'icône burger
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Simulation d'envoi du formulaire de contact
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci ! Votre demande d\'inscription ou message a bien été envoyé à l\'École Privée ELIMA. Nous vous recontacterons rapidement.');
    e.target.reset();
});
// Gestion du Diaporama Automatique et Manuel
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    if (slides.length > 0) {
        slides[slideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    slideIndex += direction;
    showSlide(slideIndex);
}

// Défilement automatique toutes les 4 secondes
setInterval(() => {
    changeSlide(1);
}, 4000);