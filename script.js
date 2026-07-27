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



    const validCode = "ECOLE2026"; 
const prices = {
    porte: { euro: 140, ariary: 700000 },
    ordi: { euro: 200, ariary: 1000000 },
    ciment: { euro: 8, ariary: 40000 },
    table: { euro: 50, ariary: 250000 },
    peinture: { euro: 40, ariary: 180000 },
    cartable: { euro: 20, ariary: 100000 },
    ecolage: { euro: 10, ariary: 25000 }
};

function checkDonatorCode() {
    const userInput = document.getElementById("secret-code-input").value.trim();
    const contentDiv = document.getElementById("secure-content");
    const errorDiv = document.getElementById("error-message");
    const formDiv = document.getElementById("crypto-form");

    if (userInput.toUpperCase() === validCode.toUpperCase()) {
        contentDiv.style.setProperty('display', 'block', 'important');  
        errorDiv.style.display = "none";     
        formDiv.style.display = "none";      
    } else {
        contentDiv.style.display = "none";   
        errorDiv.style.display = "block";    
    }
}

function calculateTotal() {
    let totalEuro = 0;
    let totalAriary = 0;
    let anyChecked = false;

    const items = ['porte', 'ordi', 'ciment', 'table', 'peinture', 'cartable', 'ecolage'];
    
    items.forEach(item => {
        const checkbox = document.getElementById(`item-${item}`);
        if (checkbox && checkbox.checked) {
            const qtyInput = document.getElementById(`qty-${item}`);
            let qty = parseInt(qtyInput.value) || 1;
            totalEuro += prices[item].euro * qty;
            totalAriary += prices[item].ariary * qty;
            anyChecked = true;
        }
    });

    if (document.getElementById('item-voyage').checked || document.getElementById('item-eleves').checked) {
        anyChecked = true;
    }

    const summaryBar = document.getElementById('summary-bar');
    if (summaryBar) {
        if (anyChecked) {
            summaryBar.style.setProperty('display', 'flex', 'important');
        } else {
            summaryBar.style.setProperty('display', 'none', 'important');
        }
    }

    document.getElementById('total-euro').innerText = totalEuro.toLocaleString() + " €";
    document.getElementById('total-ariary').innerText = totalAriary.toLocaleString() + " Ariary";
}

function sendDonationToWhatsApp() {
    // ⚠️ METTEZ VOTRE VRAI NUMÉRO ICI SANS LE LE SIGNE "+"
    const monNumeroWhatsApp = "261326249007"; 
    
    let message = "🌟 *NOUVELLE PROMESSE DE DON - ÉCOLE ELIMA* 🌟\n\n";
    message += "Bonjour, je souhaite soutenir l'établissement pour les éléments suivants :\n\n";

    let totalEuro = 0;
    let totalAriary = 0;

    if (document.getElementById('item-porte').checked) {
        let qty = document.getElementById('qty-porte').value;
        let euro = prices.porte.euro * qty; let ariary = prices.porte.ariary * qty;
        message += `▪️ *Porte métallique* : ${qty} pièce(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-ordi').checked) {
        let qty = document.getElementById('qty-ordi').value;
        let euro = prices.ordi.euro * qty; let ariary = prices.ordi.ariary * qty;
        message += `▪️ *Ordinateur Administration* : ${qty} unité(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-ciment').checked) {
        let qty = document.getElementById('qty-ciment').value;
        let euro = prices.ciment.euro * qty; let ariary = prices.ciment.ariary * qty;
        message += `▪️ *Sacs de Ciment* : ${qty} sac(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-table').checked) {
        let qty = document.getElementById('qty-table').value;
        let euro = prices.table.euro * qty; let ariary = prices.table.ariary * qty;
        message += `▪️ *Table banc* : ${qty} unité(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-peinture').checked) {
        let qty = document.getElementById('qty-peinture').value;
        let euro = prices.peinture.euro * qty; let ariary = prices.peinture.ariary * qty;
        message += `▪️ *Peinture* : ${qty} pot(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-cartable').checked) {
        let qty = document.getElementById('qty-cartable').value;
        let euro = prices.cartable.euro * qty; let ariary = prices.cartable.ariary * qty;
        message += `▪️ *Cartable(s) élève* : ${qty} unité(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-ecolage').checked) {
        let qty = document.getElementById('qty-ecolage').value;
        let euro = prices.ecolage.euro * qty; let ariary = prices.ecolage.ariary * qty;
        message += `▪️ *Prise en charge Écolage* : ${qty} mois/élève(s) (${euro}€ / ${ariary.toLocaleString()} Ar)\n`;
        totalEuro += euro; totalAriary += ariary;
    }
    if (document.getElementById('item-voyage').checked) {
        message += `▪️ *Voyage Scolaire* : Souhaite devenir Mpanohana (Soutien)\n`;
    }
    if (document.getElementById('item-eleves').checked) {
        message += `▪️ *Soutien général des Élèves* : Aide situation précaire\n`;
    }

    message += `\n💰 *TOTAL ESTIMÉ* : ${totalEuro} € / ${totalAriary.toLocaleString()} Ariary\n\n`;
    message += "Veuillez me recontacter pour finaliser les modalités de l'aide. Merci !";

    window.open(`https://wa.me/${monNumeroWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inscriptionForm");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const data = new FormData(form);

            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                const notification = document.getElementById("notification");
                notification.classList.add("show");

                setTimeout(() => {
                    notification.classList.remove("show");
                }, 4000);

                form.reset();
            } else {
                alert("Une erreur est survenue lors de l'envoi.");
            }
        });
    }
});
