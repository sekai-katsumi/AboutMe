// ===============================
// main.js
// ===============================
// 各モジュールの初期化を統括するエントリーポイント。
// DOMが完全に読み込まれたら各機能を初期化。

import { initMenu } from './modules/menu.js';
import { initTheme } from './modules/theme.js';
import { initAnimations } from './modules/animations.js';
import { initChart } from './modules/chart.js';
import { initFilter } from './modules/filter.js';
import { initSmoothScroll } from './modules/smoothScroll.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();         // カラーモード初期化（localStorage対応）
    initMenu();          // ハンバーガーメニュー初期化
    initAnimations();    // スクロールアニメーション
    initChart();         // チャート初期化
    initFilter();        // Works フィルタ初期化
    initSmoothScroll();  // スムーズスクロール
});
