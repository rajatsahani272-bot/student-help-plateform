import { loginUser } from "./auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login Successful");
      window.location.href = "index.html";
    } else {
      alert(data.msg || "Login failed");
    }

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
});