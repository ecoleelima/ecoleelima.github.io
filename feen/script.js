/* =========================================================
   FEEN — script.js
   Menu mobile, liens WhatsApp dynamiques, formulaire membre/
   partenaire (sans backend -> envoi via WhatsApp/e-mail),
   année automatique, révélations douces au scroll.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Config ---------- */
  const WHATSAPP_NUMBER = "261326249007"; // format international sans "+"

  /* ---------- Année automatique dans le footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("mainNav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.classList.toggle("is-active", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Génération des liens WhatsApp ---------- */
  function buildWhatsappLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  const defaultMessage =
    "Bonjour FEEN, je vous contacte depuis votre site internet.";
  const donMessage =
    "Bonjour, je souhaite faire un don à la FEEN. Pouvez-vous m'indiquer la marche à suivre ?";

  const whatsappTargets = [
    { id: "whatsappFloat", message: defaultMessage },
    { id: "donWhatsapp", message: donMessage },
    { id: "contactWhatsapp", message: defaultMessage },
    { id: "ctaWhatsappBottom", message: defaultMessage },
  ];

  whatsappTargets.forEach(({ id, message }) => {
    const el = document.getElementById(id);
    if (el) el.href = buildWhatsappLink(message);
  });

  /* ---------- Formulaire membre / partenaire ---------- */
  const form = document.getElementById("membershipForm");
  const statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(form).entries());

      // Validation simple des champs obligatoires
      const required = ["fullName", "country", "email", "engagementType", "message"];
      const missing = required.filter((key) => !data[key] || !data[key].trim());

      if (missing.length > 0) {
        statusEl.style.color = "#c0392b";
        statusEl.textContent =
          "Merci de compléter tous les champs obligatoires (*) avant d'envoyer votre demande.";
        return;
      }

      // Construction du message récapitulatif pour la fondation
      const lines = [
        "Nouvelle demande d'adhésion / partenariat FEEN",
        `Nom : ${data.fullName}`,
        `Pays : ${data.country}`,
        `E-mail : ${data.email}`,
        data.phone ? `Téléphone : ${data.phone}` : null,
        `Type d'engagement : ${data.engagementType}`,
        data.orgName ? `Organisation : ${data.orgName}` : null,
        `Message : ${data.message}`,
      ].filter(Boolean);

      const summary = lines.join("\n");
      const waLink = buildWhatsappLink(summary);

      // Ouvre WhatsApp avec le message prérempli (aucun backend requis)
      window.open(waLink, "_blank", "noopener");

      statusEl.style.color = "#2E7D32";
      statusEl.textContent =
        "Merci ! Votre message s'ouvre dans WhatsApp — il ne vous reste qu'à l'envoyer pour que la fondation le reçoive.";
      form.reset();
    });
  }

  /* ---------- Révélations douces au scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".pillar, .program-card, .don-card, .elima-inner, .president-inner, .membership-form"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("reveal-visible"));
  }
});
