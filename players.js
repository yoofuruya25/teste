let lastScroll = 0;
const menu = document.getElementById("topMenu");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        menu.classList.add("hidden");   // some ao descer
    } else {
        menu.classList.remove("hidden"); // aparece ao subir
    }

    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('.fade-section');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.85; // quando a seção está 85% visível
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
