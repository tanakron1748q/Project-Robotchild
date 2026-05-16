/**
 * Robotschild Fast Admin — student-Today.js
 * Real-time student tracking & check-in system
 *
 * หมายเหตุ: ข้อมูลนักเรียนในไฟล์นี้เป็นข้อมูลตัวอย่าง (Demo)
 * เพื่อใช้จริงกับ Google Apps Script ให้แทนที่ DEMO_STUDENTS
 * และเรียก google.script.run ในฟังก์ชัน loadData() และ syncStudent()
 */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */

const DAYS_TH = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
const MONTHS_TH = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

/**
 * Demo student data — replace with real data from backend
 *
 * scheduleStart / scheduleEnd: เวลาตามตาราง "HH:MM"
 * lateAfterMin: กี่นาทีหลัง scheduleStart ถือว่าสาย (default 15)
 */
const DEMO_STUDENTS = [
  { id: 1, name: 'สมชาย พงษ์ศรี',   course: 'Scratch Lv.2',  status: 'absent', checkedAt: null,  scheduleStart: '09:00', scheduleEnd: '11:00', lateAfterMin: 15 },
  { id: 2, name: 'มานี วงศ์เจริญ',   course: 'Python Lv.1',   status: 'active', checkedAt: '09:05', scheduleStart: '09:00', scheduleEnd: '11:00', lateAfterMin: 15 },
  { id: 3, name: 'กิตติ สุขสมบูรณ์', course: 'Scratch Lv.1', status: 'absent', checkedAt: null,  scheduleStart: '10:00', scheduleEnd: '12:00', lateAfterMin: 15 },
  { id: 4, name: 'ปวีณา รัตนวงศ์',   course: 'Arduino',       status: 'done',   checkedAt: '09:00', scheduleStart: '09:00', scheduleEnd: '11:00', lateAfterMin: 15 },
  { id: 5, name: 'ธนกฤต อินทรา',     course: 'Python Lv.2',  status: 'active', checkedAt: '09:10', scheduleStart: '09:00', scheduleEnd: '12:00', lateAfterMin: 15 },
  { id: 6, name: 'ชลธิชา มีศรี',     course: 'Scratch Lv.1', status: 'absent', checkedAt: null,  scheduleStart: '13:00', scheduleEnd: '15:00', lateAfterMin: 15 },
  { id: 7, name: 'ภัทรพล จันทร์งาม', course: 'Robotics',      status: 'absent', checkedAt: null,  scheduleStart: '13:00', scheduleEnd: '16:00', lateAfterMin: 15 },
  { id: 8, name: 'ณัฐนรี กาญจนา',    course: 'Python Lv.1',  status: 'absent', checkedAt: null,  scheduleStart: '14:00', scheduleEnd: '16:00', lateAfterMin: 15 },
];

/* ============================================================
   STATE
   ============================================================ */

let students = JSON.parse(JSON.stringify(DEMO_STUDENTS));

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);
const todayMs = currentDate.getTime();

let toastTimer = null;

/* ============================================================
   DATE HELPERS
   ============================================================ */

/**
 * Format a Date object to Thai date string
 * @param {Date} d
 * @returns {string}
 */
function formatDateTH(d) {
  const dayName  = DAYS_TH[d.getDay()];
  const date     = d.getDate();
  const month    = MONTHS_TH[d.getMonth()];
  const yearBE   = d.getFullYear() + 543;
  return `${dayName} ${date} ${month} ${yearBE}`;
}

/** @returns {boolean} */
function isViewingToday() {
  return currentDate.getTime() === todayMs;
}

/**
 * Get current time as HH:MM string
 * @returns {string}
 */
function nowTime() {
  const n = new Date();
  return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
}

/* ============================================================
   SCHEDULE HELPERS
   ============================================================ */

/**
 * Parse "HH:MM" string to total minutes from midnight
 * @param {string} hhmm  e.g. "09:30"
 * @returns {number}
 */
function toMinutes(hhmm) {
  if (!hhmm) return NaN;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Current time as minutes from midnight
 * @returns {number}
 */
function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

/**
 * Return schedule chip data for a student
 * @param {Object} student
 * @returns {{ cls: string, label: string }|null}
 */
function getScheduleChip(student) {
  const start = toMinutes(student.scheduleStart);
  const end   = toMinutes(student.scheduleEnd);
  const late  = start + (student.lateAfterMin || 15);
  const now   = nowMinutes();

  if (isNaN(start)) return null;

  if (student.status === 'done') {
    return { cls: 'chip-done', label: `${student.scheduleStart}–${student.scheduleEnd}` };
  }

  if (student.status === 'active') {
    if (now < end) {
      const remaining = end - now;
      if (remaining <= 15) return { cls: 'chip-warn', label: `เหลือ ${remaining} นาที` };
      return { cls: 'chip-active', label: `จบ ${student.scheduleEnd}` };
    }
    return { cls: 'chip-late', label: 'เกินเวลาแล้ว' };
  }

  // absent
  if (now < start) {
    const diff = start - now;
    if (diff <= 15) return { cls: 'chip-soon', label: `อีก ${diff} นาที` };
    return { cls: 'chip-normal', label: `${student.scheduleStart}–${student.scheduleEnd}` };
  }
  if (now >= start && now < late) {
    return { cls: 'chip-warn', label: `เริ่มแล้ว ${now - start} นาที` };
  }
  if (now >= late && now < end) {
    return { cls: 'chip-late', label: `สาย ${now - start} นาที` };
  }
  return { cls: 'chip-late', label: 'หมดเวลาแล้ว' };
}

/* ============================================================
   NAVIGATION
   ============================================================ */

/**
 * Move the viewed date by `delta` days
 * @param {number} delta  positive = forward, negative = back
 */
function changeDay(delta) {
  currentDate.setDate(currentDate.getDate() + delta);
  renderAll();
}

/** Jump back to today */
function goToday() {
  currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  renderAll();
}

/* ============================================================
   STUDENT ACTIONS
   ============================================================ */

/**
 * Move a student to a new status
 * @param {number} id
 * @param {'absent'|'active'|'done'} newStatus
 */
function moveStudent(id, newStatus) {
  const s = students.find(x => x.id === id);
  if (!s) return;

  s.status = newStatus;

  if (newStatus === 'active' && !s.checkedAt) {
    s.checkedAt = nowTime();
  }

  renderAll();
  syncStudent(s);

  const MESSAGES = {
    active: `เช็คชื่อ ${s.name} — กำลังเรียน`,
    done:   `${s.name} เรียนจบแล้ว`,
    absent: `ย้าย ${s.name} กลับรายการรอ`,
  };
  showToast(MESSAGES[newStatus] || 'อัปเดตแล้ว', 'success');
}

/** Check-in all absent students at once */
function checkInAll() {
  const t = nowTime();
  const absent = students.filter(s => s.status === 'absent');
  if (!absent.length) {
    showToast('ไม่มีนักเรียนที่รอเช็คชื่อ', 'info');
    return;
  }
  absent.forEach(s => {
    s.status = 'active';
    if (!s.checkedAt) s.checkedAt = t;
    syncStudent(s);
  });
  renderAll();
  showToast(`เช็คชื่อแล้ว ${absent.length} คน`, 'success');
}

/** Mark all active students as done */
function markAllDone() {
  const active = students.filter(s => s.status === 'active');
  if (!active.length) {
    showToast('ไม่มีนักเรียนที่กำลังเรียน', 'info');
    return;
  }
  active.forEach(s => { s.status = 'done'; syncStudent(s); });
  renderAll();
  showToast(`จบการเรียน ${active.length} คน`, 'success');
}

/** Export done-list (placeholder — wire to google.script.run or download logic) */
function exportDone() {
  const done = students.filter(s => s.status === 'done');
  if (!done.length) {
    showToast('ยังไม่มีนักเรียนที่เรียนจบ', 'info');
    return;
  }
  showToast('กำลังส่งออกข้อมูล...', 'warning');

  /* ---- Google Apps Script example ----
  google.script.run
    .withSuccessHandler(() => showToast('ส่งออกสำเร็จ', 'success'))
    .withFailureHandler(err => showToast('ส่งออกไม่สำเร็จ', 'warning'))
    .exportDoneStudents(done);
  */
}

/* ============================================================
   BACKEND SYNC (stub — replace with google.script.run)
   ============================================================ */

/**
 * Sync a single student record to the backend.
 * Replace the body with your google.script.run call.
 * @param {Object} student
 */
function syncStudent(student) {
  console.log('[sync]', student);

  /* ---- Google Apps Script example ----
  google.script.run
    .withFailureHandler(err => console.error('sync failed', err))
    .updateStudentStatus(student.id, student.status, student.checkedAt);
  */
}

/**
 * Load data from backend.
 * Replace the body with your google.script.run call.
 */
function loadData() {
  /* ---- Google Apps Script example ----
  google.script.run
    .withSuccessHandler(data => {
      students = data;
      renderAll();
    })
    .withFailureHandler(err => console.error('load failed', err))
    .getStudentsForToday();
  */

  // Demo: just re-render with current in-memory data
  renderAll();
}

/* ============================================================
   RENDER
   ============================================================ */

/**
 * Build initials from a Thai/English name
 * @param {string} name
 * @returns {string}  2 characters
 */
function getInitials(name) {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Build HTML for one student row
 * @param {Object} student
 * @param {'absent'|'active'|'done'} cardKey
 * @returns {string}
 */
function renderStudentRow(student, cardKey) {
  const initials = getInitials(student.name);
  const schedTime = (student.scheduleStart && student.scheduleEnd)
    ? `${student.scheduleStart}–${student.scheduleEnd}`
    : '';
  const subText = student.checkedAt
    ? `${student.course}${schedTime ? ' · ' + schedTime : ''} · เช็คชื่อ ${student.checkedAt}`
    : `${student.course}${schedTime ? ' · ' + schedTime : ''}`;

  // schedule chip
  const chip = getScheduleChip(student);
  const chipHTML = chip
    ? `<span class="sched-chip ${chip.cls}" aria-label="เวลาตามตาราง">${chip.label}</span>`
    : '';

  let actions = '';
  if (cardKey === 'absent') {
    actions = `
      <button class="s-btn green"
              onclick="moveStudent(${student.id},'active')"
              title="เช็คชื่อ — เข้าเรียน"
              aria-label="เช็คชื่อ ${student.name}">
        <i class="ti ti-player-play" aria-hidden="true"></i>
      </button>`;
  } else if (cardKey === 'active') {
    actions = `
      <button class="s-btn green"
              onclick="moveStudent(${student.id},'done')"
              title="จบการเรียน"
              aria-label="จบการเรียน ${student.name}">
        <i class="ti ti-check" aria-hidden="true"></i>
      </button>
      <button class="s-btn red"
              onclick="moveStudent(${student.id},'absent')"
              title="ย้ายกลับรายการรอ"
              aria-label="ย้ายกลับ ${student.name}">
        <i class="ti ti-arrow-left" aria-hidden="true"></i>
      </button>`;
  } else {
    actions = `
      <button class="s-btn red"
              onclick="moveStudent(${student.id},'active')"
              title="ย้ายกลับ — กำลังเรียน"
              aria-label="ย้ายกลับ ${student.name}">
        <i class="ti ti-rotate-clockwise-2" aria-hidden="true"></i>
      </button>`;
  }

  return `
    <div class="student-row">
      <div class="s-avatar" aria-hidden="true">${initials}</div>
      <div class="s-info">
        <div class="s-name">${student.name}</div>
        <div class="s-detail">${subText}</div>
      </div>
      <div class="s-actions" aria-label="การดำเนินการ">${actions}</div>
    </div>`;
}

/**
 * Render a student list into a container element.
 * Shows empty state when group is empty.
 * @param {string}   containerId  element id
 * @param {Object[]} group        filtered students
 * @param {string}   cardKey
 * @param {string}   emptyIcon    Tabler icon name
 * @param {string}   emptyText
 */
function renderList(containerId, group, cardKey, emptyIcon, emptyText) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!group.length) {
    el.innerHTML = `
      <div class="empty-state">
        <i class="ti ti-${emptyIcon}" aria-hidden="true"></i>
        <span class="empty-text">${emptyText}</span>
      </div>`;
    return;
  }

  el.innerHTML = group.map(s => renderStudentRow(s, cardKey)).join('');
}

/** Full re-render of the entire dashboard */
function renderAll() {
  const viewing = isViewingToday();

  /* date label */
  const label    = formatDateTH(currentDate);
  const todayTag = viewing ? `<span class="today-badge">วันนี้</span>` : '';
  document.getElementById('dateLabel').innerHTML = label + todayTag;

  /* show/hide "วันนี้" button */
  const todayBtn = document.getElementById('todayBtn');
  if (todayBtn) todayBtn.style.display = viewing ? 'none' : 'inline-flex';

  /* data — only real data on today; past dates show archive state */
  const data   = viewing ? students : [];
  const absent = data.filter(s => s.status === 'absent');
  const active = data.filter(s => s.status === 'active');
  const done   = data.filter(s => s.status === 'done');
  const total  = data.length;

  /* summary counts */
  setText('totalCount',  total);
  setText('absentCount', absent.length);
  setText('activeCount', active.length);
  setText('doneCount',   done.length);
  setText('absBadge',    absent.length);
  setText('activeBadge', active.length);
  setText('doneBadge',   done.length);

  /* footer timestamps */
  const n = new Date();
  const updateStr = `อัปเดต ${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')} น.`;
  const archiveStr = 'ข้อมูลเก็บถาวร';
  setText('absTime',  viewing ? updateStr : archiveStr);
  setText('actTime',  viewing ? updateStr : archiveStr);
  setText('doneTime', viewing ? updateStr : archiveStr);

  /* student lists */
  if (viewing) {
    renderList('absentList', absent, 'absent', 'clock-x',       'ไม่มีนักเรียนรอเช็คชื่อ');
    renderList('activeList', active, 'active', 'player-play',   'ไม่มีนักเรียนกำลังเรียน');
    renderList('doneList',   done,   'done',   'circle-check',  'ยังไม่มีนักเรียนจบ');
  } else {
    ['absentList','activeList','doneList'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `
        <div class="empty-state">
          <i class="ti ti-calendar-off" aria-hidden="true"></i>
          <span class="empty-text">ไม่มีข้อมูลวันนี้</span>
        </div>`;
    });
  }
}

/** Helper: safely set textContent */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ============================================================
   TOAST
   ============================================================ */

/**
 * Show a toast notification
 * @param {string} message
 * @param {'success'|'warning'|'info'} type
 */
function showToast(message, type = 'success') {
  const toast   = document.getElementById('toast');
  const iconEl  = document.getElementById('toastIcon');
  const msgEl   = document.getElementById('toastMsg');
  if (!toast) return;

  const ICONS = { success: 'ti-check', warning: 'ti-loader', info: 'ti-info-circle' };

  msgEl.textContent = message;
  iconEl.className  = `ti ${ICONS[type] || 'ti-check'}`;
  toast.className   = `toast ${type} show`;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ============================================================
   CLOCK
   ============================================================ */

function updateClock() {
  const n = new Date();
  const h = String(n.getHours()).padStart(2, '0');
  const m = String(n.getMinutes()).padStart(2, '0');
  const s = String(n.getSeconds()).padStart(2, '0');
  const el = document.getElementById('clockEl');
  if (el) el.textContent = `${h}:${m}:${s}`;
}

/* ============================================================
   INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);

  /* Re-render schedule chips every minute so urgency labels stay accurate */
  setInterval(() => {
    if (isViewingToday()) renderAll();
  }, 60_000);

  /* Auto-refresh data every 30 seconds when viewing today */
  setInterval(() => {
    if (isViewingToday()) loadData();
  }, 30_000);

  /* Initial load */
  loadData();

  /* Nav link active state (basic SPA-like switching) */
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});