const directory = 'data/events.json';
const cards = document.querySelector('#events');
export async function getEventsData() {
    try {
        const response = await fetch(directory);
        const data = await response.json();
        if (!response.ok) throw new Error('Error loading data');
        displayEvents(data.events);
    } catch (error) {
        console.error('there was a problem:', error);
    }
}

const displayEvents = (events) => {
    events.forEach((event) => {
        let card = document.createElement('div');
        card.classList.add("events-card");
        let title = document.createElement('h1');
        let date = document.createElement('h2');
        let description = document.createElement('p');

        title.textContent = event.title;
        date.textContent =  event.date;
        description.textContent = `Description: ${event.description}`;

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(description);
        
        cards.appendChild(card);
    });
}