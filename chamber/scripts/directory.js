const navButton = document.querySelector('#nav-button');
const navlinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

const directory = 'data/members.json';
const cards = document.querySelector('#cards');
async function getMembersData() {
    try {
        const response = await fetch(directory);
        const data = await response.json();
        if (!response.ok) throw new Error('Error loading data');
        displayCompanies(data.companies);
    } catch (error) {
        console.error('there was a problem:', error);
    }
}

const displayCompanies = (companies) => {
    companies.forEach((company) => {
        let card = document.createElement('section');
        let portrait = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let membership = document.createElement('p');
        let since = document.createElement('p');
        let URL = document.createElement('p');
        let link = document.createElement("a");

        link.href = company.URL;
        link.textContent = company.URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        URL.textContent = 'Website: ';
        URL.appendChild(link);

        name.textContent = `${company.name}`;
        address.textContent = `Address: ${company.address}`;
        phoneNumber.textContent = `Phone Number: ${company.phone_number}`;
        membership.textContent = `Membership Level: ${company.membership}`;
        since.textContent = `Membership Since: ${company.membership_since}`;

        portrait.setAttribute('src', company.image);
        portrait.setAttribute('alt', `Portrait of ${company.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(membership);
        card.appendChild(since);
        card.appendChild(URL);
        
        cards.appendChild(card);
    });
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#cards");


gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

window.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector("#cards");

    if (window.matchMedia("(min-width: 768px)").matches) {
        display.classList.add("grid");
        display.classList.remove("list");
    } else {
        display.classList.add("list");
        display.classList.remove("grid");
    }

    // Opcional: detectar cambio de tamaño de pantalla
    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            display.classList.add("grid");
            display.classList.remove("list");
        } else {
            display.classList.add("list");
            display.classList.remove("grid");
        }
    });
});

getMembersData();

const currentyear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentyear;

    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleString();
    document.getElementById("lastModified").textContent = `Last Modified: ${formattedDate}`;
