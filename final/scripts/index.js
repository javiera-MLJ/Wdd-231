import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2);
    setupNavigation();
    updateCurrentYear();
    updateLastModified();


    const weddingDate = new Date("October 11, 2025 14:00:00").getTime();
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysSpan) daysSpan.textContent = days.toString().padStart(2, "0");
        if (hoursSpan) hoursSpan.textContent = hours.toString().padStart(2, "0");
        if (minutesSpan) minutesSpan.textContent = minutes.toString().padStart(2, "0");
        if (secondsSpan) secondsSpan.textContent = seconds.toString().padStart(2, "0");
    }

    if (daysSpan) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const modal = document.querySelector("#image-details");
    const mainImage = document.querySelector("#img-w-modal");
    const closeModalBtn = document.querySelector("#closeModal");

    if (modal && mainImage) {
        mainImage.addEventListener("click", () => {
            modal.showModal();
        });
    } else {
        console.warn("Modal or image not found. Are they in the HTML?");
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.close();
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    }
});
