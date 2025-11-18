const USERS_KEY = "mindwell_users";
const SESSION_KEY = "mindwell_session";

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Busca usuários no localStorage
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

  // Validação simples
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Salva sessão
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    // Redireciona para a Home
    window.location.href = "index.html";
  } else {
    alert("E-mail ou senha inválidos!");
  }
});

// Se já estiver logado, vai para home
if (localStorage.getItem(SESSION_KEY)) {
  window.location.href = "index.html";
}
