document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("alertBox");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.textContent = "कृपया सभी आवश्यक फ़ील्ड भरें।";
            formMessage.className = "message error";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            formMessage.textContent = "कृपया सही ईमेल पता दर्ज करें।";
            formMessage.className = "message error";
            return;
        }

        formMessage.textContent = "आपका संदेश सफलतापूर्वक भेज दिया गया है!";
        formMessage.className = "message success";

        form.reset();
    });

});
