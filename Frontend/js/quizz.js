let questions = [];
let currentIndex = 0;
let answers = [];
let timer;
let timeLeft = 60;

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

async function startQuiz() {
  document.getElementById("quizContainer").classList.remove("hidden");
  document.getElementById("resultBox").innerHTML = "";

  const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
  const data = await res.json();

  questions = data.results;
  answers = new Array(questions.length).fill(null);
  currentIndex = 0;

  startTimer();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];
  const options = [...q.incorrect_answers, q.correct_answer]
    .sort(() => Math.random() - 0.5);

  const box = document.getElementById("questionBox");

  box.innerHTML = `
    <h3>Q${currentIndex + 1}: ${decodeHTML(q.question)}</h3>
    ${options.map(opt => `
      <label>
        <input type="radio" name="q" value="${opt}"
          ${answers[currentIndex] === opt ? "checked" : ""}
        >
        ${decodeHTML(opt)}
      </label>
    `).join("")}
  `;

  updateProgress();
}

function nextQuestion() {
  saveAnswer();
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function saveAnswer() {
  const selected = document.querySelector('input[name="q"]:checked');
  if (selected) {
    answers[currentIndex] = selected.value;
  }
}

function updateProgress() {
  const percent = ((currentIndex + 1) / questions.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function startTimer() {
  timeLeft = 60;
  document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timer);
  saveAnswer();

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) {
      score++;
    }
  });

  document.getElementById("quizContainer").classList.add("hidden");

  document.getElementById("resultBox").innerHTML = `
    <h2>🎉 Your Score: ${score}/${questions.length}</h2>
    <button onclick="startQuiz()">Restart Quiz</button>
  `;
}