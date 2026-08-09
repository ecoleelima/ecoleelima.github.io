/* ELIMA — i18n.js
   Traduction des zones principales du site (navigation, en-têtes de section, boutons).
   Le contenu détaillé (listes de fournitures, tarifs, programmes) reste en français,
   qui est la langue administrative de référence de l'école. */
(function () {
  const DICT = {
    fr: {
      "nav.about": "À propos", "nav.direction": "Direction", "nav.campus": "Établissement",
      "nav.programs": "Programmes", "nav.fees": "Fournitures", "nav.exams": "Examens",
      "nav.life": "Vie scolaire", "nav.party": "Fête de l'école", "nav.admission": "Admission",
      "nav.donate2": "Faire un don", "nav.contact": "Contact", "nav.parent": "Espace Parent",
      "nav.donate": "Faire un don",
      "hero.eyebrow": "Dzamandzar · Nosy Be · Hell-Ville",
      "hero.h1": "Une éducation ancrée dans <em>l'île</em>, tournée vers l'<em>avenir</em>.",
      "hero.lead": "L'École Privée ELIMA accompagne les enfants de Dzamandzar et de Nosy Be avec exigence et bienveillance, du savoir fondamental jusqu'à la construction de leur avenir.",
      "hero.cta1": "Inscrire mon enfant", "hero.cta2": "Soutenir l'école",
      "about.eyebrow": "Notre mission", "about.h2": "Éduquer, encourager, exceller.",
      "campus.eyebrow": "Notre établissement", "campus.h2": "À l'intérieur de l'école",
      "programs.eyebrow": "Cursus", "programs.h2": "Un parcours complet, du premier jour de classe à l'entrée au collège.",
      "fees.eyebrow": "Pour les parents", "fees.h2": "Fournitures scolaires et écolage par classe",
      "exams.eyebrow": "Ressources pédagogiques", "exams.h2": "Sujets d'examen",
      "party.eyebrow": "Moments forts", "party.h2": "La fête de l'école",
      "admission.eyebrow": "Admission", "admission.h2": "Inscrire son enfant à ELIMA, étape par étape.",
      "donate.eyebrow": "Soutenir ELIMA", "donate.h2": "Chaque don aide un enfant de Dzamandzar à rester à l'école.",
      "contact.eyebrow": "Contact", "contact.h2": "Nous trouver et nous joindre"
    },
    mg: {
      "nav.about": "Momba anay", "nav.direction": "Ny Talen'ny Sekoly", "nav.campus": "Ny Sekoly",
      "nav.programs": "Fandaharam-pianarana", "nav.fees": "Fitaovana", "nav.exams": "Fanadinana",
      "nav.life": "Fiainan'ny sekoly", "nav.party": "Fetin'ny sekoly", "nav.admission": "Fisoratana anarana",
      "nav.donate2": "Manome fanomezana", "nav.contact": "Fifandraisana", "nav.parent": "Toeran'ny Ray aman-dReny",
      "nav.donate": "Manome fanomezana",
      "hero.eyebrow": "Dzamandzar · Nosy Be · Hell-Ville",
      "hero.h1": "Fanabeazana miorina eto amin'ny <em>nosy</em>, mitodika ho amin'ny <em>hoavy</em>.",
      "hero.lead": "Ny École Privée ELIMA dia manampy ny ankizy any Dzamandzar sy Nosy Be amin'ny fitakiana sy ny fitiavana, manomboka amin'ny fahalalana fototra ka hatramin'ny fananganana ny hoaviny.",
      "hero.cta1": "Soratra anarana ny zanako", "hero.cta2": "Manohana ny sekoly",
      "about.eyebrow": "Ny tanjonay", "about.h2": "Manabe, mankahery, mahomby.",
      "campus.eyebrow": "Ny sekolinay", "campus.h2": "Ao anatin'ny sekoly",
      "programs.eyebrow": "Fandaharana", "programs.h2": "Dingana feno, manomboka amin'ny andro voalohany ka hatramin'ny fidirana amin'ny kolejy.",
      "fees.eyebrow": "Ho an'ny ray aman-dreny", "fees.h2": "Fitaovana sekoly sy sara isaky ny kilasy",
      "exams.eyebrow": "Fitaovam-pampianarana", "exams.h2": "Fanontaniana fanadinana",
      "party.eyebrow": "Fotoana lehibe", "party.h2": "Ny fetin'ny sekoly",
      "admission.eyebrow": "Fisoratana anarana", "admission.h2": "Fomba fisoratana anaran'ny zanakao ao amin'ny ELIMA.",
      "donate.eyebrow": "Manohana ny ELIMA", "donate.h2": "Ny fanomezana rehetra dia manampy zaza any Dzamandzar hijanona ho mpianatra.",
      "contact.eyebrow": "Fifandraisana", "contact.h2": "Ahoana no ahitana anay"
    },
    en: {
      "nav.about": "About", "nav.direction": "Director", "nav.campus": "Our School",
      "nav.programs": "Programs", "nav.fees": "Supplies", "nav.exams": "Exams",
      "nav.life": "School Life", "nav.party": "School Party", "nav.admission": "Admissions",
      "nav.donate2": "Donate", "nav.contact": "Contact", "nav.parent": "Parent Area",
      "nav.donate": "Donate",
      "hero.eyebrow": "Dzamandzar · Nosy Be · Hell-Ville",
      "hero.h1": "An education rooted in the <em>island</em>, built for the <em>future</em>.",
      "hero.lead": "École Privée ELIMA supports children in Dzamandzar and Nosy Be with rigor and care, from foundational learning to building their future.",
      "hero.cta1": "Enroll my child", "hero.cta2": "Support the school",
      "about.eyebrow": "Our mission", "about.h2": "Educate, encourage, excel.",
      "campus.eyebrow": "Our school", "campus.h2": "Inside the school",
      "programs.eyebrow": "Curriculum", "programs.h2": "A full learning path, from the first day of class to secondary school.",
      "fees.eyebrow": "For parents", "fees.h2": "School supplies and tuition by class",
      "exams.eyebrow": "Learning resources", "exams.h2": "Past exam papers",
      "party.eyebrow": "Highlights", "party.h2": "The school party",
      "admission.eyebrow": "Admissions", "admission.h2": "Enrolling your child at ELIMA, step by step.",
      "donate.eyebrow": "Support ELIMA", "donate.h2": "Every donation helps a child in Dzamandzar stay in school.",
      "contact.eyebrow": "Contact", "contact.h2": "Find and reach us"
    },
    it: {
      "nav.about": "Chi siamo", "nav.direction": "Il Direttore", "nav.campus": "La Scuola",
      "nav.programs": "Programmi", "nav.fees": "Materiale", "nav.exams": "Esami",
      "nav.life": "Vita scolastica", "nav.party": "Festa della scuola", "nav.admission": "Iscrizioni",
      "nav.donate2": "Fai una donazione", "nav.contact": "Contatti", "nav.parent": "Area Genitori",
      "nav.donate": "Fai una donazione",
      "hero.eyebrow": "Dzamandzar · Nosy Be · Hell-Ville",
      "hero.h1": "Un'educazione radicata nell'<em>isola</em>, rivolta al <em>futuro</em>.",
      "hero.lead": "La Scuola Privata ELIMA accompagna i bambini di Dzamandzar e Nosy Be con rigore e cura, dalle basi dell'apprendimento fino alla costruzione del loro futuro.",
      "hero.cta1": "Iscrivi mio figlio", "hero.cta2": "Sostieni la scuola",
      "about.eyebrow": "La nostra missione", "about.h2": "Educare, incoraggiare, eccellere.",
      "campus.eyebrow": "La nostra scuola", "campus.h2": "All'interno della scuola",
      "programs.eyebrow": "Curriculum", "programs.h2": "Un percorso completo, dal primo giorno di scuola fino alle medie.",
      "fees.eyebrow": "Per i genitori", "fees.h2": "Materiale scolastico e rette per classe",
      "exams.eyebrow": "Risorse didattiche", "exams.h2": "Tracce d'esame",
      "party.eyebrow": "Momenti salienti", "party.h2": "La festa della scuola",
      "admission.eyebrow": "Iscrizioni", "admission.h2": "Iscrivere tuo figlio a ELIMA, passo dopo passo.",
      "donate.eyebrow": "Sostieni ELIMA", "donate.h2": "Ogni donazione aiuta un bambino di Dzamandzar a restare a scuola.",
      "contact.eyebrow": "Contatti", "contact.h2": "Come trovarci e contattarci"
    }
  };

  window.ELIMA_I18N = DICT;

  function applyLang(lang) {
    const dict = DICT[lang] || DICT.fr;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('elima-lang', lang);
    const sel = document.getElementById('langSwitch');
    if (sel) sel.value = lang;
    document.dispatchEvent(new CustomEvent('elima:langchange', { detail: { lang: lang } }));
  }
  window.ELIMA_applyLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    const saved = localStorage.getItem('elima-lang') || 'fr';
    applyLang(saved);
    const sel = document.getElementById('langSwitch');
    if (sel) {
      sel.addEventListener('change', function () { applyLang(sel.value); });
    }
  });
})();
