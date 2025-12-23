import { scenarios } from './data/scenarios.js';

class AudioController {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.muted = false;

        // SFX colors/notes
        this.notes = {
            party: [523.25, 659.25, 783.99], // C5, E5, G5
            tense: [110.00, 116.54, 123.47], // A2, Bb2, B2 (Dissonant)
            adventure: [392.00, 493.88, 587.33], // G4, B4, D5
            sad: [261.63, 311.13, 392.00], // C4, Eb4, G4 (Minor)
            romantic: [349.23, 440.00, 523.25] // F4, A4, C5
        };
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
        this.playMelody('adventure');
    }

    stop() {
        if (this.oscillator) {
            this.oscillator.stop();
            this.oscillator = null;
        }
        this.isPlaying = false;
    }

    playMelody(type) {
        if (!this.isPlaying || this.muted) return;
        if (this.oscillator) this.oscillator.stop();

        this.oscillator = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        const typeMap = {
            party: 'triangle',
            tense: 'sawtooth',
            adventure: 'sine',
            sad: 'sine',
            romantic: 'triangle'
        };

        this.oscillator.type = typeMap[type] || 'sine';
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.5);

        const sequence = this.notes[type] || this.notes.adventure;
        let time = this.ctx.currentTime;

        sequence.forEach((freq, i) => {
            this.oscillator.frequency.setValueAtTime(freq, time + i * 0.5);
        });

        this.oscillator.start();

        // Loop melody
        this.oscillator.onended = () => {
            if (this.isPlaying) this.playMelody(type);
        };
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
        this.confettiCanvas = document.getElementById('confetti-canvas');
        this.audioToggle = document.getElementById('audio-toggle');

        this.audio = new AudioController();
        this.currentScenarioId = 'start';
        this.history = [];

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

        if (scenario.confetti) this.triggerConfetti();

        // Audio update
        if (this.audio.isPlaying) {
            this.audio.playMelody(scenario.theme || 'adventure');
        }

        // Dual Image Display (Photo + Illustration)
        this.imageContainer.innerHTML = '';
        this.imageContainer.className = 'image-display-container';

        if (scenario.carousel) {
            const carouselSlot = this.createCarouselSlot(scenario.carousel, "Aventura 🎮");
            this.imageContainer.appendChild(carouselSlot);

            if (scenario.image) {
                const realitySlot = this.createImageSlot(scenario.image, "Realidad ✨");
                this.imageContainer.appendChild(realitySlot);
            }
            this.imageContainer.style.display = 'flex';
        } else if (scenario.image || scenario.illustration) {
            if (scenario.image) {
                const slot = this.createImageSlot(scenario.image, "Realidad ✨");
                this.imageContainer.appendChild(slot);
            }
            if (scenario.illustration) {
                const slot = this.createImageSlot(scenario.illustration, "Aventura 🎮");
                this.imageContainer.appendChild(slot);
            }
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

    createImageSlot(src, label) {
        const slot = document.createElement('div');
        slot.className = 'image-slot';
        const img = document.createElement('img');
        img.src = src;
        img.onerror = () => {
            img.src = 'https://via.placeholder.com/400x250?text=Cargando+Imagen...';
        };
        const lbl = document.createElement('div');
        lbl.className = 'image-label';
        lbl.textContent = label;
        slot.appendChild(img);
        slot.appendChild(lbl);
        return slot;
    }

    createCarouselSlot(images, label) {
        const container = document.createElement('div');
        container.className = 'carousel-container';

        const track = document.createElement('div');
        track.className = 'carousel-track';

        images.forEach(src => {
            const img = document.createElement('img');
            img.className = 'carousel-image';
            img.src = src;
            img.onerror = () => {
                img.src = `https://via.placeholder.com/400x250?text=${src.split('/').pop()}`;
            };
            track.appendChild(img);
        });

        const lbl = document.createElement('div');
        lbl.className = 'image-label';
        lbl.textContent = label;

        container.appendChild(track);
        container.appendChild(lbl);

        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 3000);

        return container;
    }

    triggerConfetti() {
        const ctx = this.confettiCanvas.getContext('2d');
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
        const pieces = [];
        for (let i = 0; i < 150; i++) {
            pieces.push({
                x: Math.random() * this.confettiCanvas.width,
                y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 10 + 5,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
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
            if (stillFalling) requestAnimationFrame(update);
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
