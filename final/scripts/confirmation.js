import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateCurrentYear();
    updateLastModified();

    const resultsContainer = document.getElementById('answers');
    const savedData = sessionStorage.getItem('rsvpConfirmation');
    if (resultsContainer && savedData) {
        const data = JSON.parse(savedData);
        resultsContainer.innerHTML = `
            <h1>Thank you for confirming your attendance with us. </h1>
            <p>Confirmation details: </p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Attendance:</strong> ${data.attendance}</p>
            <p><strong>Comments:</strong> ${data.comments || 'No comments'}</p>
            <p><strong>Submitted:</strong> ${data.timestamp}</p>
        `;
    } else {
        resultsContainer.innerHTML = `
            <p>Could not load your information. Thank you for confirming!</p>
        `;
    }

});