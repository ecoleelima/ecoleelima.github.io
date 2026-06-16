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
// Ouverture et fermeture de la fenêtre de discussion
function toggleChat() {
    const chatWrapper = document.getElementById('chat-assistant');
    chatWrapper.classList.toggle('open');
}

// Réponses de l'assistant automatique
function askBot(topic) {
    const chatBody = document.getElementById('chat-dynamic-replies');
    let userQuestion = "";
    let botReply = "";

    // Base de données des questions / réponses
    if (topic === 'inscriptions') {
        userQuestion = "Comment s'inscrire et quelles sont les pièces ?";
        botReply = "Pour s'inscrire à l'École Privée ELIMA, veuillez fournir un acte de naissance de l'enfant, ses derniers bulletins scolaires, ainsi qu'une photo d'identité. Les dossiers se déposent au secrétariat.";
    } else if (topic === 'tarifs') {
        userQuestion = "Quels sont les frais de scolarité ?";
        botReply = "Nos tarifs varient selon les cycles (Primaire, Secondaire, Lycée). Les frais incluent le droit d'inscription annuel et l'écolage mensuel. Pour un devis précis, merci de nous laisser vos coordonnées dans notre formulaire en bas de page.";
    } else if (topic === 'uniforme') {
        userQuestion = "L'uniforme est-il obligatoire ?";
        botReply = "Oui, le port de l'uniforme réglementaire (ou de la blouse officielle de l'école) est obligatoire pour tous nos élèves, de la rentrée jusqu'à la fin de l'année scolaire.";
    } else if (topic === 'horaires') {
        userQuestion = "Quels sont les horaires des cours ?";
        botReply = "Les cours ont lieu du lundi au vendredi. Le matin de 07h30 à 12h00, et l'après-midi de 13h30 à 16h00. Il n'y a pas de cours le mercredi après-midi.";
    }

    // Affichage de la question de l'utilisateur dans la bulle
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user-msg';
    userDiv.innerText = userQuestion;
    chatBody.appendChild(userDiv);

    // Petit effet d'attente pour simuler une écriture humaine (0,4 seconde)
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot-msg';
        botDiv.innerText = botReply;
        chatBody.appendChild(botDiv);
        
        // Fait descendre automatiquement le défilement vers le bas
        const bodyZone = document.querySelector('.chat-body');
        bodyZone.scrollTop = bodyZone.scrollHeight;
    }, 400);
}
// ==========================================================================
// LOGIQUE DE PAIEMENT : CALCUL DU TARIF & REDIRECTION SECURISEE (MVOLA / ORANGE MONEY)
// ==========================================================================
function mettreAJourTarif() {
    const niveau = document.getElementById('student_class').value;
    const champPrix = document.getElementById('display_price');
    
    if (!champPrix) return;

    // Grille tarifaire officielle en Ariary
    const tarifs = {
        'maternelle': '25 000 Ariary',
        'primaire': '21 000 Ariary',
        'secondaire': '23 000 Ariary',
        'lycee': '25 000 Ariary'
    };
    
    // Met à jour la valeur instantanément à l'écran
    if (niveau && tarifs[niveau]) {
        champPrix.value = tarifs[niveau];
    } else {
        champPrix.value = "";
    }
}

// Déclenchement lors de la validation du formulaire de paiement
const formEcolage = document.getElementById('ecolageForm');
if (formEcolage) {
    formEcolage.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eleve = document.getElementById('student_name').value;
        const niveau = document.getElementById('student_class').value;
        const mois = document.getElementById('payment_month').value;
        const prix = document.getElementById('display_price').value;
        const operateur = document.querySelector('input[name="operator"]:checked').value;
        
        if (operateur === 'mvola') {
            const numeroMvolaELIMA = "0341509226";
            alert(`Paiement Mvola initié pour ${eleve} (${niveau.toUpperCase()})\nMois : ${mois} • Montant : ${prix}.\n\nNuméro marchand destinataire : ${numeroMvolaELIMA}`);
            // Redirection vers le portail officiel web de Mvola
            window.location.href = `https://mvola.mg{encodeURIComponent('Ecolage ' + mois + ' - ' + eleve)}&to=${numeroMvolaELIMA}`;
            
        } else if (operateur === 'orange') {
            const numeroOrangeELIMA = "0326249007";
            alert(`Paiement Orange Money initié pour ${eleve} (${niveau.toUpperCase()})\nMois : ${mois} • Montant : ${prix}.\n\nNuméro marchand destinataire : ${numeroOrangeELIMA}`);
            // Redirection vers l'API Orange Money Web Payment
            window.location.href = `https://orange.mg{numeroOrangeELIMA}&amount=auto&reason=${encodeURIComponent('Ecolage ' + mois + ' - ' + eleve)}`;
        }
    });
}
