// ===============================
// modules/menu.js
// ===============================
export function initMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    if (!mobileMenuBtn || !mobileMenu) return;

    // メニュー開閉切替
    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
    }

    // メニューを閉じる
    function closeMenu() {
        mobileMenu.classList.add('hidden');
    }

    // ハンバーガーボタンクリックで開閉
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 外クリック判定を防ぐ
        toggleMenu();
    });

    // モバイルテーマ切替ボタンクリックでメニューを閉じる
    mobileThemeToggle?.addEventListener('click', () => {
        closeMenu();
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        // メニュー自体またはボタンをクリックした場合は無視
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            closeMenu();
        }
    });

    // メニュー内クリック時は閉じないように
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
