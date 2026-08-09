/* ELIMA — portal.js
   Espace Parent (connexion / inscription + recherche d'un élève) et Espace Administrateur
   (protégé par code) permettant de saisir manuellement les informations affichées aux parents.

   IMPORTANT — LIMITE TECHNIQUE :
   Ce site est un site statique (HTML/CSS/JS), sans serveur ni base de données.
   Toutes les données saisies ici (élèves, notes, comptes parents) sont stockées dans le
   navigateur (localStorage) de l'appareil utilisé — elles ne sont PAS synchronisées entre
   appareils. Un administrateur qui ajoute un élève sur son téléphone ne sera visible que sur
   CE téléphone / navigateur, pas depuis un autre parent ailleurs. De même, le code administrateur
   est vérifié uniquement côté navigateur : ce n'est pas une sécurité réelle (un visiteur
   technique peut le contourner en lisant le code source). Pour une vraie mise en production
   multi-utilisateurs et sécurisée, une base de données et un serveur (backend) sont nécessaires.
   Cette implémentation sert de démonstration fonctionnelle de l'interface. */
(function () {
  const ADMIN_CODE = 'ECOLE2026';
  const STUDENTS_KEY = 'elima_students';
  const PARENTS_KEY = 'elima_parents';
  const MONTHS = [
    ['sep', 'Sept.'], ['oct', 'Oct.'], ['nov', 'Nov.'], ['dec', 'Déc.'],
    ['jan', 'Janv.'], ['fev', 'Févr.'], ['mar', 'Mars'], ['avr', 'Avr.'],
    ['mai', 'Mai'], ['juin', 'Juin']
  ];
  const CLASSES = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];

  function getStudents() {
    try { return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || []; } catch (e) { return []; }
  }
  function saveStudents(list) { localStorage.setItem(STUDENTS_KEY, JSON.stringify(list)); }
  function getParents() {
    try { return JSON.parse(localStorage.getItem(PARENTS_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveParents(p) { localStorage.setItem(PARENTS_KEY, JSON.stringify(p)); }

  function esc(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

  /* ---------- Modal shell ---------- */
  function ensureModalRoot() {
    let root = document.getElementById('elimaModalRoot');
    if (root) return root;
    root = document.createElement('div');
    root.id = 'elimaModalRoot';
    document.body.appendChild(root);
    return root;
  }
  function closeModal() {
    const root = document.getElementById('elimaModalRoot');
    if (root) root.innerHTML = '';
  }

  /* ---------- PARENT PORTAL ---------- */
  function openParentPortal() {
    const root = ensureModalRoot();
    const parentEmail = sessionStorage.getItem('elima_parent_session');
    root.innerHTML =
      '<div class="elima-modal-backdrop" id="pmBackdrop">' +
        '<div class="elima-modal">' +
          '<button class="elima-modal-close" id="pmClose" aria-label="Fermer">&times;</button>' +
          '<div class="portal-warning">Démo : les comptes et données saisis restent uniquement sur cet appareil (voir note en bas de page).</div>' +
          (parentEmail ? renderParentSearch(parentEmail) : renderParentAuth()) +
        '</div>' +
      '</div>';

    document.getElementById('pmClose').addEventListener('click', closeModal);
    document.getElementById('pmBackdrop').addEventListener('click', function (e) {
      if (e.target.id === 'pmBackdrop') closeModal();
    });

    if (parentEmail) {
      wireParentSearch();
    } else {
      wireParentAuth();
    }
  }

  function renderParentAuth() {
    return (
      '<div class="portal-tabs">' +
        '<button class="portal-tab active" data-tab="login">Connexion</button>' +
        '<button class="portal-tab" data-tab="register">Inscription</button>' +
      '</div>' +
      '<div id="tabLogin" class="portal-pane">' +
        '<h3>Connexion parent</h3>' +
        '<form id="loginForm" class="portal-form">' +
          '<label>Email<input type="email" id="loginEmail" required></label>' +
          '<label>Mot de passe<input type="password" id="loginPass" required></label>' +
          '<div class="portal-error" id="loginError"></div>' +
          '<button type="submit" class="btn btn-navy" style="width:100%;justify-content:center;">Se connecter</button>' +
        '</form>' +
      '</div>' +
      '<div id="tabRegister" class="portal-pane" hidden>' +
        '<h3>Créer un compte parent</h3>' +
        '<form id="registerForm" class="portal-form">' +
          '<label>Nom complet<input type="text" id="regName" required></label>' +
          '<label>Email<input type="email" id="regEmail" required></label>' +
          '<label>Mot de passe<input type="password" id="regPass" required minlength="4"></label>' +
          '<div class="portal-error" id="registerError"></div>' +
          '<button type="submit" class="btn btn-navy" style="width:100%;justify-content:center;">Créer mon compte</button>' +
        '</form>' +
      '</div>'
    );
  }

  function wireParentAuth() {
    document.querySelectorAll('.portal-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.portal-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById('tabLogin').hidden = tab.dataset.tab !== 'login';
        document.getElementById('tabRegister').hidden = tab.dataset.tab !== 'register';
      });
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const pass = document.getElementById('loginPass').value;
      const parents = getParents();
      const err = document.getElementById('loginError');
      if (parents[email] && parents[email].pass === pass) {
        sessionStorage.setItem('elima_parent_session', email);
        openParentPortal();
      } else {
        err.textContent = "Email ou mot de passe incorrect (ou compte créé sur un autre appareil).";
      }
    });

    document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const pass = document.getElementById('regPass').value;
      const err = document.getElementById('registerError');
      const parents = getParents();
      if (parents[email]) { err.textContent = "Un compte existe déjà avec cet email sur cet appareil."; return; }
      parents[email] = { name: name, pass: pass };
      saveParents(parents);
      sessionStorage.setItem('elima_parent_session', email);
      openParentPortal();
    });
  }

  function renderParentSearch(email) {
    const parents = getParents();
    const name = (parents[email] && parents[email].name) || email;
    return (
      '<div class="portal-head-row"><h3>Bonjour, ' + esc(name) + '</h3>' +
      '<button class="portal-link" id="pmLogout" type="button">Se déconnecter</button></div>' +
      '<p class="portal-hint">Tapez le nom complet de votre enfant pour voir ses notes, absences et écolage.</p>' +
      '<form id="searchForm" class="portal-search"><input type="text" id="searchInput" placeholder="Nom complet de l\'élève…"><button type="submit" class="btn btn-gold">Rechercher</button></form>' +
      '<div id="searchResults"></div>'
    );
  }

  function wireParentSearch() {
    document.getElementById('pmLogout').addEventListener('click', function () {
      sessionStorage.removeItem('elima_parent_session');
      openParentPortal();
    });
    document.getElementById('searchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const results = document.getElementById('searchResults');
      if (!q) { results.innerHTML = ''; return; }
      const students = getStudents();
      const found = students.filter(function (s) { return s.fullName.toLowerCase().indexOf(q) !== -1; });
      if (!found.length) {
        results.innerHTML = '<div class="portal-empty">Aucun élève trouvé sous ce nom sur cet appareil. Si l\'administration a saisi les données sur un autre appareil, elles n\'apparaîtront pas ici (voir la note en haut).</div>';
        return;
      }
      results.innerHTML = found.map(renderStudentCard).join('');
    });
  }

  function renderStudentCard(s) {
    const subjRows = (s.subjects || []).map(function (subj) {
      const avg = ((parseFloat(subj.interro1 || 0) + parseFloat(subj.interro2 || 0) + parseFloat(subj.exam || 0)) / 3).toFixed(1);
      return '<tr><td>' + esc(subj.name) + '</td><td>' + esc(subj.interro1 || '—') + '</td><td>' + esc(subj.interro2 || '—') + '</td><td>' + esc(subj.exam || '—') + '</td><td><b>' + avg + '</b></td></tr>';
    }).join('');
    const tuitionCells = MONTHS.map(function (m) {
      const paid = s.tuition && s.tuition[m[0]];
      return '<span class="tuition-pill ' + (paid ? 'paid' : 'unpaid') + '">' + m[1] + '</span>';
    }).join('');
    return (
      '<div class="student-card">' +
        '<div class="student-head"><strong>' + esc(s.fullName) + '</strong><span>' + esc(s.className) + '</span></div>' +
        (subjRows ? '<table class="student-table"><thead><tr><th>Matière</th><th>Interro 1</th><th>Interro 2</th><th>Examen</th><th>Moy.</th></tr></thead><tbody>' + subjRows + '</tbody></table>' : '<p class="portal-hint">Aucune note saisie pour le moment.</p>') +
        '<div class="student-meta"><span>Absences : <b>' + (s.absences || 0) + '</b></span></div>' +
        '<div class="tuition-row">' + tuitionCells + '</div>' +
      '</div>'
    );
  }

  /* ---------- ADMIN PORTAL ---------- */
  function openAdminPortal() {
    const root = ensureModalRoot();
    const ok = sessionStorage.getItem('elima_admin_session') === '1';
    root.innerHTML =
      '<div class="elima-modal-backdrop" id="amBackdrop">' +
        '<div class="elima-modal elima-modal-wide">' +
          '<button class="elima-modal-close" id="amClose" aria-label="Fermer">&times;</button>' +
          '<div class="portal-warning">Démo : le code n\'est vérifié que dans ce navigateur — ce n\'est pas une sécurité de niveau production.</div>' +
          (ok ? renderAdminPanel() : renderAdminGate()) +
        '</div>' +
      '</div>';
    document.getElementById('amClose').addEventListener('click', closeModal);
    document.getElementById('amBackdrop').addEventListener('click', function (e) {
      if (e.target.id === 'amBackdrop') closeModal();
    });
    if (ok) wireAdminPanel(); else wireAdminGate();
  }

  function renderAdminGate() {
    return (
      '<h3>Espace Administrateur</h3>' +
      '<form id="adminGateForm" class="portal-form">' +
        '<label>Code administrateur<input type="password" id="adminCode" required></label>' +
        '<div class="portal-error" id="adminGateError"></div>' +
        '<button type="submit" class="btn btn-navy" style="width:100%;justify-content:center;">Accéder</button>' +
      '</form>'
    );
  }
  function wireAdminGate() {
    document.getElementById('adminGateForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const code = document.getElementById('adminCode').value;
      if (code === ADMIN_CODE) {
        sessionStorage.setItem('elima_admin_session', '1');
        openAdminPortal();
      } else {
        document.getElementById('adminGateError').textContent = 'Code incorrect.';
      }
    });
  }

  function renderAdminPanel() {
    return (
      '<div class="portal-head-row"><h3>Administration — Élèves</h3>' +
      '<button class="portal-link" id="amLogout" type="button">Verrouiller</button></div>' +
      '<form id="studentForm" class="portal-form admin-grid">' +
        '<label>Nom complet<input type="text" id="stName" required></label>' +
        '<label>Classe<select id="stClass">' + CLASSES.map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select></label>' +
        '<label>Absences (nombre)<input type="number" id="stAbs" min="0" value="0"></label>' +
        '<div class="admin-subjects" id="adminSubjects"></div>' +
        '<button type="button" class="portal-link" id="addSubjectRow">+ Ajouter une matière</button>' +
        '<div class="admin-tuition" id="adminTuition"></div>' +
        '<button type="submit" class="btn btn-gold" style="width:100%;justify-content:center;">Enregistrer l\'élève</button>' +
      '</form>' +
      '<h4 style="margin-top:28px;">Élèves déjà saisis (cet appareil)</h4>' +
      '<div id="adminStudentList"></div>'
    );
  }

  function subjectRowHtml(name, i1, i2, ex) {
    return '<div class="subject-row">' +
      '<input type="text" placeholder="Matière" class="subj-name" value="' + esc(name || '') + '">' +
      '<input type="number" step="0.5" placeholder="Interro 1" class="subj-i1" value="' + esc(i1 || '') + '">' +
      '<input type="number" step="0.5" placeholder="Interro 2" class="subj-i2" value="' + esc(i2 || '') + '">' +
      '<input type="number" step="0.5" placeholder="Examen" class="subj-ex" value="' + esc(ex || '') + '">' +
      '<button type="button" class="subj-remove" aria-label="Retirer">&times;</button>' +
    '</div>';
  }

  function wireAdminPanel() {
    document.getElementById('amLogout').addEventListener('click', function () {
      sessionStorage.removeItem('elima_admin_session');
      openAdminPortal();
    });

    const subjectsWrap = document.getElementById('adminSubjects');
    function addSubjectRow(name, i1, i2, ex) {
      const div = document.createElement('div');
      div.innerHTML = subjectRowHtml(name, i1, i2, ex);
      const row = div.firstChild;
      row.querySelector('.subj-remove').addEventListener('click', function () { row.remove(); });
      subjectsWrap.appendChild(row);
    }
    addSubjectRow();
    document.getElementById('addSubjectRow').addEventListener('click', function () { addSubjectRow(); });

    const tuitionWrap = document.getElementById('adminTuition');
    tuitionWrap.innerHTML = '<div class="tuition-label">Écolage réglé (Sept. → Juin) :</div>' +
      '<div class="tuition-checks">' + MONTHS.map(function (m) {
        return '<label class="tuition-check"><input type="checkbox" class="tuition-' + m[0] + '"> ' + m[1] + '</label>';
      }).join('') + '</div>';

    document.getElementById('studentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const students = getStudents();
      const subjects = Array.prototype.slice.call(subjectsWrap.querySelectorAll('.subject-row')).map(function (row) {
        return {
          name: row.querySelector('.subj-name').value.trim(),
          interro1: row.querySelector('.subj-i1').value,
          interro2: row.querySelector('.subj-i2').value,
          exam: row.querySelector('.subj-ex').value
        };
      }).filter(function (s) { return s.name; });
      const tuition = {};
      MONTHS.forEach(function (m) {
        tuition[m[0]] = tuitionWrap.querySelector('.tuition-' + m[0]).checked;
      });
      students.push({
        id: Date.now(),
        fullName: document.getElementById('stName').value.trim(),
        className: document.getElementById('stClass').value,
        absences: parseInt(document.getElementById('stAbs').value || '0', 10),
        subjects: subjects,
        tuition: tuition
      });
      saveStudents(students);
      openAdminPortal();
    });

    renderAdminList();
  }

  function renderAdminList() {
    const wrap = document.getElementById('adminStudentList');
    const students = getStudents();
    if (!students.length) { wrap.innerHTML = '<p class="portal-hint">Aucun élève saisi pour le moment.</p>'; return; }
    wrap.innerHTML = students.map(function (s) {
      return '<div class="admin-student-row"><span>' + esc(s.fullName) + ' — ' + esc(s.className) + '</span>' +
        '<button type="button" class="portal-link admin-del" data-id="' + s.id + '">Supprimer</button></div>';
    }).join('');
    wrap.querySelectorAll('.admin-del').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = parseInt(btn.dataset.id, 10);
        saveStudents(getStudents().filter(function (s) { return s.id !== id; }));
        renderAdminList();
      });
    });
  }

  /* ---------- Wire open buttons ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    ['openParentPortal', 'openParentPortalMobile'].forEach(function (id) {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', openParentPortal);
    });
    const adminLink = document.getElementById('openAdminPortal');
    if (adminLink) adminLink.addEventListener('click', function (e) { e.preventDefault(); openAdminPortal(); });
  });
})();
