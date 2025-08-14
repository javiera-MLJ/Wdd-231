import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2);
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
    getGiftsData();
});

const gifts = 'data/gifts.json';
const options = document.querySelector('#options');

async function getGiftsData() {
    let giftsData;

    const saved = localStorage.getItem('weddingGifts');
    if (saved) {
        giftsData = JSON.parse(saved);
    } else {
        try {
            const response = await fetch(gifts);
            if (!response.ok) throw new Error('Error loading data');
            const data = await response.json();
            giftsData = data.gifts;

            localStorage.setItem('weddingGifts', JSON.stringify(giftsData));
        } catch (error) {
            console.error('There was a problem:', error);
            options.innerHTML = '<p class="error">Failed to load gifts.</p>';
            return;
        }
    }

    displayOptions(giftsData);
}

const displayOptions = (gifts) => {
    const table = document.createElement('table');
    table.classList.add('gifts-table');

    table.innerHTML = `
        <thead>
            <tr>
                <th>Gift Name</th>
                <th>Price</th>
                <th>Quantity Desired</th>
                <th>Already Purchased</th>
                <th>Still Needed</th>
                <th>Action</th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement('tbody');
    gifts.forEach((gift) => {
        const needed = Math.max(0, gift.quantity - gift.purchased);
        const status = needed === 0 ? '✅ Complete' : '🕒 Pending';

        const row = document.createElement('tr');

        row.innerHTML = `
            <td data-label="Gift">${gift.name}</td>
            <td data-label="Price">$${gift.price.toFixed(2)}</td>
            <td data-label="Qty Desired">${gift.quantity}</td>
            <td data-label="Purchased">${gift.purchased}</td>
            <td data-label="Still Needed"><strong>${needed}</strong></td>
            <td data-label="Action">
                ${needed > 0 
                    ? `<button class="button" data-name="${gift.name}">+1 Bought</button>` 
                    : `<span>✅ Complete</span>`
                }
            </td>
        `;
        if (needed === 0) {
            row.classList.add('completed');
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    options.innerHTML = '';
    options.appendChild(table);

    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            updatePurchaseStatus(name);
        });
    });
};

function updatePurchaseStatus(name) {
    const gifts = JSON.parse(localStorage.getItem('weddingGifts'));

    const gift = gifts.find(g => g.name === name);
    if (gift && gift.purchased < gift.quantity) {
        gift.purchased += 1;
        localStorage.setItem('weddingGifts', JSON.stringify(gifts));
        console.log(`+1 for ${name}. Purchased: ${gift.purchased}`);
        
        displayOptions(gifts);
    }
}