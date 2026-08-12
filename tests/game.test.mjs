import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function makeClassList() {
    const values = new Set();

    return {
        add(...names) {
            names.forEach((name) => values.add(name));
        },
        remove(...names) {
            names.forEach((name) => values.delete(name));
        },
        contains(name) {
            return values.has(name);
        },
        toggle(name, force) {
            const enabled = force === undefined ? !values.has(name) : force;

            if (enabled) {
                values.add(name);
            } else {
                values.delete(name);
            }

            return enabled;
        }
    };
}

function makeElement(extra = {}) {
    const listeners = {};
    const attributes = new Map();

    return Object.assign({
        textContent: "",
        value: "",
        checked: false,
        disabled: false,
        hidden: false,
        dataset: {},
        style: {},
        classList: makeClassList(),
        addEventListener(type, listener) {
            listeners[type] = listener;
        },
        dispatch(type) {
            listeners[type]?.({ target: this });
        },
        setAttribute(name, value) {
            attributes.set(name, String(value));
        },
        getAttribute(name) {
            return attributes.get(name) ?? null;
        },
        removeAttribute(name) {
            attributes.delete(name);
        },
        getBoundingClientRect() {
            return { left: 0, top: 0, width: 100, height: 100 };
        }
    }, extra);
}

function createGame() {
    const html = readFileSync(
        new URL("../src/index.html", import.meta.url),
        "utf8"
    );

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
    assert.ok(scriptMatch, "src/index.html deve conter o JavaScript inline");

    const cells = Array.from({ length: 9 }, (_, index) => makeElement({
        dataset: { index: String(index) },
        getBoundingClientRect() {
            return {
                left: (index % 3) * 108,
                top: Math.floor(index / 3) * 108,
                width: 100,
                height: 100
            };
        }
    }));

    const elements = {
        status: makeElement(),
        scoreX: makeElement(),
        scoreO: makeElement(),
        roundDisplay: makeElement(),
        modeSelect: makeElement({ value: "pvp" }),
        formatSelect: makeElement({ value: "single" }),
        timerSelect: makeElement({ value: "off" }),
        difficultySelect: makeElement({ value: "easy" }),
        difficultyField: makeElement({ hidden: true }),
        soundToggle: makeElement({ checked: true }),
        motionToggle: makeElement({ checked: false }),
        playerOLabel: makeElement(),
        restartButton: makeElement(),
        board: makeElement(),
        winLine: makeElement(),
        timerPanel: makeElement({ hidden: true }),
        timerValue: makeElement(),
        timerBar: makeElement()
    };

    const container = makeElement();
    const boardContainer = makeElement({
        getBoundingClientRect() {
            return { left: 0, top: 0, width: 316, height: 316 };
        }
    });

    const canvasContext = {
        clearRect() {},
        save() {},
        translate() {},
        rotate() {},
        fillRect() {},
        restore() {},
        fillStyle: ""
    };

    const confettiCanvas = makeElement({
        width: 800,
        height: 600,
        getContext() {
            return canvasContext;
        }
    });

    elements.confettiCanvas = confettiCanvas;

    const documentMock = {
        querySelectorAll(selector) {
            return selector === ".cell" ? cells : [];
        },
        querySelector(selector) {
            if (selector === ".container") {
                return container;
            }

            if (selector === ".board-container") {
                return boardContainer;
            }

            return null;
        },
        getElementById(id) {
            return elements[id] ?? null;
        }
    };

    let oscillatorCount = 0;

    function audioParam() {
        return {
            value: 0,
            setValueAtTime() {},
            exponentialRampToValueAtTime() {}
        };
    }

    class AudioContextMock {
        constructor() {
            this.currentTime = 0;
            this.state = "running";
            this.destination = {};
        }

        resume() {
            this.state = "running";
        }

        createOscillator() {
            oscillatorCount++;

            return {
                type: "sine",
                frequency: audioParam(),
                connect() {},
                start() {},
                stop() {}
            };
        }

        createGain() {
            return {
                gain: audioParam(),
                connect() {}
            };
        }
    }

    const windowMock = {
        AudioContext: AudioContextMock,
        webkitAudioContext: AudioContextMock,
        innerWidth: 800,
        innerHeight: 600,
        addEventListener() {}
    };

    let nextTimerId = 0;
    const timers = new Map();

    function setTimeoutMock(callback, delay) {
        const id = ++nextTimerId;
        timers.set(id, { callback, delay, active: true });
        return id;
    }

    function clearTimeoutMock(id) {
        const timer = timers.get(id);

        if (timer) {
            timer.active = false;
        }
    }

    function runTimer(delay) {
        const entry = [...timers.entries()].find(
            ([, timer]) => timer.active && timer.delay === delay
        );

        assert.ok(entry, "temporizador de " + delay + "ms deve existir");
        entry[1].active = false;
        entry[1].callback();
    }

    function runTicks(amount) {
        for (let index = 0; index < amount; index++) {
            runTimer(1000);
        }
    }

    function activeTimers(delay) {
        return [...timers.values()].filter(
            (timer) => timer.active && (delay === undefined || timer.delay === delay)
        ).length;
    }

    let nextAnimationId = 0;
    const animations = new Map();

    function requestAnimationFrameMock(callback) {
        const id = ++nextAnimationId;
        animations.set(id, callback);
        return id;
    }

    function cancelAnimationFrameMock(id) {
        animations.delete(id);
    }

    const mathMock = Object.create(Math);
    mathMock.random = () => 0.73;

    new Function(
        "document",
        "window",
        "setTimeout",
        "clearTimeout",
        "requestAnimationFrame",
        "cancelAnimationFrame",
        "Math",
        scriptMatch[1]
    )(
        documentMock,
        windowMock,
        setTimeoutMock,
        clearTimeoutMock,
        requestAnimationFrameMock,
        cancelAnimationFrameMock,
        mathMock
    );

    return {
        html,
        script: scriptMatch[1],
        cells,
        elements,
        container,
        animations,
        runTimer,
        runTicks,
        activeTimers,
        oscillatorCount: () => oscillatorCount
    };
}

test("CDU v1.2 — regressão funcional completa", () => {
    const game = createGame();
    const {
        html,
        script,
        cells,
        elements,
        container,
        animations,
        runTimer,
        runTicks,
        activeTimers,
        oscillatorCount
    } = game;

    let checks = 0;

    function check(condition, message) {
        assert.ok(condition, message);
        checks++;
    }

    function click(index) {
        cells[index].dispatch("click");
    }

    function change(element, value) {
        element.value = value;
        element.dispatch("change");
    }

    function restart() {
        elements.restartButton.dispatch("click");
    }

    function boardValues() {
        return cells.map((cell) => cell.textContent);
    }

    function winX() {
        [0, 3, 1, 4, 2].forEach(click);
    }

    function winO() {
        [0, 3, 1, 4, 8, 5].forEach(click);
    }

    function draw() {
        [0, 1, 2, 4, 3, 6, 7, 8, 5].forEach(click);
    }

    check(elements.status.textContent === "Vez do Jogador X", "estado inicial");
    check(elements.roundDisplay.textContent === "1/1", "rodada inicial");
    check(elements.timerPanel.hidden, "cronômetro desligado por padrão");
    check(elements.difficultyField.hidden, "dificuldade oculta no PVP");
    check(boardValues().every((value) => value === ""), "tabuleiro inicial vazio");

    click(0);
    click(0);
    check(
        cells[0].textContent === "X" &&
        elements.status.textContent === "Vez do Jogador O",
        "célula ocupada protegida"
    );

    restart();
    winX();
    check(String(elements.scoreX.textContent) === "1", "placar de vitória");
    check(elements.winLine.classList.contains("visible"), "linha de vitória");
    check(elements.status.textContent.includes("venceu a rodada"), "mensagem de vitória");

    const boardAfterWin = JSON.stringify(boardValues());
    click(5);
    check(JSON.stringify(boardValues()) === boardAfterWin, "bloqueio pós-vitória");

    restart();
    draw();
    check(elements.status.textContent === "Rodada Empatada!", "mensagem de empate");
    check(cells.every((cell) => cell.disabled), "bloqueio pós-empate");

    change(elements.modeSelect, "cpu");
    check(
        !elements.difficultyField.hidden &&
        elements.playerOLabel.textContent === "COMPUTADOR",
        "controles da CPU"
    );

    click(0);
    const boardDuringCpu = JSON.stringify(boardValues());
    click(1);
    check(JSON.stringify(boardValues()) === boardDuringCpu, "bloqueio durante CPU");

    runTimer(400);
    check(boardValues().filter((value) => value === "O").length === 1, "jogada da CPU");
    check(elements.status.textContent === "Vez do Jogador X", "retorno do turno após CPU");

    restart();
    click(0);
    restart();
    check(activeTimers(400) === 0, "reinício cancela timer da CPU");
    check(boardValues().every((value) => value === ""), "reinício limpa tabuleiro");

    change(elements.modeSelect, "pvp");
    change(elements.formatSelect, "bo3");
    winX();
    runTimer(2000);
    check(
        elements.roundDisplay.textContent === "2/3" &&
        String(elements.scoreX.textContent) === "1",
        "MD3 avança e preserva placar"
    );

    winO();
    runTimer(2000);
    check(
        elements.roundDisplay.textContent === "3/3" &&
        String(elements.scoreO.textContent) === "1",
        "MD3 chega à terceira rodada"
    );

    draw();
    runTimer(2000);
    check(elements.roundDisplay.textContent === "3/3", "empate em 3/3 repete rodada");
    check(boardValues().every((value) => value === ""), "empate em 3/3 limpa tabuleiro");

    change(elements.formatSelect, "single");
    change(elements.timerSelect, "10");
    check(
        !elements.timerPanel.hidden &&
        elements.timerValue.textContent === "10s",
        "cronômetro opcional inicia"
    );

    runTicks(10);
    check(
        elements.status.textContent.includes("Tempo do Jogador X esgotado."),
        "mensagem de tempo esgotado"
    );
    check(elements.status.textContent.includes("Vez do Jogador O"), "tempo passa a vez");
    check(boardValues().every((value) => value === ""), "tempo não altera tabuleiro");
    check(activeTimers(1000) === 1, "cronômetro reinicia no próximo turno");

    change(elements.modeSelect, "cpu");
    runTicks(10);
    check(activeTimers(400) === 1, "tempo do humano aciona CPU");
    runTimer(400);
    check(
        boardValues().filter((value) => value === "O").length === 1,
        "CPU joga após tempo esgotado"
    );

    change(elements.timerSelect, "off");
    change(elements.difficultySelect, "medium");
    click(0);
    runTimer(400);
    check(cells[4].textContent === "O", "CPU média prioriza centro");

    click(1);
    runTimer(400);
    check(cells[2].textContent === "O", "CPU média bloqueia vitória");

    change(elements.difficultySelect, "hard");
    click(0);
    runTimer(400);
    check(
        boardValues().filter((value) => value === "O").length === 1,
        "CPU difícil executa jogada"
    );
    check(script.includes("function minimax("), "algoritmo Minimax presente");

    const oscillatorsBeforeMute = oscillatorCount();
    elements.soundToggle.checked = false;
    elements.soundToggle.dispatch("change");
    restart();
    click(0);
    check(oscillatorCount() === oscillatorsBeforeMute, "som pode ser desativado");

    elements.soundToggle.checked = true;
    elements.soundToggle.dispatch("change");
    check(oscillatorCount() > oscillatorsBeforeMute, "som pode ser reativado");

    elements.motionToggle.checked = true;
    elements.motionToggle.dispatch("change");
    check(container.classList.contains("reduce-motion"), "movimento reduzido");

    change(elements.modeSelect, "pvp");
    winX();
    check(animations.size === 0, "movimento reduzido evita confetes");

    check((html.match(/role="gridcell"/g) ?? []).length === 9, "nove células acessíveis");
    check(html.includes('aria-live="polite"'), "status anunciado");
    check(
        /playTone\(330,\s*0\.41,\s*"triangle",\s*0\.12,\s*165\)/.test(script),
        "som descendente de empate"
    );

    assert.equal(checks, 40, "o roteiro deve manter exatamente 40 verificações");
});
