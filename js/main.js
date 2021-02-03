// --- PROGRAM ENTRY ---
import { SceneManager } from './sceneManager.js';

const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);


// All event bindings in this function
bindEventListeners();

// Update and render scene
updateAndRenderScene();


// --- Functions ---
function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function updateAndRenderScene() {
    requestAnimationFrame(updateAndRenderScene);
    sceneManager.update();
    sceneManager.render();
}

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
}