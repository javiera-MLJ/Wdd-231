import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
});

const membership = [
    {
        title: 'Non-Profit Membership Benefits',
        description: 'The benefits of this level include 2 free training sessions per month, and participation in 2 entrepreneurship conferences.'
    },

    {
        title: 'Bronze Membership Benefits',
        description: 'The benefits of this level include 3 free training sessions per month, 2 exhibition presentations per year, and 2 marketing conferences every 6 months.'
    },

    {
        title: 'Silver Membership Benefits',
        description: 'The benefits of this level include 5 free training sessions per month, 4 exhibition presentations per year, access to all conferences held by the Chamber of Commerce, and the right to participate by proposing new opportunities for the team.'
    },

    {
        title: 'Gold Membership Benefits',
        description: 'The benefits of this level include access to all Chamber of Commerce training courses, exhibition presentations, access to all conferences, and membership in the board, providing VIP access to all our events and opportunities.'
    }
]

const getString = window.location.search;
const myInfo = new URLSearchParams(getString);

console.log(getString);
console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('title'));
console.log(myInfo.get('email'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('organization'));
console.log(myInfo.get('Membership'));
console.log(myInfo.get('timestamp'));

const resultsContainer = document.querySelector("#results");

if (resultsContainer) {
    resultsContainer.innerHTML = `
        <p>Thank you for your interest in joining our Chamber of Commerce. We are processing your application. We will contact you within the next two business days with more information.</p>
        <p>Application submitted by ${myInfo.get('first')} ${myInfo.get('last')}, with organizational title ${myInfo.get('title')}, email address ${myInfo.get('email')}, and phone number ${myInfo.get('phone')}.</p>
        <p>Company name ${myInfo.get('organization')} applying for ${myInfo.get('Membership')}.</p>
        <p>Application submitted at ${myInfo.get('timestamp')}.</p>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString(); 
    }
});

const membershipDetails = document.querySelector("#membership-details");

function displayMembershipDetails(index) {
    const item = membership[index];
    membershipDetails.innerHTML = `
        <button id="closeModal">✕</button>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
    `;
    membershipDetails.showModal();
    
    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        membershipDetails.close();
    });
}

document.querySelectorAll(".learn-more").forEach((button, index) => {
    button.addEventListener("click", () => {
        displayMembershipDetails(index);
    });
});