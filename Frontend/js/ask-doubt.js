
async function askAI() {
  try {
    const input = document.getElementById("input");
    const chatBox = document.getElementById("chatBox");

    const prompt = input.value;
    if (!prompt) return;

    chatBox.innerHTML += `<p class="user">${prompt}</p>`;
    input.value = "";

    // thinking...
    const thinkingMsg = document.createElement("p");
    thinkingMsg.className = "bot";
    thinkingMsg.innerText = "Processing...";
    chatBox.appendChild(thinkingMsg);

    const res = await fetch("https://student-help-plateform.onrender.com/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    chatBox.lastChild.remove();

    chatBox.innerHTML += `<p class="bot">${
      data.reply
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/\n/g, "<br>")
    }</p>`;

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    document.getElementById("chatBox").innerHTML += `<p class="bot">Error aa gaya 😅</p>`;
    console.error(err);
  }
}


const input = document.getElementById("input");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); 
    askAI();           
  }
});