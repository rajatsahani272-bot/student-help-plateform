// js/auth.js
import BASE_URL from "./api.js";

// REGISTER
export async function registerUser(name, email, password) {
  const res = await fetch("https://student-help-plateform.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  return res.json();
}

// LOGIN
export async function loginUser(email, password) {
  const res = await fetch("https://student-help-plateform.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json(); 
  return data; 
}