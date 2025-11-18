const USERS_KEY = "mindwell_users";
const SESSION_KEY = "mindwell_session";

// Verifica sessão
let currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
if (!currentUser) window.location.href = "login.html";

// Inicializa dados
if (!currentUser.xp) currentUser.xp = 0;
if (!currentUser.inventory) currentUser.inventory = [];
if (!currentUser.equipped) currentUser.equipped = null;
if (!currentUser.capsules) currentUser.capsules = [];
if (!currentUser.moodHistory) currentUser.moodHistory = {};

// --- DADOS ---
const shopItems = [
  { id: "glasses", name: "Estilo", icon: "🕶️", price: 100 },
  { id: "crown", name: "Realeza", icon: "👑", price: 500 },
  { id: "party", name: "Festa", icon: "🥳", price: 300 },
  { id: "flower", name: "Zen", icon: "🌸", price: 150 },
  { id: "robot", name: "Tech", icon: "🤖", price: 250 },
  { id: "cat", name: "Pet", icon: "🐱", price: 400 },
];

const missionsPool = [
  { id: "m1", text: "Beber água", points: 10 },
  { id: "m2", text: "Respiração (4-7-8)", points: 20 },
  { id: "m3", text: "Alongar 2 min", points: 15 },
  { id: "m4", text: "Elogiar colega", points: 25 },
  { id: "m5", text: "Pausa de tela", points: 15 },
];

const quizData = [
  { q: "Qual a melhor respiração para acalmar?", opts: ["Rápida", "Profunda", "Ofegante"], ans: 1 },
  { q: "Quantos litros de água o ideal?", opts: ["1L", "2L+", "Só café"], ans: 1 },
  { q: "O que fazer ao sentir estresse?", opts: ["Gritar", "Pausa", "Ignorar"], ans: 1 },
];

// Banco de frases automáticas
const autoQuotes = [
  "Acredite em si mesmo, um passo de cada vez.",
  "Você é mais forte do que imagina.",
  "Respire fundo. O agora é o que importa.",
  "O progresso é melhor que a perfeição.",
  "Seja gentil com sua mente hoje.",
  "Pequenas pausas fazem grandes diferenças.",
  "Você não precisa carregar o mundo nas costas.",
];

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadDashboard();
  initCapsules();
  renderMoodPixel();
  updateAvatarDisplay();
  initChat();
  startQuoteRotation(); // Inicia as mensagens
});

function loadDashboard() {
  const xpNext = 200;
  const level = Math.floor(currentUser.xp / xpNext) + 1;
  if (level > (currentUser.level || 1)) {
    showToast("LEVEL UP! 🚀", `Nível ${level} alcançado!`);
    currentUser.level = level;
  }
  document.getElementById("display-xp").innerText = currentUser.xp;
  document.getElementById("display-level").innerText = currentUser.level || 1;
  renderMissions();
}

function saveUser() {
  localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
  let db = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const idx = db.findIndex((u) => u.id === currentUser.id);
  if (idx !== -1) db[idx] = currentUser;
  localStorage.setItem(USERS_KEY, JSON.stringify(db));
}

// --- MENSAGENS AUTOMÁTICAS ---
function startQuoteRotation() {
  const el = document.getElementById("auto-quote");
  let i = 0;

  // Define primeira mensagem
  el.innerText = `"${autoQuotes[0]}"`;

  setInterval(() => {
    // Fade out
    el.style.opacity = 0;

    setTimeout(() => {
      // Troca texto e Fade in
      i = (i + 1) % autoQuotes.length;
      el.innerText = `"${autoQuotes[i]}"`;
      el.style.opacity = 1;
    }, 500); // Tempo para o texto sumir antes de trocar
  }, 8000); // Troca a cada 8 segundos (sincronizado com animação CSS da barra)
}

// --- ATIVIDADES ---
function openBreathingModal() {
  const modal = document.getElementById("modal-content");
  document.getElementById("modal-overlay").classList.add("active");
  modal.innerHTML = `
        <h2>🌬️ Respirar</h2>
        <div style="width:100px; height:100px; background:var(--primary); border-radius:50%; margin:2rem auto; animation: breathe 4s infinite ease-in-out;"></div>
        <p>Siga o ritmo da esfera...</p>
        <button class="btn-main" onclick="closeModal()" style="margin-top:1rem;">Concluir (+10 XP)</button>
    `;
  currentUser.xp += 10;
  saveUser();
  loadDashboard();
}

function openQuiz() {
  const q = quizData[Math.floor(Math.random() * quizData.length)];
  const modal = document.getElementById("modal-content");
  document.getElementById("modal-overlay").classList.add("active");
  let html = `<h2>🧠 Quiz</h2><p style="margin:1rem 0; font-size:1.1rem">${q.q}</p>`;
  q.opts.forEach((opt, idx) => {
    html += `<button class="btn-main" style="margin-bottom:10px; background:var(--bg-app); color:var(--text-main); border:1px solid var(--border)" onclick="checkAnswer(${idx}, ${q.ans})">${opt}</button>`;
  });
  modal.innerHTML = html;
}
function checkAnswer(sel, corr) {
  closeModal();
  if (sel === corr) {
    showToast("Correto!", "+20 XP");
    currentUser.xp += 20;
    saveUser();
    loadDashboard();
  } else {
    showToast("Ops!", "Tente novamente.");
  }
}

function startFocusTimer() {
  showToast("Foco Iniciado", "1 minuto de concentração...");
  setTimeout(() => {
    showToast("Tempo Esgotado", "Parabéns pelo foco! +15 XP");
    currentUser.xp += 15;
    saveUser();
    loadDashboard();
  }, 60000);
}

function toggleZenMode() {
  const layer = document.getElementById("zen-layer");
  const isActive = layer.classList.contains("active");
  if (!isActive) layer.classList.add("active");
  else layer.classList.remove("active");
}

// --- CHATBOT ---
function initChat() {
  const h = document.getElementById("chat-history");
  if (!h.children.length) addMsg("Olá! Estou sempre aqui. Como se sente?", "bot");
}
function addMsg(txt, sender) {
  const h = document.getElementById("chat-history");
  const d = document.createElement("div");
  d.className = `chat-bubble bubble-${sender}`;
  d.innerText = txt;
  h.appendChild(d);
  h.scrollTop = h.scrollHeight;
}
document.getElementById("chat-send-btn").onclick = () => {
  const inp = document.getElementById("chat-input");
  const txt = inp.value.trim();
  if (!txt) return;
  addMsg(txt, "user");
  inp.value = "";
  setTimeout(() => {
    let reply = "Entendo. Conte-me mais.";
    if (txt.match(/triste/i)) reply = "Sinto muito. Respire fundo.";
    if (txt.match(/feliz/i)) reply = "Que ótimo ouvir isso!";
    addMsg(reply, "bot");
  }, 800);
};

// --- MOOD PIXEL ---
function renderMoodPixel() {
  const grid = document.getElementById("mood-grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const cell = document.createElement("div");
    cell.className = "mood-cell";
    cell.innerText = i;
    const key = `2023-10-${i < 10 ? "0" + i : i}`;
    if (currentUser.moodHistory[key]) cell.classList.add(`mood-${currentUser.moodHistory[key]}`);
    if (i === new Date().getDate()) {
      cell.classList.add("today");
      cell.onclick = () => openMoodSelector(key);
    }
    grid.appendChild(cell);
  }
}
function openMoodSelector(key) {
  const modal = document.getElementById("modal-content");
  document.getElementById("modal-overlay").classList.add("active");
  modal.innerHTML = `
        <h2>Humor de Hoje?</h2>
        <div class="mood-selector">
            <button class="mood-btn" onclick="setMood('${key}', 'great')">😄</button>
            <button class="mood-btn" onclick="setMood('${key}', 'ok')">😐</button>
            <button class="mood-btn" onclick="setMood('${key}', 'bad')">😫</button>
        </div>
    `;
}
function setMood(key, mood) {
  currentUser.moodHistory[key] = mood;
  currentUser.xp += 10;
  saveUser();
  renderMoodPixel();
  closeModal();
  loadDashboard();
}

// --- LOJA ---
function openShop() {
  const modal = document.getElementById("modal-content");
  document.getElementById("modal-overlay").classList.add("active");
  let html = `<h2>🛍️ Loja (XP: ${currentUser.xp})</h2><div class="shop-grid" style="margin-top:1rem">`;
  shopItems.forEach((item) => {
    const owned = currentUser.inventory.includes(item.id);
    html += `
            <div class="shop-item ${owned ? "owned" : ""}" onclick="${owned ? `equipItem('${item.icon}')` : `buyItem('${item.id}', ${item.price})`}">
                <span class="shop-icon">${item.icon}</span>
                <div>${item.name}</div>
                <div style="font-size:0.8rem; font-weight:bold">${owned ? (currentUser.equipped === item.icon ? "EQUIPADO" : "USAR") : item.price + " XP"}</div>
            </div>
        `;
  });
  html += `</div><button class="btn-main" onclick="closeModal()" style="margin-top:1rem; background:transparent; border:1px solid #ccc; color:var(--text-main)">Fechar</button>`;
  modal.innerHTML = html;
}
function buyItem(id, price) {
  if (currentUser.xp >= price) {
    currentUser.xp -= price;
    currentUser.inventory.push(id);
    saveUser();
    openShop();
    loadDashboard();
  } else {
    showToast("Saldo Insuficiente", "Faça mais missões!");
  }
}
function equipItem(icon) {
  currentUser.equipped = icon;
  saveUser();
  updateAvatarDisplay();
  openShop();
}
function updateAvatarDisplay() {
  const el = document.getElementById("avatar-accessory-header");
  if (currentUser.equipped) el.innerText = currentUser.equipped;
}

// --- CÁPSULA ---
function initCapsules() {
  const list = document.getElementById("capsule-list");
  list.innerHTML = "";
  currentUser.capsules.forEach((cap, i) => {
    const unlocked = new Date().getTime() >= new Date(cap.unlock).getTime();
    const div = document.createElement("div");
    div.className = `capsule-item ${unlocked ? "unlocked" : ""}`;
    div.innerHTML = `<span>${unlocked ? "🔓" : "🔒"}</span> <small>Cápsula ${i + 1}</small>`;
    if (unlocked) div.onclick = () => alert(cap.msg);
    list.appendChild(div);
  });
}
function createCapsule() {
  const msg = document.getElementById("capsule-input").value;
  if (!msg) return;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  currentUser.capsules.push({ msg, unlock: date });
  document.getElementById("capsule-input").value = "";
  saveUser();
  initCapsules();
  showToast("Cápsula", "Guardada por 24h.");
}

// --- MISSÕES ---
function renderMissions() {
  const list = document.getElementById("mission-list");
  list.innerHTML = "";
  const today = new Date().toDateString();
  if (currentUser.lastLoginDate !== today) {
    currentUser.todayMissions = missionsPool.sort(() => 0.5 - Math.random()).slice(0, 3);
    currentUser.completedToday = [];
    currentUser.lastLoginDate = today;
    saveUser();
  }
  currentUser.todayMissions.forEach((m) => {
    const done = (currentUser.completedToday || []).includes(m.id);
    const div = document.createElement("div");
    div.className = `mission-item ${done ? "done" : ""}`;
    div.onclick = () => !done && completeMission(m.id, m.points);
    div.innerHTML = `<div class="check-circle">${done ? "✓" : ""}</div><span>${m.text}</span> <small style="margin-left:auto">+${m.points}xp</small>`;
    list.appendChild(div);
  });
}
function completeMission(id, pts) {
  if (!currentUser.completedToday) currentUser.completedToday = [];
  currentUser.completedToday.push(id);
  currentUser.xp += pts;
  saveUser();
  loadDashboard();
}

// --- UTILS ---
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}
function showToast(title, msg) {
  const c = document.getElementById("toast-container");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<b>${title}</b><br>${msg}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
function initTheme() {
  if (localStorage.getItem("mindwell_theme") === "dark") document.body.classList.add("dark-mode");
}
document.getElementById("logout-btn").onclick = () => {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
};
