fetch("/bharat-rozgar-portal/components/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
});

fetch("/bharat-rozgar-portal/components/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
});
