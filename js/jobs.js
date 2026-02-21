document.addEventListener("DOMContentLoaded", function () {

  fetch("data/jobs.json")
    .then(response => response.json())
    .then(data => {
      const jobList = document.getElementById("job-list");

      data.forEach(job => {

        const jobCard = document.createElement("article");
        jobCard.classList.add("job-card");

        jobCard.innerHTML = `
          <h2>${job.title}</h2>
          <p><strong>Department:</strong> ${job.department}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Last Date:</strong> ${job.lastDate}</p>
          <button aria-label="Apply for ${job.title}">
            Apply Now
          </button>
        `;

        jobList.appendChild(jobCard);
      });
    })
    .catch(error => {
      console.error("Error loading jobs:", error);
    });

});
