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
