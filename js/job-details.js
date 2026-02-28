const container = document.getElementById("job-container");

const params = new URLSearchParams(window.location.search);
const jobId = parseInt(params.get("id"));

fetch("data/jobs.json")
  .then(res => res.json())
  .then(data => {
    const job = data.find(j => j.id === jobId);

    if (!job) {
      container.textContent = "Job not found.";
      return;
    }

    renderJob(job);
  })
  .catch(() => {
    container.textContent = "Failed to load job data.";
  });

function renderJob(job) {

  const header = document.createElement("section");
  header.className = "job-header";

  const h1 = document.createElement("h1");
  h1.textContent = job.title;

  const org = document.createElement("p");
  org.textContent = job.organization;

  header.appendChild(h1);
  header.appendChild(org);

  const summary = document.createElement("section");
  summary.className = "job-summary";

  summary.appendChild(createCard("Total Posts", job.totalPosts));
  summary.appendChild(createCard("Qualification", job.qualification));
  summary.appendChild(createCard("Age Limit", job.ageLimit));
  summary.appendChild(createCard("Last Date", job.lastDate));

  const applyBtn = document.createElement("a");
  applyBtn.href = job.applyLink;
  applyBtn.className = "btn";
  applyBtn.textContent = "Apply Online";
  applyBtn.target = "_blank";
  applyBtn.rel = "noopener";

  const tabsSection = createTabs(job);

  container.appendChild(header);
  container.appendChild(summary);
  container.appendChild(applyBtn);
  container.appendChild(tabsSection);
}

function createCard(label, value) {
  const card = document.createElement("div");
  card.className = "summary-card";

  const span = document.createElement("span");
  span.textContent = label;

  const strong = document.createElement("strong");
  strong.textContent = value;

  card.appendChild(span);
  card.appendChild(strong);

  return card;
}

function createTabs(job) {

  const section = document.createElement("section");
  section.className = "tabs";

  const tabList = document.createElement("div");
  tabList.className = "tab-buttons";
  tabList.setAttribute("role", "tablist");

  const panels = [];

  const tabData = [
    { id: "overview", label: "Overview", content: job.overview },
    { id: "eligibility", label: "Eligibility", content: job.eligibility },
    { id: "dates", label: "Important Dates", content: job.importantDates },
    { id: "selection", label: "Selection Process", content: job.selectionProcess }
  ];

  tabData.forEach((item, index) => {

    const tab = document.createElement("button");
    tab.textContent = item.label;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
    tab.className = index === 0 ? "active-tab" : "";

    const panel = document.createElement("div");
    panel.setAttribute("role", "tabpanel");
    panel.style.display = index === 0 ? "block" : "none";

    if (Array.isArray(item.content)) {
      const ul = document.createElement("ul");
      item.content.forEach(liText => {
        const li = document.createElement("li");
        li.textContent = liText;
        ul.appendChild(li);
      });
      panel.appendChild(ul);
    } else {
      panel.textContent = item.content;
    }

    tab.addEventListener("click", () => {
      tabList.querySelectorAll("button").forEach(b => {
        b.setAttribute("aria-selected", "false");
        b.classList.remove("active-tab");
      });
      panels.forEach(p => p.style.display = "none");

      tab.setAttribute("aria-selected", "true");
      tab.classList.add("active-tab");
      panel.style.display = "block";
    });

    tabList.appendChild(tab);
    panels.push(panel);
    section.appendChild(panel);
  });

  section.insertBefore(tabList, section.firstChild);

  return section;
}
