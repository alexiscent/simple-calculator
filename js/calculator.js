initEvents();

function initEvents() {
    addHighlighting();
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