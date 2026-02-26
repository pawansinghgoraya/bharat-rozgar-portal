document.addEventListener("DOMContentLoaded", function () {

    const jobContainer = document.getElementById("jobDetail");

    // Get Job ID from URL
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get("id");

    if (!jobId) {
        jobContainer.textContent = "Invalid Job ID.";
        return;
    }

    fetch("data/jobs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Jobs data not found.");
            }
            return response.json();
        })
        .then(data => {

            const job = data.find(j => String(j.id) === String(jobId));

            if (!job) {
                jobContainer.textContent = "Job not found.";
                return;
            }

            renderJobDetails(job);
        })
        .catch(error => {
            console.error(error);
            jobContainer.textContent = "Unable to load job details.";
        });

    // =========================
    // SECURE RENDER FUNCTION
    // =========================
    function renderJobDetails(job) {

        const article = document.createElement("article");
        article.className = "card";

        const title = document.createElement("h2");
        title.textContent = job.title;

        const dept = createField("Department", job.department);
        const lastDate = createField("Last Date", job.lastDate);
        const qualification = createField("Qualification", job.qualification || "As per notification");
        const age = createField("Age Limit", job.ageLimit || "As per rules");

        const desc = document.createElement("p");
        desc.textContent = job.description || "Refer official notification.";

        const applyBtn = document.createElement("a");
        applyBtn.href = job.applyLink || "#";
        applyBtn.className = "btn";
        applyBtn.textContent = "Apply Online";
        applyBtn.target = "_blank";
        applyBtn.rel = "noopener noreferrer";

        article.appendChild(title);
        article.appendChild(dept);
        article.appendChild(lastDate);
        article.appendChild(qualification);
        article.appendChild(age);
        article.appendChild(desc);
        article.appendChild(applyBtn);

        jobContainer.appendChild(article);
    }

    function createField(label, value) {
        const p = document.createElement("p");

        const strong = document.createElement("strong");
        strong.textContent = label + ": ";

        p.appendChild(strong);
        p.appendChild(document.createTextNode(value));

        return p;
    }

});
