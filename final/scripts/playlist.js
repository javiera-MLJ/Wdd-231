import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2); 
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
});

const songForm = document.getElementById('song-form');
const songSuccessMessage = document.getElementById('song-success-message');
if (songForm) {
    songForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(songForm);
        fetch(songForm.action, {
            method: songForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                songSuccessMessage.style.display = 'block';
                songForm.reset();
                setTimeout(() => songSuccessMessage.style.display = 'none', 5000);
            } else {
                alert("There was an error submitting the song form. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error submitting the song form.");
        });
    });
}