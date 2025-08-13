export function initFadeInAnimation(threshold = 0.2) {
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

