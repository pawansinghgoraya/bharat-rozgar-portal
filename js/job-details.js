"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const jobContent = document.getElementById("jobContent");

    const params = new URLSearchParams(window.location.search);
    const jobId = params.get("id");

    if (!jobId) {
        showError("Invalid Job ID.");
        return;
    }

    fetch("data/jobs.json", { cache: "no-store" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Data not found.");
            }
            return response.json();
        })
        .then(data => {

            if (!Array.isArray(data)) {
                throw new Error("Invalid Data Format.");
            }

            const job = data.find(j => String(j.id) === String(jobId));

            if (!job) {
                showError("Job not found.");
                return;
            }

            renderJob(job);
        })
        .catch(error => {
            console.error(error);
            showError("Unable to load job details.");
        });


    function renderJob(job) {

        jobContent.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = job.title || "Untitled";

        const dept = document.createElement("p");
        dept.innerHTML = "<strong>Department:</strong> ";
        dept.appendChild(document.createTextNode(job.department || "N/A"));

        const date = document.createElement("p");
        date.innerHTML = "<strong>Last Date:</strong> ";
        date.appendChild(document.createTextNode(job.lastDate || "N/A"));

        const desc = document.createElement("p");
        desc.innerHTML = "<strong>Description:</strong> ";
        desc.appendChild(document.createTextNode(job.description || "No description available."));

        const applyBtn = document.createElement("a");
        applyBtn.href = job.applyLink || "#";
        applyBtn.textContent = "Apply Now";
        applyBtn.className = "btn";
        applyBtn.setAttribute("target", "_blank");
        applyBtn.setAttribute("rel", "noopener noreferrer");

        jobContent.appendChild(title);
        jobContent.appendChild(dept);
        jobContent.appendChild(date);
        jobContent.appendChild(desc);
        jobContent.appendChild(applyBtn);
    }

    function showError(message) {
        jobContent.textContent = message;
        jobContent.style.color = "#c00000";
    }

});
