document.addEventListener("DOMContentLoaded", () => {
    const tutorialTextContainer = document.getElementById("tutorial-text-container");
    const controlPanel = document.getElementById("control-panel");
    const consoleOutput = document.getElementById("console-output");
    const consoleTyping = document.getElementById("console-typing");
    const readoutNoise = document.querySelector("#readout-noise .value");
    const readoutFreq = document.querySelector("#readout-frequency .value");
    const readoutFocus = document.querySelector("#readout-focus .value");
    const freqMeter = document.getElementById("freq-meter");
    const ctrlKnob = document.getElementById("ctrl-knob");
    const currentStateDesc = document.getElementById("current-state-desc");
    const header = document.querySelector(".fixed-header");
    const viewport = document.getElementById("viewport-content");
    const noiseCanvas = document.getElementById("noise-overlay");
    const noiseContext = noiseCanvas.getContext("2d", { alpha: true });
    const gridOverlay = document.getElementById("grid-overlay");

    const toggleFocus = document.getElementById("toggle-focus");
    const toggleJitter = document.getElementById("toggle-jitter");
    const toggleGrid = document.getElementById("toggle-grid");
    const toggleNoise = document.getElementById("toggle-noise");

    const tutorialCode = 'console.log("Hello, world!");';
    const phases = [
        { name: "arrival", threshold: 0, label: "nothing" },
        { name: "instability", threshold: 0.2, label: "a lesson" },
        { name: "breakdown", threshold: 0.45, label: "the interference" },
        { name: "collapse", threshold: 0.7, label: "the collapse" },
        { name: "aftermath", threshold: 0.88, label: "the end" }
    ];

    let scrollProgress = 0;
    let lastLoggedIndex = -1;
    let noiseFrame = 0;
    let noiseWidth = 0;
    let noiseHeight = 0;
    let noiseImage = null;
    let currentPhase = null;
    const originalTexts = new Map();
    const textElements = tutorialTextContainer.querySelectorAll("h1, h2, h3, h4, p, div.code-snippet, li");

    textElements.forEach((element) => {
        originalTexts.set(element, element.textContent);
    });

    const chars = "ABCDEFGHIJKLMN0123456789!@#$%^&*()_+{}[]|;:,.<>?";

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function mapRange(value, start, end) {
        return clamp((value - start) / (end - start), 0, 1);
    }

    function scramble(text, intensity) {
        if (intensity <= 0) return text;
        return text.split("").map((char) => {
            if (char === " " || char === "\n" || Math.random() > intensity) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
    }

    function getPhase(progress) {
        return phases.reduce((active, phase) => {
            return progress >= phase.threshold ? phase : active;
        }, phases[0]);
    }

    function resizeNoise() {
        const scale = 2;
        noiseWidth = Math.max(1, Math.ceil(window.innerWidth / scale));
        noiseHeight = Math.max(1, Math.ceil(window.innerHeight / scale));

        noiseCanvas.width = noiseWidth;
        noiseCanvas.height = noiseHeight;
        noiseCanvas.style.width = `${window.innerWidth}px`;
        noiseCanvas.style.height = `${window.innerHeight}px`;
        noiseImage = noiseContext.createImageData(noiseWidth, noiseHeight);
    }

    function renderNoise() {
        if (!noiseImage) return;

        const data = noiseImage.data;
        for (let i = 0; i < data.length; i += 4) {
            const grain = Math.random() * 255;
            data[i] = grain;
            data[i + 1] = grain;
            data[i + 2] = grain;
            data[i + 3] = 36 + Math.random() * 62;
        }

        noiseContext.putImageData(noiseImage, 0, 0);
        noiseFrame = window.requestAnimationFrame(renderNoise);
    }

    function logToConsole(message, type = "system") {
        const line = document.createElement("p");
        line.textContent = message;
        if (type === "error") {
            line.style.color = "#d61d00";
        } else {
            line.classList.add("system-msg");
        }
        consoleOutput.appendChild(line);

        while (consoleOutput.children.length > 12) {
            consoleOutput.removeChild(consoleOutput.firstChild);
        }

        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function applyPhase(phase) {
        if (currentPhase && currentPhase.name === phase.name) return;

        document.body.classList.remove(
            "phase-arrival",
            "phase-instability",
            "phase-breakdown",
            "phase-collapse",
            "phase-aftermath"
        );
        document.body.classList.add(`phase-${phase.name}`);
        currentPhase = phase;
    }

    function applyChaos() {
        const scrambleIntensity = mapRange(scrollProgress, 0.16, 0.9) * 0.92;
        const blurAmount = toggleFocus.checked ? 0 : mapRange(scrollProgress, 0.12, 0.92) * 9;
        const jitterAmount = toggleJitter.checked ? 0 : mapRange(scrollProgress, 0.28, 0.95) * 22;
        const noiseOpacity = toggleNoise.checked ? 0.02 : 0.06 + mapRange(scrollProgress, 0, 1) * 0.18;

        textElements.forEach((element) => {
            const originalText = originalTexts.get(element) || "";
            element.textContent = scramble(originalText, scrambleIntensity);
        });

        gridOverlay.classList.toggle("active", toggleGrid.checked || scrollProgress > 0.82);
        noiseCanvas.style.opacity = noiseOpacity.toFixed(2);
        document.documentElement.style.setProperty("--focus-blur", `${blurAmount.toFixed(2)}px`);

        const jitterX = jitterAmount > 0 ? (Math.random() - 0.5) * jitterAmount : 0;
        const jitterY = jitterAmount > 0 ? (Math.random() - 0.5) * jitterAmount * 0.6 : 0;
        document.documentElement.style.setProperty("--jitter-x", `${jitterX.toFixed(2)}px`);
        document.documentElement.style.setProperty("--jitter-y", `${jitterY.toFixed(2)}px`);

        viewport.style.transform = scrollProgress > 0.86 ? `scale(${1 - mapRange(scrollProgress, 0.86, 1) * 0.03})` : "scale(1)";
    }

    function updateReadouts() {
        const noiseValue = toggleNoise.checked ? 0.02 : 0.06 + mapRange(scrollProgress, 0, 1) * 0.18;
        const focusValue = toggleFocus.checked ? "SHARP" : (scrollProgress < 0.24 ? "SHARP" : "DRIFT");

        readoutNoise.textContent = noiseValue.toFixed(2);
        readoutFreq.textContent = (scrollProgress * 10).toFixed(1);
        readoutFocus.textContent = focusValue;

        freqMeter.style.height = `${scrollProgress * 100}%`;
        ctrlKnob.style.transform = `rotate(${scrollProgress * 300}deg)`;
        header.style.opacity = scrollProgress > 0.3 ? 1 : 0;
    }

    function updateConsole() {
        if (scrollProgress < 0.15) {
            const charCount = Math.floor(mapRange(scrollProgress, 0, 0.15) * tutorialCode.length);
            consoleTyping.textContent = tutorialCode.slice(0, charCount);
        } else {
            consoleTyping.textContent = tutorialCode;
        }

        const chaosMessages = [
            "> INTERNAL ERROR: Frequency resonance detected",
            "> WARNING: Signal misalignment in sector 7",
            "> WHAT IS HAPPENING?",
            "> The text... I cannot read it",
            "> 01010111 01001000 01011001",
            "> SYSTEM_FAIL_STACK_OVERFLOW",
            "> RECALIBRATE NOW",
            "> SIGNAL LOSS IN TUTORIAL_LAYER",
            "> VIEWPORT MEMORY CORRUPTION"
        ];

        const logIndex = Math.floor(mapRange(scrollProgress, 0.4, 1) * 12);
        if (scrollProgress > 0.4 && logIndex > lastLoggedIndex) {
            logToConsole(
                chaosMessages[Math.floor(Math.random() * chaosMessages.length)],
                Math.random() > 0.45 ? "error" : "system"
            );
            lastLoggedIndex = logIndex;
        }
    }

    function updateControlPanel() {
        controlPanel.classList.toggle("show", scrollProgress > 0.5);
        currentStateDesc.textContent = getPhase(scrollProgress).label;
    }

    function update() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        scrollProgress = clamp(scrollProgress, 0, 1);

        applyPhase(getPhase(scrollProgress));
        applyChaos();
        updateReadouts();
        updateConsole();
        updateControlPanel();
    }

    [toggleFocus, toggleJitter, toggleGrid, toggleNoise].forEach((toggle) => {
        toggle.addEventListener("change", update);
    });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", () => {
        resizeNoise();
        update();
    });

    resizeNoise();
    renderNoise();
    applyPhase(phases[0]);
    update();
    logToConsole("> SYSTEM INITIALIZED");
    logToConsole("> LOADING TUTORIAL...");

    window.addEventListener("beforeunload", () => {
        window.cancelAnimationFrame(noiseFrame);
    });
});
