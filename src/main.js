import { scenarios } from './data/scenarios.js';

class Game {
    constructor() {
        this.titleElement = document.getElementById('scenario-title');
        this.descriptionElement = document.getElementById('scenario-description');
        this.optionsContainer = document.getElementById('options-container');
        this.imageContainer = document.getElementById('image-container');
        this.progressBar = document.getElementById('progress-bar');

        this.currentScenarioId = 'start';
        this.history = [];

        this.init();
    }

    init() {
        this.renderScenario(this.currentScenarioId);
    }

    renderScenario(id) {
        const scenario = scenarios[id];
        if (!scenario) {
            console.error(`Scenario ${id} not found`);
            return;
        }

        // Apply transition animation
        const card = document.getElementById('game-card');
        card.style.animation = 'none';
        card.offsetHeight; // force reflow
        card.style.animation = 'cardEntry 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';

        // Handle shake effect
        if (scenario.shake) {
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }

        // Handle Image
        this.imageContainer.innerHTML = '';
        if (scenario.image) {
            const img = document.createElement('img');
            img.src = scenario.image;
            img.alt = scenario.title;
            img.className = 'scenario-image';
            this.imageContainer.appendChild(img);
            this.imageContainer.style.display = 'block';
        } else {
            this.imageContainer.style.display = 'none';
        }

        this.titleElement.textContent = scenario.title;
        this.descriptionElement.textContent = scenario.description;

        this.optionsContainer.innerHTML = '';
        scenario.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.onclick = () => this.handleChoice(option.next);
            this.optionsContainer.appendChild(button);
        });

        this.updateProgress();
    }

    handleChoice(nextId) {
        this.history.push(this.currentScenarioId);
        this.currentScenarioId = nextId;

        // If the scenario exists, render it. If not (placeholder), show a temporary message.
        if (scenarios[nextId]) {
            this.renderScenario(nextId);
        } else {
            this.showEnding(nextId);
        }
    }

    showEnding(id) {
        this.titleElement.textContent = "Continuará...";
        this.descriptionElement.textContent = `Has llegado a un punto que todavía no hemos escrito: "${id}". ¡Pronto habrá más aventuras!`;
        this.optionsContainer.innerHTML = '';

        const resetBtn = document.createElement('button');
        resetBtn.className = 'option-btn';
        resetBtn.textContent = "Volver al inicio";
        resetBtn.style.gridColumn = "1 / -1";
        resetBtn.onclick = () => {
            this.currentScenarioId = 'start';
            this.history = [];
            this.renderScenario('start');
        };
        this.optionsContainer.appendChild(resetBtn);
    }

    updateProgress() {
        // Simple progress calculation based on nodes visited
        const progress = Math.min((this.history.length / 5) * 100, 100);
        this.progressBar.style.width = `${progress}%`;
    }
}

// Initialize game on Load
window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
