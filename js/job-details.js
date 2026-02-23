const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

fetch("data/jobs.json")
    .then(res => res.json())
    .then(data => {

        const job = data.find(j => j.id == jobId);

        if (!job) {
            document.body.innerHTML = "<h2>Job Not Found</h2>";
            return;
        }

        document.getElementById("jobTitle").textContent = job.title;
        document.getElementById("jobDept").textContent = job.department;
        document.getElementById("jobLocation").textContent = job.location;
        document.getElementById("jobPosts").textContent = job.totalPosts;
        document.getElementById("jobLastDate").textContent = job.lastDate;

        document.getElementById("startDate").textContent = job.importantDates.start;
        document.getElementById("lastDate").textContent = job.importantDates.last;
        document.getElementById("examDate").textContent = job.importantDates.exam;

        document.getElementById("feeGeneral").textContent = job.applicationFees.general;
        document.getElementById("feeSCST").textContent = job.applicationFees.scst;
        document.getElementById("feeFemale").textContent = job.applicationFees.female;

        document.getElementById("education").textContent = job.eligibility.education;
        document.getElementById("age").textContent = job.eligibility.age;

        document.getElementById("selectionProcess").textContent = job.selectionProcess;
        document.getElementById("howToApply").textContent = job.howToApply;
    });

const agreeCheckbox = document.getElementById("agreeCheckbox");
const applyBtn = document.getElementById("applyBtn");

agreeCheckbox.addEventListener("change", () => {
    applyBtn.disabled = !agreeCheckbox.checked;
});

applyBtn.addEventListener("click", () => {
    alert("Proceeding to Application Form...");
});
