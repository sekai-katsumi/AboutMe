document.addEventListener('DOMContentLoaded', function() {
    /* ========================
        Mobile Menu Toggle
    ========================= */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    /* ========================
        Theme Toggle
    ========================= */
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const html = document.documentElement;

    function updateThemeIcons(isDark) {
        const iconClass = isDark ? 'ri-moon-line' : 'ri-sun-line';
        document.querySelectorAll('#theme-toggle i, #mobile-theme-toggle i')
            .forEach(icon => icon.className = `${iconClass} ri-lg`);
    }

    function toggleTheme() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        updateThemeIcons(isDark);
        
        // Update Twitter embeds theme
        const tweets = document.querySelectorAll('.twitter-tweet');
        tweets.forEach(tweet => {
            tweet.setAttribute('data-theme', isDark ? 'dark' : 'light');
        });
        
        // Update chart colors
        updateChartTheme(isDark);
    }

    // 初期状態のアイコン設定 (ここでは初期テーマをOSの設定などに依存させず、Sunアイコンからスタートと仮定)
    updateThemeIcons(html.classList.contains('dark'));

    themeToggle?.addEventListener('click', toggleTheme);
    mobileThemeToggle?.addEventListener('click', toggleTheme);

    /* ========================
        Scroll Animations
    ========================= */
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);
    document.querySelectorAll('.animate-fade-in-up').forEach(el => observer.observe(el));

    /* ========================
        Skill Radar Chart
    ========================= */
    let myChart;
    const chartDom = document.getElementById('skill-chart');
    
    function updateChartTheme(isDark) {
        if (!myChart) return;
        const textColor = isDark ? '#e5e7eb' : '#1f2937';
        const lineColor = isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(87, 181, 231, 0.3)';
        const areaColor = isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(87, 181, 231, 0.1)';
        const mainColor = isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(87, 181, 231, 1)';

        myChart.setOption({
            radar: {
                axisName: { color: textColor },
                splitLine: { lineStyle: { color: lineColor } }
            },
            series: [{
                data: [{
                    areaStyle: { color: areaColor },
                    lineStyle: { color: mainColor },
                    itemStyle: { color: mainColor }
                }]
            }]
        });
    }

    if(chartDom && typeof echarts !== 'undefined') {
        myChart = echarts.init(chartDom);
        const isDark = html.classList.contains('dark');
        const textColor = isDark ? '#e5e7eb' : '#1f2937';
        const lineColor = isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(87, 181, 231, 0.3)';
        const areaColor = isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(87, 181, 231, 0.1)';
        const mainColor = isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(87, 181, 231, 1)';

        myChart.setOption({
            animation: false,
            radar: {
                indicator: [
                    { name: 'UI/UX デザイン', max: 5 },
                    { name: 'フロントエンド', max: 5 },
                    { name: 'グラフィック', max: 5 },
                    { name: '企画・戦略', max: 5 },
                    { name: 'プロジェクト管理', max: 5 },
                    { name: 'コミュニケーション', max: 5 }
                ],
                shape: 'polygon',
                splitNumber: 5,
                axisName: { color: textColor },
                splitLine: { lineStyle: { color: lineColor } },
                splitArea: { show: false }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [4.5, 4, 4.5, 3.5, 4, 4.5],
                    name: 'スキルセット',
                    areaStyle: { color: areaColor },
                    lineStyle: { color: mainColor },
                    itemStyle: { color: mainColor }
                }]
            }],
            grid: { top: 0, bottom: 0, left: 0, right: 0 }
        });

        window.addEventListener('resize', () => myChart.resize());
    }

    /* ========================
        Works Filter
    ========================= */
    const worksGrid = document.getElementById('works-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const works = worksGrid?.querySelectorAll('[data-category]');

    function filterWorks(category) {
        works?.forEach(work => {
            // アニメーションクラスを初期化
            work.classList.remove('animate-fade-in-up', 'visible');
            
            if(category === 'all' || work.dataset.category === category) {
                work.style.display = '';
                // 表示後にアニメーションを再実行
                requestAnimationFrame(() => {
                    work.classList.add('animate-fade-in-up');
                    setTimeout(() => work.classList.add('visible'), 50); // 微妙な遅延で再アニメーションをトリガー
                });
            } else {
                work.style.display = 'none';
            }
        });
    }

    filterButtons?.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active', 'ring-2', 'ring-offset-2'));
            // Tailwind CSSのリングの色に合わせてクラスを追加
            const category = this.dataset.category;
            let ringColorClass = '';
            if (category === 'planning') ringColorClass = 'ring-blue-500';
            else if (category === 'design') ringColorClass = 'ring-purple-500';
            else if (category === 'app') ringColorClass = 'ring-orange-500';
            else if (category === 'all') ringColorClass = 'ring-gray-400';

            this.classList.add('active', 'ring-2', 'ring-offset-2', ringColorClass);
            
            filterWorks(this.dataset.category);
        });
    });

    /* ========================
        Smooth Scroll
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });
});