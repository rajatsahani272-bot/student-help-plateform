const BASE_URL = "http://localhost:5000/api";

//  render function (NEW)
function renderJobs(data) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  data.forEach(job => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><b>Company:</b> ${job.company}</p>
      <p><b>Location:</b> ${job.location}</p>
      <p><b>Skills:</b> ${job.skills.join(", ")}</p>

      <button class="save-btn"  onclick="saveJob('${job._id}')">❤️ Save</button>
      <a href="${job.url}" class="apply-btn" target="_blank">Apply</a>
    `;

    container.appendChild(div);
  });
}

//  load internships
async function loadInternships() {
  try {
    const res = await fetch(`${BASE_URL}/internships`);
    const data = await res.json();

    renderJobs(data);

  } catch (err) {
    console.error(err);
  }
}

//  SAVE FUNCTION
async function saveJob(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/internships/${id}/save`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();
    alert(data.msg || "Saved!");

  } catch (err) {
    console.error(err);
    alert("Error saving internship");
  }
}

//  SEARCH FILTER
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", async (e) => {
    const value = e.target.value.toLowerCase();

    const res = await fetch(`${BASE_URL}/internships`);
    const data = await res.json();

    const filtered = data.filter(job =>
      job.skills.some(skill =>
        skill.toLowerCase().includes(value)
      )
    );

    renderJobs(filtered);
  });
}

//  Load on start
loadInternships();