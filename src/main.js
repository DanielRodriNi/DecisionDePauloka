import { scenarios } from './data/scenarios.js';

class AudioController {
    constructor() {
        this.audio = new Audio('assets/AitanaSUPERESTRELLA.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.3;
        this.isPlaying = false;
        this.muted = false;

        // Click sound context
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.start();
        }
        return this.isPlaying;
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.audio.play().catch(err => console.log('Audio play failed:', err));
    }

    stop() {
        this.audio.pause();
        this.isPlaying = false;
    }

    playClick() {
        if (this.muted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }
}

class Game {
    constructor() {
        this.titleElement = document.getElementById('scenario-title');
        this.descriptionElement = document.getElementById('scenario-description');
        this.optionsContainer = document.getElementById('options-container');
        this.imageContainer = document.getElementById('image-container');
        this.progressBar = document.getElementById('progress-bar');
        this.particlesContainer = document.getElementById('particles-container');
        this.lightingOverlay = document.getElementById('lighting-overlay');
        this.audioToggle = document.getElementById('audio-toggle');

        this.audio = new AudioController();
        this.currentScenarioId = 'start';
        this.history = [];
        this.minigameActive = false;
        this.score = 0;
        this.init();
    }

    init() {
        this.createParticles();
        this.renderScenario(this.currentScenarioId);

        this.audioToggle.onclick = () => {
            const playing = this.audio.toggle();
            this.audioToggle.textContent = playing ? '🔊' : '🎵';
        };
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
        if (!scenario) return;

        const card = document.getElementById('game-card');
        const body = document.body;

        // Theme switching
        body.className = scenario.theme ? `theme-${scenario.theme}` : 'theme-adventure';

        // Reset card anim
        card.style.animation = 'none';
        card.offsetHeight;
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

        if (scenario.lighting) {
            this.triggerLightingEffect(true);
        } else {
            this.triggerLightingEffect(false);
        }

        // Audio update
        if (this.audio.isPlaying) {
            this.audio.playMelody(scenario.theme || 'adventure');
        }

        // Dual Image Display (Photo + Illustration)
        this.imageContainer.innerHTML = '';
        this.imageContainer.className = 'image-display-container';

        if (scenario.minigame) {
            this.startMinigame();
        } else if (scenario.carousel) {
            const carouselSlot = this.createCarouselSlot(scenario.carousel);
            this.imageContainer.appendChild(carouselSlot);
            this.imageContainer.style.display = 'flex';
        } else if (scenario.image) {
            const slot = this.createImageSlot(scenario.image);
            this.imageContainer.appendChild(slot);
            this.imageContainer.style.display = 'flex';
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
            button.onclick = () => {
                this.audio.playClick();
                this.handleChoice(option.next);
            };
            this.optionsContainer.appendChild(button);
        });

        this.updateProgress();
    }

    createImageSlot(src) {
        const slot = document.createElement('div');
        slot.className = 'image-slot';
        const img = document.createElement('img');
        img.src = src;
        img.onerror = () => {
            img.src = 'https://via.placeholder.com/800x450?text=Cargando+Imagen...';
        };
        slot.appendChild(img);
        return slot;
    }

    createCarouselSlot(images) {
        const container = document.createElement('div');
        container.className = 'carousel-container';

        const track = document.createElement('div');
        track.className = 'carousel-track';

        images.forEach(src => {
            const img = document.createElement('img');
            img.className = 'carousel-image';
            img.src = src;
            img.onerror = () => {
                img.src = `https://via.placeholder.com/800x450?text=${src.split('/').pop()}`;
            };
            track.appendChild(img);
        });

        container.appendChild(track);

        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 3000);

        return container;
    }

    startMinigame() {
        this.minigameActive = true;
        this.score = 0;
        this.optionsContainer.innerHTML = '';
        this.imageContainer.innerHTML = '<div class="game-area" id="game-area" style="touch-action: none;"><div class="basket" id="basket">🎒</div><div class="score-display">Pomeranias: <span id="current-score">0</span>/5</div></div>';

        const gameArea = document.getElementById('game-area');
        const basket = document.getElementById('basket');
        const scoreSpan = document.getElementById('current-score');

        const moveHandler = (e) => {
            if (!this.minigameActive) return;
            const cardRect = gameArea.getBoundingClientRect();
            let x = (e.clientX || e.touches?.[0].clientX) - cardRect.left;
            x = Math.max(25, Math.min(cardRect.width - 25, x));
            basket.style.left = `${x}px`;
        };

        gameArea.addEventListener('mousemove', moveHandler);
        gameArea.addEventListener('touchstart', moveHandler);

        const spawnDog = () => {
            if (!this.minigameActive) return;
            const dog = document.createElement('div');
            dog.className = 'falling-dog';
            const img = document.createElement('img');
            img.src = 'assets/CocoEmoji.png';
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.objectFit = 'contain';
            dog.appendChild(img);
            dog.style.left = `${Math.random() * (gameArea.clientWidth - 30) + 15}px`;
            gameArea.appendChild(dog);

            let pos = 0;
            const fallInterval = setInterval(() => {
                if (!this.minigameActive) {
                    clearInterval(fallInterval);
                    dog.remove();
                    return;
                }
                pos += 3;
                dog.style.top = `${pos}px`;

                const dogRect = dog.getBoundingClientRect();
                const basketRect = basket.getBoundingClientRect();

                if (dogRect.bottom > basketRect.top &&
                    dogRect.right > basketRect.left &&
                    dogRect.left < basketRect.right) {
                    this.score++;
                    scoreSpan.textContent = this.score;
                    this.audio.playClick();
                    dog.remove();
                    clearInterval(fallInterval);

                    if (this.score >= 5) {
                        this.endMinigame(true);
                    }
                } else if (pos > gameArea.clientHeight) {
                    dog.remove();
                    clearInterval(fallInterval);
                }
            }, 20);

            setTimeout(() => spawnDog(), 1000);
        };

        spawnDog();
    }

    endMinigame(success) {
        this.minigameActive = false;
        if (success) {
            this.handleChoice('main_choice');
        }
    }

    triggerLightingEffect(active) {
        if (active) {
            document.body.classList.add('lighting-active');
        } else {
            document.body.classList.remove('lighting-active');
        }
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
            this.audio.playClick();
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
