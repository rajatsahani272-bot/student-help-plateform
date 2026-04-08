
document.addEventListener("click", (e) => {

  //  Login button
  if (e.target.classList.contains("login-button")) {
    window.location.href = "./pages/login.html";
  }
  
  // card-img
  if (e.target.classList.contains("card-1")){
    window.location.href="./pages/ask-doubt.html";
  }
   if (e.target.classList.contains("card-3")){
    window.location.href="./pages/resources.html";
  }
});
