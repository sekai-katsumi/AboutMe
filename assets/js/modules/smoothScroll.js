// ===============================
// modules/smoothScroll.js
// ===============================
export function initSmoothScroll() {
    const mobileMenu = document.getElementById('mobile-menu');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href.length <= 1) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu?.classList.add('hidden');
        }
        });
    });
}
