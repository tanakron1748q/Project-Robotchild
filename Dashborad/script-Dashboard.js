document.addEventListener('DOMContentLoaded', () => {
    const updateBtn    = document.getElementById('updateBtn');
    const startDateInput = document.getElementById('startDate');
    const endDateInput   = document.getElementById('endDate');
    const presetBtns     = document.querySelectorAll('.btn-preset');
    const metricValues   = document.querySelectorAll('.metric-value');

    /* ── Helpers ────────────────────────────────── */
    const fmt = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const setPreset = (range) => {
        const today = new Date();
        let start   = new Date();
        let end     = new Date();

        switch (range) {
            case 'today':
                break;
            case '7days':
                start.setDate(today.getDate() - 6);
                break;
            case '30days':
                start.setDate(today.getDate() - 29);
                break;
            case 'thisMonth':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'custom':
                return; 
        }

        startDateInput.value = fmt(start);
        endDateInput.value   = fmt(end);
    };

    const markActive = (range) => {
        presetBtns.forEach(b => b.classList.toggle('active', b.dataset.range === range));
    };

    const setLoading = (on) => {
        updateBtn.classList.toggle('is-loading', on);
        updateBtn.disabled = on;
        metricValues.forEach(el => el.classList.toggle('is-loading', on));
    };

    /* ── Fetch & Render ─────────────────────────── */
    const fetchData = () => {
        const s = startDateInput.value;
        const e = endDateInput.value;

        if (!s || !e || s > e) {
            endDateInput.style.outline = '2px solid #e2594a';
            setTimeout(() => (endDateInput.style.outline = ''), 1800);
            return;
        }

        console.log(`Fetching Data: ${s} → ${e}`);
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (window.MockData) {
                const data = window.MockData.generate(s, e);
                window.MockData.render(data);
            }
            setLoading(false);
        }, 850);
    };

    /* ── Events ─────────────────────────────────── */
    presetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const range = btn.dataset.range;
            markActive(range);
            setPreset(range);
            if (range !== 'custom') {
                fetchData();
            }
        });
    });

    [startDateInput, endDateInput].forEach(input => {
        input.addEventListener('change', () => markActive('custom'));
    });

    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        markActive('custom');
        fetchData();
    });

    // Initial Load
    // You can call fetchData() here if you want it to load on startup
    // fetchData();
});