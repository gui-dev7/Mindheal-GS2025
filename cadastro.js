const USERS_KEY = "mindwell_users";

// Função para exibir Alertas Bonitos
function showToast(title, msg, type = "info") {
  // Garante que o container existe
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");

  let icon = "🔔";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "❌";

  toast.className = `toast ${type}`;
  toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-msg">${msg}</div>
        </div>
    `;

  container.appendChild(toast);

  // Remove automaticamente após 3.5 segundos
  setTimeout(() => {
    // Animação de saída manual
    toast.style.transition = "all 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";

    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 400);
  }, 3500);
}

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) {
    showToast("Campos Vazios", "Por favor, preencha tudo.", "error");
    return;
  }

  let users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  if (users.find((u) => u.email === email)) {
    showToast("Erro no Cadastro", "Este e-mail já está em uso.", "error");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    score: 0,
    xp: 0,
    level: 1,
    completedMissions: {},
    assessmentHistory: {},
    moodHistory: {},
    inventory: [],
    equipped: null,
    capsules: [],
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  showToast("Bem-vindo!", "Cadastro realizado com sucesso.", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
