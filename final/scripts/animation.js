document.addEventListener("DOMContentLoaded", function () {
    // === ANIMATIONS FADE-IN ===
    const faders = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // === SONGS FORM ===
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


    // === RSVP FORM ===
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccessMessage = document.getElementById('rsvp-success-message');
    const rsvpErrorMessage = document.getElementById('rsvp-error-message');
    const rsvpSubmitButton = rsvpForm ? rsvpForm.querySelector('button[type="submit"]') : null;

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (rsvpSubmitButton) {
                rsvpSubmitButton.textContent = "Enviando...";
                rsvpSubmitButton.disabled = true;
            }

            const formData = new FormData(rsvpForm);

            fetch(rsvpForm.action, {
                method: rsvpForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    rsvpSuccessMessage.style.display = 'block';
                    rsvpErrorMessage.style.display = 'none';
                    rsvpForm.reset();
                    setTimeout(() => rsvpSuccessMessage.style.display = 'none', 5000);
                } else {
                    throw new Error('Error in response');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                rsvpErrorMessage.style.display = 'block';
                rsvpSuccessMessage.style.display = 'none';
            })
            .finally(() => {
                if (rsvpSubmitButton) {
                    rsvpSubmitButton.textContent = "Send Confirmation";
                    rsvpSubmitButton.disabled = false;
                }
            });
        });
    }
});