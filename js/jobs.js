document.addEventListener("DOMContentLoaded", () => {

  const jobList = document.getElementById("job-list");

  if (!jobList) return;

  fetch("data/jobs.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load JSON");
      }
      return response.json();
    })
    .then(data => {
      renderJobs(data);
    })
    .catch(error => {
      jobList.innerHTML = "<p>Unable to load jobs.</p>";
      console.error(error);
    });

  function renderJobs(jobs) {
    jobList.innerHTML = "";

    if (jobs.length === 0) {
      jobList.innerHTML = "<p>No jobs available.</p>";
      return;
    }

    jobs.forEach(job => {

      const jobCard = document.createElement("article");
      jobCard.classList.add("job-card");

      jobCard.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Department:</strong> ${job.department || "N/A"}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Last Date:</strong> ${job.lastDate}</p>
        <button aria-label="Apply for ${job.title}">
          Apply Now
        </button>
      `;

      jobList.appendChild(jobCard);

    });
  }

});
