export function updateCurrentYear() {
    const yearElement = document.getElementById("currentyear");
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

export function updateLastModified() {
    const modifiedElement = document.getElementById("lastModified");
    if (modifiedElement){
    const lastModifiedDate = new Date(document.lastModified);
    const formattedDate = lastModifiedDate.toLocaleString();
    modifiedElement.textContent = `Last Modified: ${formattedDate}`;
    }
}
