document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById("burgerMenu");
    const sideNav = document.getElementById("sideNav");
    const closeNav = document.getElementById("closeNav");
    const menuOverlay = document.getElementById("menuOverlay");

    // Fonction pour ouvrir le menu latéral
    burgerMenu.addEventListener("click", function() {
        sideNav.classList.add("open");
        menuOverlay.classList.add("show");
    });

    // Fonction pour fermer le menu latéral
    function fermerMenu() {
        sideNav.classList.remove("open");
        menuOverlay.classList.remove("show");
    }

    // Événements pour fermer le menu au clic sur la croix ou sur la zone sombre
    closeNav.addEventListener("click", fermerMenu);
    menuOverlay.addEventListener("click", fermerMenu);
});
function checkDonatorCode() {
    // 1. Définissez votre code secret ici (en MAJUSCULES ou minuscules)
    const validCode = "ECOLE2026"; 
    
    // 2. Récupération de la saisie utilisateur
    const userInput = document.getElementById("secret-code-input").value.trim();
    const contentDiv = document.getElementById("secure-content");
    const errorDiv = document.getElementById("error-message");
    const formDiv = document.getElementById("crypto-form");

    // 3. Vérification du code (insensible à la casse)
    if (userInput.toUpperCase() === validCode.toUpperCase()) {
        contentDiv.style.display = "block";  // Affiche la liste des besoins
        errorDiv.style.display = "none";     // Cache les erreurs
        formDiv.style.display = "none";      // Cache le formulaire de saisie devenu inutile
    } else {
        contentDiv.style.display = "none";   // Laisse le contenu masqué
        errorDiv.style.display = "block";    // Affiche l'alerte de contact
    }
}
