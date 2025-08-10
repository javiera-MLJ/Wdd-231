import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
});

const discover = 'data/discover.json';
const cards = document.querySelector('#places');
async function getDiscoverData() {
    try {
        const response = await fetch(discover);
        const data = await response.json();
        if (!response.ok) throw new Error('Error loading data');
        displayDiscover(data.discover);
    } catch (error) {
        console.error('there was a problem:', error);
    }
}

const displayDiscover = (discover) => {
    discover.forEach((place) => {
        const card = document.createElement('div');
        const name = document.createElement('h2');
        const figure = document.createElement("figure");
        const img = document.createElement('img');
        const address = document.createElement('address');
        const description = document.createElement('p');
        const button = document.createElement('button');

        card.className = 'place-card';
        name.className = 'place-name';
        figure.className = 'place-figure';
        img.className = 'place-img';
        address.className = 'place-address';
        description.className = 'place-description';
        button.className = 'place-button';

        name.textContent = place.name;
        address.textContent = place.address;
        description.textContent = place.description;
        button.textContent = 'Learn More';

        img.setAttribute('src', place.image);
        img.setAttribute('alt', `Portrait of ${place.name}`);
        img.setAttribute('loading', 'lazy');

        figure.appendChild(img);

        card.appendChild(name);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);
        
        cards.appendChild(card);
    });
}

    const welcomeElement = document.getElementById("welcome");
    const lastVisit = Number(localStorage.getItem("lastVisit"));
    const now = Date.now();

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const diffTime = now - lastVisit;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        message = "Back so soon! Awesome!";
    } else {
        const dayText = diffDays === 1 ? "day" : "days";
        message = `You last visited ${diffDays} ${dayText} ago.`;
    }
    }

    welcomeElement.textContent = message;

    localStorage.setItem("lastVisit", now);

    setTimeout(() => {
        welcomeElement.classList.add("hidden");
    }, 4000);

getDiscoverData();