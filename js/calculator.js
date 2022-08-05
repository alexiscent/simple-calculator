let prevNumber;
let operation;
let curNumber;

initEvents();

function initEvents() {
    addHighlighting();
    addOperations();
}

function addHighlighting() {
    const buttons = document.querySelectorAll('#body button');
    for (let i = 0; i < buttons.length; i++) {
        const b = buttons[i];
        b.addEventListener('click', toggleHighlight);
        if (!b.classList.contains('toggle')) {
            b.addEventListener('transitionend', toggleHighlight);
        }
    }
}

function toggleHighlight(e) {
    const prevEl = document.querySelector(`.highlighted`);
    if (prevEl && prevEl !== this) {
        prevEl.classList.remove('highlighted');
    }
    if (e.type === 'click') this.classList.toggle('highlighted');
    else this.classList.remove('highlighted');
}

function addOperations() {
    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', clear);
    const equalsBtn = document.getElementById('equals');
    equalsBtn.addEventListener('click', () => display(getResult()));
    const operationBtns = document.querySelectorAll('.toggle');
    for (let i = 0; i < operationBtns.length; i++) {
        operationBtns[i].addEventListener('click', activateOperation);
    }
    for (let i = 0; i < 10; i++) {
        const numBtn = document.getElementById(`num_${i}`);
        numBtn.addEventListener('click', appendNumber);
    }
    const periodBtn = document.getElementById('period');
    periodBtn.addEventListener('click', appendPeriod);
    const backBtn = document.getElementById('back');
    backBtn.addEventListener('click', backspace);
}

function clear() {
    prevNumber = null;
    operation = null;
    curNumber = null;
    display();
}

function display(content) {
    const displayEl = document.getElementById('display');
    if (content) displayEl.innerText = content.toString().slice(0, 19);
    else displayEl.innerText = 0;
    return displayEl.innerText;
}

function getResult() {
    let result;
    prevNumber = +prevNumber;
    if (!prevNumber) prevNumber = 0;
    curNumber = +curNumber;
    if (!curNumber) curNumber = 0;
    if (!operation) {
        if (curNumber) prevNumber = curNumber;
        result = prevNumber;
    } else {
        result = performOperation();
    }
    curNumber = null;
    operation = null;
    if (+result) {
        result = result.toFixed(4);
        result = +result;
    }
    return result;
}

function performOperation() {
    switch (operation) {
        case 'add':
            prevNumber += curNumber;
            break;
        case 'subtract':
            prevNumber -= curNumber;
            break;
        case 'multiply':
            prevNumber *= curNumber;
            break;
        case 'divide':
            if (!curNumber) return 'No';
            prevNumber /= curNumber;
            break;
        default:
            return 'Incorrect operation';
    }
    return prevNumber;
}

function activateOperation() {
    if (curNumber) {
        display(getResult());
        operation = this.id;
    } else if (operation === this.id) {
        operation = null;
    } else {
        operation = this.id;
    }
}

function appendNumber() {
    if (curNumber && !isNaN(+curNumber)) {
        curNumber += this.id.slice(-1);
    } else {
        curNumber = this.id.slice(-1);
    }
    display(curNumber);
}

function appendPeriod() {
    if (!isNaN(+(curNumber + '.'))) {
        curNumber += '.';
    } else if (!curNumber) {
        curNumber = '0.';
    }
    display(curNumber);
}

function backspace() {
    if (!curNumber) return;
    curNumber = curNumber.slice(0, -1)
    display(curNumber);
}