

/* =====================================================
   BHARAT ROZGAR PORTAL
   STQC + GIGW + WCAG AA COMPLIANT CONTACT SCRIPT
===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("alertBox");

    if (!form) return;

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    /* ===============================
       Utility Functions
    =============================== */

    function showError(field, errorElement, message) {
        if (!field || !errorElement) return;

        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;
    }

    function clearError(field, errorElement) {
        if (!field || !errorElement) return;

        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
        errorElement.textContent = "";
    }

    function clearAllErrors() {
        clearError(nameField, nameError);
        clearError(emailField, emailError);
        clearError(phoneField, phoneError);
        clearError(messageField, messageError);

        if (alertBox) {
            alertBox.textContent = "";
            alertBox.className = "form-alert";
        }
    }

    /* ===============================
       Validation Patterns
    =============================== */

    const namePattern = /^[a-zA-Z\s]{3,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    /* ===============================
       Form Submit
    =============================== */

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors();

        let isValid = true;

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const message = messageField.value.trim();

        /* ---- Name ---- */
        if (!namePattern.test(name)) {
            showError(nameField, nameError, "कृपया 3 से 50 अक्षरों वाला सही नाम दर्ज करें।");
            isValid = false;
        }

        /* ---- Email ---- */
        if (!emailPattern.test(email)) {
            showError(emailField, emailError, "कृपया वैध ईमेल पता दर्ज करें।");
            isValid = false;
        }

        /* ---- Phone ---- */
        if (phone !== "" && !phonePattern.test(phone)) {
            showError(phoneField, phoneError, "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।");
            isValid = false;
        }

        /* ---- Message ---- */
        if (message.length < 10 || message.length > 500) {
            showError(messageField, messageError, "संदेश 10 से 500 अक्षरों के बीच होना चाहिए।");
            isValid = false;
        }

        if (!isValid) {
            if (alertBox) {
                alertBox.textContent = "कृपया सभी त्रुटियाँ सुधारें।";
                alertBox.className = "form-alert error";
                alertBox.focus();
            }
            return;
        }

        /* ===============================
           Simulated Success
        =============================== */

        if (alertBox) {
            alertBox.textContent = "आपका संदेश सफलतापूर्वक भेज दिया गया है।";
            alertBox.className = "form-alert success";
        }

        form.reset();
    });

});
