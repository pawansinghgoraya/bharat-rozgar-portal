document.addEventListener("DOMContentLoaded", function () {

    const jobList = document.getElementById("job-list");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");
    const pagination = document.getElementById("pagination");

    let allJobs = [];
    let currentPage = 1;
    const jobsPerPage = 5;

    // =========================
    // SAFE FETCH
    // =========================
    fetch("data/jobs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("jobs.json file not found (404)");
            }
            return response.json();
        })
        .then(data => {
            allJobs = Array.isArray(data) ? data : [];
            displayJobs();
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            if (jobList) {
                jobList.textContent = "Failed to load jobs data.";
            }
        });

    // =========================
    // MAIN DISPLAY FUNCTION
    // =========================
    function displayJobs() {

        if (!jobList || !categoryFilter || !searchInput) return;

        const selectedCategory = categoryFilter.value;
        const searchText = searchInput.value.toLowerCase();

        let filteredJobs = allJobs.filter(job => {

            const matchCategory =
                selectedCategory === "all" ||
                job.department === selectedCategory;

            const matchSearch =
                job.title.toLowerCase().includes(searchText) ||
                job.department.toLowerCase().includes(searchText);

            return matchCategory && matchSearch;
        });

        const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
        const start = (currentPage - 1) * jobsPerPage;
        const end = start + jobsPerPage;
        const paginatedJobs = filteredJobs.slice(start, end);

        jobList.innerHTML = "";
        pagination.innerHTML = "";

        if (paginatedJobs.length === 0) {
            jobList.textContent = "No jobs found.";
            return;
        }

        // =========================
        // SECURE DOM RENDERING
        // =========================
        paginatedJobs.forEach(job => {

            const card = document.createElement("article");
            card.className = "card";

            const title = document.createElement("h3");
            title.textContent = job.title;

            const dept = document.createElement("p");
            const deptStrong = document.createElement("strong");
            deptStrong.textContent = "Department: ";
            dept.appendChild(deptStrong);
            dept.appendChild(document.createTextNode(job.department));

            const lastDate = document.createElement("p");
            const dateStrong = document.createElement("strong");
            dateStrong.textContent = "Last Date: ";
            lastDate.appendChild(dateStrong);
            lastDate.appendChild(document.createTextNode(job.lastDate));

            const link = document.createElement("a");
            link.href = `job-details.html?id=${encodeURIComponent(job.id)}`;
            link.className = "btn";
            link.textContent = "View Details";
            link.setAttribute("aria-label", `View details of ${job.title}`);

            card.appendChild(title);
            card.appendChild(dept);
            card.appendChild(lastDate);
            card.appendChild(link);

            jobList.appendChild(card);
        });

        createPagination(totalPages);
    }

    // =========================
    // PAGINATION (NO INLINE JS)
    // =========================
    function createPagination(totalPages) {

        for (let i = 1; i <= totalPages; i++) {

            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = "btn btn-secondary";

            btn.addEventListener("click", function () {
                currentPage = i;
                displayJobs();
            });

            pagination.appendChild(btn);
        }
    }

    // =========================
    // EVENT LISTENERS
    // =========================
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            currentPage = 1;
            displayJobs();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            currentPage = 1;
            displayJobs();
        });
    }

});
