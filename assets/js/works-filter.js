// works-filter.js
document.addEventListener('DOMContentLoaded', function () {
    // HTMLに合わせて修正
    const filterButtons = document.querySelectorAll('#category-filters .button');
    const workCards = document.querySelectorAll('#works-grid > div[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // ボタンのアクティブ状態切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // カードの表示制御
            workCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
