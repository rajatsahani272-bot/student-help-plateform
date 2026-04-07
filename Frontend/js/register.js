// js/register.js
import { registerUser } from "./auth.js";

const form = document.getElementById("registerForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Form submitted");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const data = await registerUser(name, email, password);
    console.log(data);

   if (data._id) {
  alert("Register Successful");
  window.location.href = "../pages/login.html";
} else {
  alert("Error occurred");
}

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
});