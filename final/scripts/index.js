import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2); 
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
});

// === Countdown ===
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
    daysSpan.textContent = days.toString().padStart(2, "0");
    hoursSpan.textContent = hours.toString().padStart(2, "0");
    minutesSpan.textContent = minutes.toString().padStart(2, "0");
    secondsSpan.textContent = seconds.toString().padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
