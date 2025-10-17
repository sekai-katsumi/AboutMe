// ===============================
// modules/theme.js
// ===============================
import { updateChartTheme } from './chart.js';

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

// アイコン更新
function updateThemeIcons(isDark) {
    const iconClass = isDark ? 'ri-moon-line' : 'ri-sun-line';
    document.querySelectorAll('#theme-toggle i, #mobile-theme-toggle i')
        .forEach(icon => icon.className = `${iconClass} ri-lg`);
}

// 現在のテーマを localStorage に保存
function saveTheme(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// テーマ切替
export function toggleTheme() {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');

    updateThemeIcons(isDark);
    saveTheme(isDark);

    // Twitter 埋め込み更新
    document.querySelectorAll('.twitter-tweet').forEach(tweet => {
        tweet.setAttribute('data-theme', isDark ? 'dark' : 'light');
    });

    // チャート色更新
    updateChartTheme(isDark);
}

// ページロード時に localStorage からテーマを復元
export function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    if (isDark) html.classList.add('dark');
    else html.classList.remove('dark');

    updateThemeIcons(isDark);
    updateChartTheme(isDark);

    // ボタンクリックにイベント登録
    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);
}
