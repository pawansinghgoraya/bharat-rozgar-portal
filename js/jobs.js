let jobs = [];
let currentPage = 1;
const jobsPerPage = 5;
let selectedCategory = "all";

fetch("jobs.json")
  .then(response => response.json())
  .then(data => {
    jobs = data;
    renderJobs();
  });

document.getElementById("categoryFilter").addEventListener("change", function () {
  selectedCategory = this.value;
  currentPage = 1;
  renderJobs();
});

function renderJobs() {
  const container = document.getElementById("job-list");
  container.innerHTML = "";

  let filteredJobs = selectedCategory === "all"
    ? jobs
    : jobs.filter(job => job.department === selectedCategory);

  const start = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(start, start + jobsPerPage);

  paginatedJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Department:</strong> ${job.department}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <button>Apply Now</button>
    `;
    container.appendChild(jobCard);
  });

  renderPagination(filteredJobs.length);
}

function renderPagination(totalJobs) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.style.fontWeight = "bold";
    }

    btn.addEventListener("click", function () {
      currentPage = i;
      renderJobs();
    });

    pagination.appendChild(btn);
  }
}
