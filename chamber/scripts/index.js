import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { fetchWeather } from './weather.mjs'
import { getEventsData } from './event.mjs';

const directory = 'data/members.json';
const cards = document.querySelector('#members');
async function getMembersData() {
    try {
        const response = await fetch(directory);
        const data = await response.json();
        if (!response.ok) throw new Error('Error loading data');
        displayMembers(data.companies);
    } catch (error) {
        console.error('there was a problem:', error);
    }
}

const displayMembers = (companies) => {

    const eligibleMembers = companies.filter(member =>
    member.membership === "Gold" || member.membership === "Silver"
    );

    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

    const selectedMembers = shuffled.slice(0, 3);

    cards.innerHTML = "";

    selectedMembers.forEach((member) => {
        let card = document.createElement('div');
        card.classList.add("members-card");
        
        let name = document.createElement('h1');
        let membership = document.createElement('h2');
        let contentContainer = document.createElement('div');
        contentContainer.classList.add('member-content');

        let portrait = document.createElement('img');
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('info');

        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let URL = document.createElement('p');
        let link = document.createElement("a");

        name.textContent = `${member.name}`;
        membership.textContent = `Membership Level: ${member.membership}`;
        address.textContent = `Address: ${member.address}`;
        phoneNumber.textContent = `Phone Number: ${member.phone_number}`;
        link.href = member.URL;
        link.textContent = member.URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        URL.textContent = 'Website: ';
        URL.appendChild(link);

        portrait.setAttribute('src', member.image);
        portrait.setAttribute('alt', `Portrait of ${member.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');


        infoContainer.appendChild(address);
        infoContainer.appendChild(phoneNumber);
        infoContainer.appendChild(URL);

        contentContainer.appendChild(portrait);
        contentContainer.appendChild(infoContainer);

        card.appendChild(name);
        card.appendChild(membership);
        card.appendChild(contentContainer);
    
        cards.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
    getMembersData();
    fetchWeather();
    getEventsData();
});


