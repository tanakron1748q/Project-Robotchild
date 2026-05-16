// ==========================================
//  export-page.js
//  Robotschild — Export Excel (Minimal B&W)
// ==========================================

// ---------- Clock ----------
function tick() {
  const el = document.getElementById('clockEl');
  if (el) el.textContent = new Date().toLocaleTimeString('th-TH', { hour12: false });
}
tick();
setInterval(tick, 1000);

// ---------- Elements ----------
const startDateEl    = document.getElementById('startDate');
const endDateEl      = document.getElementById('endDate');
const rangePreview   = document.getElementById('rangePreview');
const rangePreviewTx = document.getElementById('rangePreviewText');
const dateError      = document.getElementById('dateError');
const dateErrorMsg   = document.getElementById('dateErrorMsg');
const downloadBtn    = document.getElementById('downloadBtn');
const downloadBtnTx  = document.getElementById('downloadBtnText');
const historyList    = document.getElementById('historyList');
const historyEmpty   = document.getElementById('historyEmpty');

// ---------- Helpers ----------
const pad = n => String(n).padStart(2, '0');

function toLocalISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatThai(isoStr) {
  if (!isoStr) return '—';
  const [y, m, d] = isoStr.split('-');
  const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${parseInt(y) + 543}`;
}

function dayDiff(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.round(ms / 86400000) + 1;
}

// ---------- Quick chips ----------
const chips = document.querySelectorAll('#quickChips .chip');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    applyRange(chip.dataset.range);
  });
});

function applyRange(range) {
  const today = new Date();
  today.setHours(0,0,0,0);
  let start, end;

  switch (range) {
    case 'today':
      start = end = new Date(today);
      break;
    case 'yesterday':
      start = end = new Date(today);
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case 'week':
      end   = new Date(today);
      start = new Date(today);
      start.setDate(start.getDate() - 6);
      break;
    case 'month':
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end   = new Date(today);
      break;
    case 'lastmonth':
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end   = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    case 'custom':
    default:
      // ไม่เปลี่ยนค่า — ให้ user พิมพ์เอง
      return;
  }

  startDateEl.value = toLocalISO(start);
  endDateEl.value   = toLocalISO(end);
  validateDates();
}

// ---------- Validation & preview ----------
function validateDates() {
  const s = startDateEl.value;
  const e = endDateEl.value;

  if (!s || !e) {
    rangePreviewTx.textContent = 'เลือกช่วงวันที่';
    dateError.classList.remove('show');
    downloadBtn.disabled = true;
    return;
  }

  if (s > e) {
    dateError.classList.add('show');
    dateErrorMsg.textContent = 'วันที่เริ่มต้นต้องไม่เกินวันที่สิ้นสุด';
    downloadBtn.disabled = true;
    rangePreviewTx.textContent = '—';
    return;
  }

  dateError.classList.remove('show');

  const days = dayDiff(s, e);
  rangePreviewTx.textContent = `${formatThai(s)} — ${formatThai(e)}  (${days} วัน)`;
  downloadBtn.disabled = false;
}

startDateEl.addEventListener('change', () => {
  // ถ้า user เปลี่ยน start เอง ให้ deactivate chip quick
  deselectQuickChips();
  validateDates();
});

endDateEl.addEventListener('change', () => {
  deselectQuickChips();
  validateDates();
});

function deselectQuickChips() {
  chips.forEach(c => {
    if (c.dataset.range !== 'custom') c.classList.remove('active');
  });
  document.querySelector('.chip[data-range="custom"]').classList.add('active');
}

// ---------- Export type label ----------
const TYPE_LABELS = {
  all:        'ข้อมูลทั้งหมด',
  enrollment: 'การลงทะเบียน',
  payment:    'การชำระเงิน',
  attendance: 'การเช็คชื่อ',
};

function getSelectedType() {
  const checked = document.querySelector('input[name="exportType"]:checked');
  return checked ? checked.value : 'all';
}

// ---------- Download ----------
function handleDownload() {
  const s = startDateEl.value;
  const e = endDateEl.value;
  if (!s || !e || s > e) return;

  const type = getSelectedType();

  // --- Simulate loading state ---
  downloadBtn.disabled = true;
  downloadBtn.innerHTML = `<span class="spinner"></span><span>กำลังสร้างไฟล์…</span>`;

  setTimeout(() => {
    // คืนปุ่มกลับ
    downloadBtn.innerHTML = `<i class="ti ti-file-spreadsheet" aria-hidden="true"></i><span id="downloadBtnText">ดาวน์โหลด Excel</span>`;
    downloadBtn.disabled = false;

    // บันทึกประวัติ
    saveHistory(s, e, type);
    showToast(`ดาวน์โหลด ${TYPE_LABELS[type]} เรียบร้อยแล้ว`);

    // -------------------------------------------------------
    // จุดนี้ต่อ fetch / Google Apps Script URL ได้เลย เช่น:
    // const url = `https://script.google.com/macros/s/YOUR_ID/exec?start=${s}&end=${e}&type=${type}`;
    // window.location.href = url;
    // -------------------------------------------------------
  }, 1400);
}

// ---------- History ----------
const HISTORY_KEY = 'exportHistory';

function loadHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

function saveHistory(start, end, type) {
  const history = loadHistory();
  const entry = {
    id:    Date.now(),
    start,
    end,
    type,
    time:  new Date().toLocaleTimeString('th-TH', { hour12: false }),
    date:  toLocalISO(new Date()),
  };
  history.unshift(entry);
  if (history.length > 10) history.pop(); // เก็บแค่ 10 รายการล่าสุด
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.appendChild(historyEmpty);
    historyEmpty.style.display = 'flex';
    return;
  }

  history.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-icon">
        <i class="ti ti-file-spreadsheet" aria-hidden="true"></i>
      </div>
      <div class="history-info">
        <div class="history-name">export_${entry.start}_${entry.end}.xlsx</div>
        <div class="history-meta">${formatThai(entry.start)} — ${formatThai(entry.end)} · ${entry.time} น.</div>
      </div>
      <span class="history-badge">${TYPE_LABELS[entry.type] || entry.type}</span>
    `;
    historyList.appendChild(item);
  });
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

// ---------- Toast ----------
let toastTimer = null;

function showToast(msg = 'ดาวน์โหลดเรียบร้อยแล้ว') {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---------- Init ----------
(function init() {
  // set default: วันนี้
  const today = new Date();
  startDateEl.value = toLocalISO(today);
  endDateEl.value   = toLocalISO(today);
  validateDates();
  renderHistory();
})();