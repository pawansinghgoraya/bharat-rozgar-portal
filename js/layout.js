const basePath = "/bharat-rozgar-portal";

fetch(basePath + "/components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
  });

fetch(basePath + "/components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

// Active link highlight
setTimeout(() => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach(link => {
    if (currentPath.includes(link.getAttribute("href"))) {
      link.classList.add("active-link");
    }
  });
}, 300);
