// ===============================
// modules/animations.js
// ===============================
export function initAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);

    document
        .querySelectorAll('.animate-fade-in-up')
        .forEach(el => observer.observe(el));
}
