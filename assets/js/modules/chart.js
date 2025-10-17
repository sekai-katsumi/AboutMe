// ===============================
// modules/chart.js
// ===============================
let myChart = null;

export function initChart() {
    const chartDom = document.getElementById('skill-chart');
    if (!chartDom || typeof echarts === 'undefined') return;

    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const colors = getChartColors(isDark);

    myChart = echarts.init(chartDom);

    const option = {
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
            axisName: { color: colors.textColor },
            splitLine: { lineStyle: { color: colors.lineColor } },
            splitArea: { show: false }
        },
        series: [{
            type: 'radar',
            data: [{
                value: [4.5, 4, 4.5, 3.5, 4, 4.5],
                name: 'スキルセット',
                areaStyle: { color: colors.areaColor },
                lineStyle: { color: colors.mainColor },
                itemStyle: { color: colors.mainColor }
            }]
        }],
        grid: { top: 0, bottom: 0, left: 0, right: 0 }
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => myChart.resize());
}

// 色設定を返す関数
export function getChartColors(isDark) {
    return {
        textColor: isDark ? '#e5e7eb' : '#1f2937',
        lineColor: isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(87, 181, 231, 0.3)',
        areaColor: isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(87, 181, 231, 0.1)',
        mainColor: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(87, 181, 231, 1)'
    };
}

// テーマ切替時に呼ぶ
export function updateChartTheme(isDark) {
    if (!myChart) return;
    const colors = getChartColors(isDark);
    myChart.setOption({
        radar: {
            axisName: { color: colors.textColor },
            splitLine: { lineStyle: { color: colors.lineColor } }
        },
        series: [{
            data: [{
                areaStyle: { color: colors.areaColor },
                lineStyle: { color: colors.mainColor },
                itemStyle: { color: colors.mainColor }
            }]
        }]
    });
}
