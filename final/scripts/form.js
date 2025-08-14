import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2);
    setupNavigation();
    updateCurrentYear();
    updateLastModified();

    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const comments = document.getElementById('comments').value;
        const timestamp = new Date().toLocaleString();

        const formData = { name, attendance, comments, timestamp };
        sessionStorage.setItem('rsvpConfirmation', JSON.stringify(formData));

        const formDataToSend = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formDataToSend,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'confirmed-reservation.html';
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(() => {
            errorMessage.style.display = 'block';
        });
    });
});