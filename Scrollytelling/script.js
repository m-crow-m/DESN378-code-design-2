document.addEventListener('DOMContentLoaded', () => {
    const scrollyContainer = document.getElementById('scrolly-container');
    const viewportContent = document.getElementById('viewport-content');
    const tutorialTextContainer = document.getElementById('tutorial-text-container');
    const controlPanel = document.getElementById('control-panel');
    const consoleOutput = document.getElementById('console-output');
    const consoleTyping = document.getElementById('console-typing');
    const readoutNoise = document.querySelector('#readout-noise .value');
    const readoutFreq = document.querySelector('#readout-frequency .value');
    const readoutFocus = document.querySelector('#readout-focus .value');
    const freqMeter = document.getElementById('freq-meter');
    const ctrlKnob = document.getElementById('ctrl-knob');
    const currentStateDesc = document.getElementById('current-state-desc');

    const toggleFocus = document.getElementById('toggle-focus');
    const toggleJitter = document.getElementById('toggle-jitter');
    const toggleGrid = document.getElementById('toggle-grid');
    const toggleNoise = document.getElementById('toggle-noise');

    let scrollProgress = 0;
    let frequency = 0;
    const originalTexts = new Map();

    // Store original texts for scrambling
    const textElements = tutorialTextContainer.querySelectorAll('h1, h2, h3, h4, p, div.code-snippet, li');
    textElements.forEach(el => {
        originalTexts.set(el, el.innerText);
    });

    // --- Scramble Function ---
    const chars = 'ABCDEFGHIJKLMN0123456789!@#$%^&*()_+{}[]|;:,.<>?';
    function scramble(text, intensity) {
        if (intensity <= 0) return text;
        return text.split('').map(char => {
            if (char === ' ' || char === '\n' || Math.random() > intensity) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
    }

    // --- Console Utilities ---
    function logToConsole(message, type = 'system') {
        const p = document.createElement('p');
        p.innerText = message;
        if (type === 'error') p.style.color = '#D61D00';
        consoleOutput.appendChild(p);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // --- Main Update Loop ---
    function update(e) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = window.scrollY / totalHeight;

        // Map scroll to frequency (0-100)
        frequency = scrollProgress * 100;

        // Apply visual chaos
        applyChaos();
        updateReadouts();
        updateConsole();
        updateControlPanel();
    }

    function applyChaos() {
        // 1. Text Scrambling (starts at 20% scroll)
        const scrambleIntensity = Math.max(0, (scrollProgress - 0.15) * 1.5);
        textElements.forEach(el => {
            el.innerText = scramble(originalTexts.get(el), scrambleIntensity);
        });

        // 2. Blur (starts at 10% scroll, peaks at 8px if not toggled)
        const blurIntensity = toggleFocus.checked ? 0 : Math.max(0, (scrollProgress - 0.1) * 15);
        document.documentElement.style.setProperty('--focus-blur', `${blurIntensity}px`);

        // 3. Jitter (starts at 30% scroll)
        const jitterValue = toggleJitter.checked ? 0 : Math.max(0, (scrollProgress - 0.3) * 50);
        document.documentElement.style.setProperty('--freq-value', jitterValue);

        const viewport = document.getElementById('viewport-content');
        if (jitterValue > 0) {
            viewport.classList.add('frequency-jitter');
        } else {
            viewport.classList.remove('frequency-jitter');
        }

        // 4. Noise
        const noiseOpacity = toggleNoise.checked ? 0.05 : 0.05 + scrollProgress * 0.3;
        document.getElementById('noise-overlay').style.opacity = noiseOpacity;
    }

    function updateReadouts() {
        readoutNoise.innerText = scrollProgress.toFixed(2);
        readoutFreq.innerText = (scrollProgress * 10).toFixed(1);
        readoutFocus.innerText = toggleFocus.checked ? 'SHARP' : (scrollProgress < 0.2 ? 'SHARP' : 'BLURRY');

        freqMeter.style.height = `${scrollProgress * 100}%`;
        ctrlKnob.style.transform = `rotate(${scrollProgress * 360}deg)`;

        // Show readouts only after some scroll (per Frame 03)
        const header = document.querySelector('.fixed-header');
        if (scrollProgress > 0.3) {
            header.style.opacity = 1;
        } else {
            header.style.opacity = 0;
        }
    }

    let lastLoggedScroll = 0;
    function updateConsole() {
        // Initial typing (0-10% scroll)
        const tutorialCode = 'console.log("Hello, world!");';
        if (scrollProgress < 0.15) {
            const charCount = Math.floor((scrollProgress / 0.15) * tutorialCode.length);
            consoleTyping.innerText = tutorialCode.substring(0, charCount);
        } else {
            consoleTyping.innerText = tutorialCode;
        }

        // Chaos logs (starting at 40% scroll)
        if (scrollProgress > 0.4 && scrollProgress - lastLoggedScroll > 0.05) {
            const chaosMsgs = [
                "> INTERNAL ERROR: Frequency resonance detected",
                "> WARNING: Signal misalignment in sector 7",
                "> WHAT IS HAPPENING?",
                "> The text... I cannot read it",
                "> 01010111 01001000 01011001",
                "> SYSTEM_FAIL_STACK_OVERFLOW",
                "> RECALIBRATE NOW"
            ];
            logToConsole(chaosMsgs[Math.floor(Math.random() * chaosMsgs.length)], Math.random() > 0.5 ? 'error' : 'system');
            lastLoggedScroll = scrollProgress;
        }
    }

    function updateControlPanel() {
        if (scrollProgress > 0.5) {
            controlPanel.classList.add('show');
            currentStateDesc.innerText = scrollProgress > 0.8 ? "the end" : "the chaos";
        } else {
            controlPanel.classList.remove('show');
        }
    }

    // --- Event Listeners ---
    window.addEventListener('scroll', update);
    [toggleFocus, toggleJitter, toggleGrid, toggleNoise].forEach(t => {
        t.addEventListener('change', applyChaos);
    });

    // Knob drag (overrides scroll frequency for a bit?)
    let isDragging = false;
    ctrlKnob.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        // In this version, we'll let the knob indicate scroll vs direct control
        // But for "User Control", we can offset the scroll-based chaos
    });

    // Init
    update();
    logToConsole("> SYSTEM INITIALIZED");
    logToConsole("> LOADING TUTORIAL...");
});
