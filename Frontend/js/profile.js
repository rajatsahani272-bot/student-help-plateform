const token = localStorage.getItem("token");

console.log("TOKEN:", token); // 

fetch("https://student-help-plateform.onrender.com/api/user/profile", {
  headers: {
    Authorization: "Bearer " + token
  }
})
.then(res => res.json())
.then(data => {
  console.log("PROFILE DATA:", data); // 

  document.getElementById("name").innerText = data.name;
  document.getElementById("email").innerText = data.email;
})
.catch(err => console.log(err));