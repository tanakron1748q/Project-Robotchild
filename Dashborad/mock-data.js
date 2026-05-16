/**
 * Updated Mock Data Generator for Robotschild Dashboard
 * Optimized for the new Grid-based UI with Rank Lists and Transactions
 */

const MockData = {
    chartInstance: null,

    // Generate random sales data based on date range
    generate: function(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Base values
        const baseSalesPerDay = 1500;
        const baseItemsPerDay = 3;

        const totalSales = diffDays * baseSalesPerDay * (0.8 + Math.random() * 0.4);
        const totalItems = Math.floor(diffDays * baseItemsPerDay * (0.8 + Math.random() * 0.4));
        const avgSales = totalSales / (totalItems || 1);

        const courses = [
            { name: 'Python สำหรับผู้เริ่มต้น', value: totalSales * 0.35 },
            { name: 'Scratch & Robotics', value: totalSales * 0.25 },
            { name: 'Web Dev: HTML/CSS', value: totalSales * 0.20 },
            { name: 'AI & Machine Learning', value: totalSales * 0.12 },
            { name: 'Game Dev with Unity', value: totalSales * 0.08 }
        ];

        const transactions = [
            { name: 'สมชาย ใจดี', course: 'Python สำหรับผู้เริ่มต้น', amount: 2500, time: '10 นาทีที่แล้ว' },
            { name: 'นภา รักเรียน', course: 'Scratch & Robotics', amount: 1800, time: '42 นาทีที่แล้ว' },
            { name: 'ปิยะ แก้วมณี', course: 'Web Dev: HTML/CSS', amount: 2200, time: '1 ชม. ที่แล้ว' },
            { name: 'วิภา ดอกไม้', course: 'AI & Machine Learning', amount: 3500, time: '3 ชม. ที่แล้ว' },
            { name: 'ธนา สุขสม', course: 'Game Dev with Unity', amount: 1900, time: '5 ชม. ที่แล้ว' }
        ];

        // Generate Daily Data for Chart
        const labels = [];
        const dailyValues = [];
        const tempDate = new Date(start);
        for (let i = 0; i < Math.min(diffDays, 31); i++) {
            labels.push(tempDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }));
            dailyValues.push(baseSalesPerDay * (0.5 + Math.random()));
            tempDate.setDate(tempDate.getDate() + 1);
        }

        const methods = ['โอนเงิน', 'เงินสด', 'บัตรเครดิต'];
        const method = methods[Math.floor(Math.random() * methods.length)];

        return {
            totalSales,
            totalItems,
            avgSales,
            paymentMethod: method,
            courses,
            transactions,
            chartData: {
                labels,
                values: dailyValues
            }
        };
    },

    // Render data to the UI
    render: function(data) {
        // 1. Update Metrics
        this.safeSetText('totalSales', `${data.totalSales.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ฿`);
        this.safeSetText('totalItems', `${data.totalItems.toLocaleString()} รายการ`);
        this.safeSetText('paymentMethod', data.paymentMethod);
        this.safeSetText('avgSales', `${data.avgSales.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ฿`);

        // 2. Update Top Courses Rank List
        this.renderRankList(data.courses);

        // 3. Update Recent Transactions
        this.renderTransactions(data.transactions);

        // 4. Update Chart
        this.renderChart(data.chartData);

        // 5. Hide Empty States
        document.querySelectorAll('.empty-state').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.chart-wrap, .rank-list, .tx-list').forEach(el => el.classList.add('is-visible'));
    },

    safeSetText: function(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    },

    renderRankList: function(courses) {
        const list = document.getElementById('topCoursesList');
        if (!list) return;

        list.innerHTML = courses.map((c, i) => `
            <div class="rank-item">
                <span class="rank-no">${i + 1}</span>
                <span class="rank-name">${c.name}</span>
                <span class="rank-val">฿${c.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
        `).join('');
    },

    renderTransactions: function(txs) {
        const list = document.getElementById('txList');
        if (!list) return;

        list.innerHTML = txs.map(tx => `
            <div class="tx-item">
                <div class="tx-left">
                    <span class="tx-name">${tx.name}</span>
                    <span class="tx-course">${tx.course}</span>
                </div>
                <div class="tx-right">
                    <span class="tx-amount">+฿${tx.amount.toLocaleString()}</span>
                    <span class="tx-time">${tx.time}</span>
                </div>
            </div>
        `).join('');
    },

    renderChart: function(chartData) {
        const ctx = document.getElementById('dailyChart');
        if (!ctx) return;

        const chartWrap = document.getElementById('chartWrap');
        if (chartWrap) chartWrap.classList.add('is-visible');

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }

        this.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'ยอดขายรายวัน',
                    data: chartData.values,
                    borderColor: '#1a1a18',
                    backgroundColor: 'rgba(26, 26, 24, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 10 }, color: '#a8a8a4' }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e8e8e4', strokeDashArray: [4, 4] },
                        ticks: { font: { size: 10 }, color: '#a8a8a4' }
                    }
                }
            }
        });
    }
};

window.MockData = MockData;