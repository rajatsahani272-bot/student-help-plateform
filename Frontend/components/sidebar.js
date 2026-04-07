function setupAuthButton() {
  const btn = document.getElementById("authBtn");

  if (!btn) return;

  const token = localStorage.getItem("token");

  // text set
  btn.innerText = token ? "Logout" : "Login";

  // click event
  btn.addEventListener("click", () => {
    if (localStorage.getItem("token")) {
      // logout
      localStorage.removeItem("token");
      alert("Logged out");
      window.location.href = "login.html";
    } else {
      // login
      window.location.href = "login.html";
    }
  });
}

//reuabel components
async function loadSidebar() {
  const container = document.getElementById("sidebar-container");

  if (!container) return;

  const res = await fetch("../components/sidebar.html");
  const data = await res.text();

  container.innerHTML = data;
   setupAuthButton();
}

loadSidebar();