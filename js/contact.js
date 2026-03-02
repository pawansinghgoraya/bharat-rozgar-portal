"use strict";

/* =====================================================
   BHARAT ROZGAR PORTAL
   STQC + GIGW + WCAG AA COMPLIANT CONTACT SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!form) return;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");

    /* ===============================
       Utility Functions
    =============================== */

    function showError(field, message) {
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");

        const errorId = field.id + "-error";
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.id = errorId;
            errorElement.className = "error-text";
            errorElement.setAttribute("role", "alert");
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    function clearError(field) {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");

        const errorElement = document.getElementById(field.id + "-error");
        if (errorElement) errorElement.remove();
    }

    function clearAllErrors() {
        [nameField, emailField, phoneField, messageField].forEach(clearError);
        formMessage.textContent = "";
    }

    /* ===============================
       Validation Patterns
    =============================== */

    const namePattern = /^[a-zA-Z\s]{3,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    /* ===============================
       Form Submit Handler
    =============================== */

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors();

        let isValid = true;

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const message = messageField.value.trim();

        /* ---- Name Validation ---- */
        if (!namePattern.test(name)) {
            showError(nameField, "कृपया 3 से 50 अक्षरों वाला सही नाम दर्ज करें।");
            isValid = false;
        }

        /* ---- Email Validation ---- */
        if (!emailPattern.test(email)) {
            showError(emailField, "कृपया वैध ईमेल पता दर्ज करें।");
            isValid = false;
        }

        /* ---- Phone Validation ---- */
        if (phone !== "" && !phonePattern.test(phone)) {
            showError(phoneField, "कृपया सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।");
            isValid = false;
        }

        /* ---- Message Validation ---- */
        if (message.length < 10 || message.length > 500) {
            showError(messageField, "संदेश 10 से 500 अक्षरों के बीच होना चाहिए।");
            isValid = false;
        }

        if (!isValid) {
            formMessage.textContent = "कृपया सभी त्रुटियाँ सुधारें।";
            formMessage.className = "message error";
            formMessage.setAttribute("role", "alert");
            formMessage.focus();
            return;
        }

        /* ===============================
           Simulated Submission
           (Replace with secure backend API)
        =============================== */

        formMessage.textContent = "आपका संदेश सफलतापूर्वक भेज दिया गया है।";
        formMessage.className = "message success";
        formMessage.setAttribute("role", "status");

        form.reset();
    });

});"use strict";

/* =====================================================
   BHARAT ROZGAR PORTAL
   STQC + GIGW + WCAG AA COMPLIANT CONTACT SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!form) return;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");

    /* ===============================
       Utility Functions
    =============================== */

    function showError(field, message) {
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");

        const errorId = field.id + "-error";
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.id = errorId;
            errorElement.className = "error-text";
            errorElement.setAttribute("role", "alert");
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    function clearError(field) {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");

        const errorElement = document.getElementById(field.id + "-error");
        if (errorElement) errorElement.remove();
    }

    function clearAllErrors() {
        [nameField, emailField, phoneField, messageField].forEach(clearError);
        formMessage.textContent = "";
    }

    /* ===============================
       Validation Patterns
    =============================== */

    const namePattern = /^[a-zA-Z\s]{3,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    /* ===============================
       Form Submit Handler
    =============================== */

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors();

        let isValid = true;

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const message = messageField.value.trim();

        /* ---- Name Validation ---- */
        if (!namePattern.test(name)) {
            showError(nameField, "कृपया 3 से 50 अक्षरों वाला सही नाम दर्ज करें।");
            isValid = false;
        }

        /* ---- Email Validation ---- */
        if (!emailPattern.test(email)) {
            showError(emailField, "कृपया वैध ईमेल पता दर्ज करें।");
            isValid = false;
        }

        /* ---- Phone Validation ---- */
        if (phone !== "" && !phonePattern.test(phone)) {
            showError(phoneField, "कृपया सही 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।");
            isValid = false;
        }

        /* ---- Message Validation ---- */
        if (message.length < 10 || message.length > 500) {
            showError(messageField, "संदेश 10 से 500 अक्षरों के बीच होना चाहिए।");
            isValid = false;
        }

        if (!isValid) {
            formMessage.textContent = "कृपया सभी त्रुटियाँ सुधारें।";
            formMessage.className = "message error";
            formMessage.setAttribute("role", "alert");
            formMessage.focus();
            return;
        }

        /* ===============================
           Simulated Submission
           (Replace with secure backend API)
        =============================== */

        formMessage.textContent = "आपका संदेश सफलतापूर्वक भेज दिया गया है।";
        formMessage.className = "message success";
        formMessage.setAttribute("role", "status");

        form.reset();
    });

});
