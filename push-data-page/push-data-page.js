// ==========================================
//  push-data-page.js
//  Robotschild — Enrollment Form (Minimal B&W)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Helpers ----------
  const $ = id => document.getElementById(id);

  // ---------- Elements ----------
  const courseEl     = $('course');
  const discountEl   = $('discount');
  const statusEl     = $('status');
  const statusDot    = $('statusDot');
  const learnDateEl  = $('learnDate');
  const form         = $('enrollmentForm');
  const toast        = $('toast');

  // ---------- State ----------
  let basePrice = 0;

  // ---------- Clock ----------
  const tick = () => {
    $('clockEl').textContent = new Date().toLocaleTimeString('th-TH', { hour12: false });
  };
  tick();
  setInterval(tick, 1000);

  // ---------- Default date ----------
  learnDateEl.valueAsDate = new Date();

  // ---------- Payment summary ----------
  const updateSummary = () => {
    let disc = parseFloat(discountEl.value) || 0;
    if (disc < 0) { disc = 0; discountEl.value = 0; }
    if (disc > basePrice) { disc = basePrice; discountEl.value = disc; }

    const net = basePrice - disc;

    $('summaryPrice').textContent    = basePrice > 0 ? '฿' + basePrice.toLocaleString('th-TH') : '—';
    $('summaryDiscount').textContent = disc > 0      ? '−฿' + disc.toLocaleString('th-TH')    : '—';
    $('summaryNet').textContent      = basePrice > 0 ? '฿' + net.toLocaleString('th-TH')      : '—';
  };

  // ---------- Course selection ----------
  courseEl.addEventListener('change', e => {
    const opt = e.target.options[e.target.selectedIndex];
    basePrice = parseFloat(opt.getAttribute('data-price')) || 0;

    const badge = $('courseBadge');
    if (basePrice > 0) {
      $('courseBadgeText').textContent = opt.text + ' — ฿' + basePrice.toLocaleString('th-TH');
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }

    updateSummary();
  });

  discountEl.addEventListener('input', updateSummary);

  // ---------- Status dot ----------
  const syncStatusDot = () => {
    statusDot.style.background = statusEl.value === 'paid' ? '#2a9a4a' : '#c94040';
  };
  syncStatusDot();
  statusEl.addEventListener('change', syncStatusDot);

  // ---------- Progress bar ----------
  const STEPS = [
    { fields: ['fullName', 'phone', 'grade'], dot: 's1', label: 'sl1', line: 'l1' },
    { fields: ['course', 'learnDate'],        dot: 's2', label: 'sl2', line: 'l2' },
    { fields: ['paymentMethod', 'status'],    dot: 's3', label: 'sl3', line: 'l3' },
    { fields: [],                             dot: 's4', label: 'sl4', line: null  },
  ];

  const EMPTY_OPTIONS = ['', '-- กรุณาเลือกคอร์ส --', '-- เลือก --'];

  const isFieldFilled = id => {
    const el = $(id);
    if (!el) return true;
    const val = el.value ? el.value.trim() : '';
    return val !== '' && !EMPTY_OPTIONS.includes(val);
  };

  const updateProgress = () => {
    let allPreviousDone = true;

    STEPS.forEach((step, i) => {
      const dot      = $(step.dot);
      const lbl      = $(step.label);
      const lineEl   = step.line ? $(step.line) : null;
      
      // A step is "filled" if all its fields are filled.
      // For the last empty step, we keep it as "not filled" so it can be "active".
      const isFilled = step.fields.length > 0 ? step.fields.every(isFieldFilled) : false;

      if (allPreviousDone && isFilled) {
        // Step is finished
        dot.className = 'step-dot done';
        dot.innerHTML = '<i class="ti ti-check"></i>';
        lbl.classList.add('active');
        if (lineEl) lineEl.classList.add('done');
      } else if (allPreviousDone) {
        // This is the current active step
        dot.className   = 'step-dot active';
        dot.textContent = i + 1;
        lbl.classList.add('active');
        if (lineEl) lineEl.classList.remove('done');
        allPreviousDone = false;
      } else {
        // This step is ahead
        dot.className   = 'step-dot idle';
        dot.textContent = i + 1;
        lbl.classList.remove('active');
        if (lineEl) lineEl.classList.remove('done');
      }
    });
  };

  // Attach live listeners for progress
  ['fullName', 'phone', 'grade'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', updateProgress);
  });

  ['learnDate', 'course', 'paymentMethod', 'status'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('change', updateProgress);
  });

  // Initial load
  updateProgress();

  // ---------- Phone formatting ----------
  const phoneEl = $('phone');
  if (phoneEl) {
    phoneEl.addEventListener('input', e => {
      // Remove non-digits
      let val = e.target.value.replace(/\D/g, '');
      
      // Limit to 10 digits
      if (val.length > 10) val = val.slice(0, 10);
      
      // Format: 000-000-0000
      let formatted = '';
      if (val.length > 0) {
        formatted += val.substring(0, 3);
        if (val.length > 3) {
          formatted += '-' + val.substring(3, 6);
        }
        if (val.length > 6) {
          formatted += '-' + val.substring(6, 10);
        }
      }
      
      e.target.value = formatted;
      updateProgress(); // Ensure progress bar updates with formatting
    });
  }

  // ---------- Touch validation (show error only after blur) ----------
  ['fullName', 'phone', 'grade', 'course', 'learnDate'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('blur', () => el.classList.add('touched'));
  });

  // ---------- Toast helper ----------
  const showToast = () => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  };

  // ---------- Form submit ----------
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Mark all required fields as touched so errors appear
    ['fullName', 'phone', 'grade', 'course', 'learnDate'].forEach(id => {
      $(id)?.classList.add('touched');
    });

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // -------------------------------------------------------
    // จุดนี้สามารถใช้ fetch() / axios เพื่อ POST ข้อมูลได้
    // -------------------------------------------------------
    // const payload = {
    //   fullName:      $('fullName').value,
    //   nickname:      $('nickname').value,
    //   grade:         $('grade').value,
    //   school:        $('school').value,
    //   phone:         $('phone').value,
    //   course:        $('course').value,
    //   learnDate:     $('learnDate').value,
    //   equipment:     $('equipment').value,
    //   paymentMethod: $('paymentMethod').value,
    //   status:        $('status').value,
    //   discount:      parseFloat($('discount').value) || 0,
    //   net:           basePrice - (parseFloat($('discount').value) || 0),
    // };
    // await fetch('/api/enroll', { method: 'POST', body: JSON.stringify(payload) });

    showToast();
  });

}); // DOMContentLoaded