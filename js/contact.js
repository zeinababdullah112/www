// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const nameInput = form.querySelector('input[placeholder="Name"]');
    const emailInput = form.querySelector('input[placeholder="Email"]');
    const phoneInput = form.querySelector('input[placeholder="Phone"]');
    const messageInput = form.querySelector('textarea[placeholder="Messages"]');

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop the form from submitting

        // Check if all fields have a value
        if (
            nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            phoneInput.value.trim() === "" ||
            messageInput.value.trim() === ""
        ) {
            alert("Please fill out all fields before sending.");
            return;
        }

        // Show success message
        alert("Your message sent successfully!");

        // Optionally clear the form fields
        form.reset();
    });
});
