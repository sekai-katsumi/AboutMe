// ===============================
// modules/menu.js
// ===============================
export function initMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    if (!mobileMenuBtn || !mobileMenu) return;

    // メニューの開閉
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // モバイルメニュー内のリンククリック時に閉じる
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        });
    });

  // テーマ切替ボタンで閉じる処理は theme.js 内で連携
}
