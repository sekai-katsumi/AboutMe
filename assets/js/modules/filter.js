// ===============================
// modules/filter.js
// ===============================
export function initFilter() {
    const worksGrid = document.getElementById('works-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const works = worksGrid?.querySelectorAll('[data-category]');
    if (!worksGrid || !filterButtons.length) return;

    function filterWorks(category) {
        works.forEach(work => {
        work.classList.remove('animate-fade-in-up', 'visible');
        if (category === 'all' || work.dataset.category === category) {
            work.style.display = '';
            requestAnimationFrame(() => {
            work.classList.add('animate-fade-in-up');
            setTimeout(() => work.classList.add('visible'), 50);
            });
        } else {
            work.style.display = 'none';
        }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
        filterButtons.forEach(btn =>
            btn.classList.remove('active', 'ring-2', 'ring-offset-2', 'ring-blue-500', 'ring-purple-500', 'ring-orange-500', 'ring-gray-400')
        );

        const category = this.dataset.category;
        const ringColorClass = {
            planning: 'ring-blue-500',
            design: 'ring-purple-500',
            app: 'ring-orange-500',
            all: 'ring-gray-400'
        }[category] || '';

        this.classList.add('active', 'ring-2', 'ring-offset-2', ringColorClass);
        filterWorks(category);
        });
    });
}
