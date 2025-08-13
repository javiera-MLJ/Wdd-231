import { setupNavigation } from './navigation.mjs';
import { updateCurrentYear, updateLastModified } from './utils.mjs';
import { initFadeInAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initFadeInAnimation(0.2); 
    setupNavigation();
    updateCurrentYear();
    updateLastModified();
});