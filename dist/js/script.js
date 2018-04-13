const accordionToggles = document.querySelectorAll('.toggle');

for (let toggle of accordionToggles) {
    toggle.addEventListener('click', toggleAccordion, false);
}

function toggleAccordion() {
    let opened = this.classList.contains('open');
    for (let toggle of accordionToggles) {
        toggle.classList.remove('open');
        toggle.nextElementSibling.classList.add('visually-hidden');
        toggle.querySelector('.icon').textContent = '+';
    }
    if (!opened) {
        this.classList.add('open');
        this.nextElementSibling.classList.remove('visually-hidden');
        this.querySelector('.icon').textContent = '–';
    }
}