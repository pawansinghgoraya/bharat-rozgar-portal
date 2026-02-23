const jobList = document.getElementById("job-list");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

let allJobs = [];
let currentPage = 1;
const jobsPerPage = 5;

// Safe Fetch
fetch("data/jobs.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("jobs.json file not found (404)");
        }
        return response.json();
    })
    .then(data => {
        allJobs = data;
        displayJobs();
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        jobList.innerHTML = "<p style='color:red;'>Failed to load jobs data.</p>";
    });

// Main Display Function
function displayJobs() {

    if (!categoryFilter || !searchInput) return;

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

    if (paginatedJobs.length === 0) {
        jobList.innerHTML = "<p>No jobs found.</p>";
        pagination.innerHTML = "";
        return;
    }

    paginatedJobs.forEach(job => {
    jobList.innerHTML += `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p><strong>Department:</strong> ${job.department}</p>
            <p><strong>Last Date:</strong> ${job.lastDate}</p>

            <a href="job-details.html?id=${job.id}" class="view-btn">
                View Details
            </a>
        </div>
    `;
});

    createPagination(totalPages);
}

// Pagination
function createPagination(totalPages) {
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button onclick="changePage(${i})">${i}</button>
        `;
    }
}

function changePage(page) {
    currentPage = page;
    displayJobs();
}

// Event Listeners (safe check)
if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
        currentPage = 1;
        displayJobs();
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        currentPage = 1;
        displayJobs();
    });
}
