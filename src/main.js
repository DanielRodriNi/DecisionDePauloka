import { scenarios } from './data/scenarios.js';

class Game {
    constructor() {
        this.titleElement = document.getElementById('scenario-title');
        this.descriptionElement = document.getElementById('scenario-description');
        this.optionsContainer = document.getElementById('options-container');
        this.imageContainer = document.getElementById('image-container');
        this.progressBar = document.getElementById('progress-bar');
        this.particlesContainer = document.getElementById('particles-container');
        this.confettiCanvas = document.getElementById('confetti-canvas');

        this.currentScenarioId = 'start';
        this.history = [];

        this.init();
    }

    init() {
        this.createParticles();
        this.renderScenario(this.currentScenarioId);
    }

    createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            this.particlesContainer.appendChild(particle);
        }
    }

    renderScenario(id) {
        const scenario = scenarios[id];
        if (!scenario) {
            console.error(`Scenario ${id} not found`);
            return;
        }

        const card = document.getElementById('game-card');
        card.style.animation = 'none';
        card.offsetHeight; // force reflow
        card.style.animation = 'cardEntry 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';

        // Effects
        if (scenario.shake) {
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }

        if (scenario.strobe) {
            card.classList.add('strobe');
        } else {
            card.classList.remove('strobe');
        }

        if (scenario.confetti) {
            this.triggerConfetti();
        }

        // Image
        this.imageContainer.innerHTML = '';
        if (scenario.image) {
            const img = document.createElement('img');
            img.src = scenario.image;
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

    triggerConfetti() {
        const ctx = this.confettiCanvas.getContext('2d');
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548'];

        for (let i = 0; i < 150; i++) {
            pieces.push({
                x: Math.random() * this.confettiCanvas.width,
                y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }

        const update = () => {
            ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
            let stillFalling = false;

            pieces.forEach(p => {
                p.y += p.speed;
                p.rotation += p.rotationSpeed;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();

                if (p.y < this.confettiCanvas.height) stillFalling = true;
            });

            if (stillFalling) {
                requestAnimationFrame(update);
            }
        };

        update();
    }

    handleChoice(nextId) {
        this.history.push(this.currentScenarioId);
        this.currentScenarioId = nextId;
        if (scenarios[nextId]) {
            this.renderScenario(nextId);
        } else {
            this.showEnding(nextId);
        }
    }

    showEnding(id) {
        this.titleElement.textContent = "Final de la aventura";
        this.descriptionElement.textContent = `Has llegado al final: "${id}". ¿Qué te ha parecido el regalo?`;
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
        const progress = Math.min((this.history.length / 5) * 100, 100);
        this.progressBar.style.width = `${progress}%`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
