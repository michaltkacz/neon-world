import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.js';

const container = document.getElementById("container");
const stats = new Stats();
container.appendChild(stats.dom);

updateStatistics();

function updateStatistics() {
    requestAnimationFrame(updateStatistics);
    stats.update();
}