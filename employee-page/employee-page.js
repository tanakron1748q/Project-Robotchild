// ==========================================
//  employee-page.js
//  Robotschild — Employee List (Minimal B&W)
// ==========================================

// ---------- Default data ----------
const defaultEmployees = [
  { id: 1, name: "นาย ปิยะบุตร พึ่งพันธ์", nickname: "เน้ง", phone: "097-9966829", bank: "กสิกรไทย", account: "022-8-30982-1" },
    { id: 2, name: "นาย ธิติกร เอกพจน์", nickname: "สกาย", phone: "095-1658090", bank: "กรุงไทย", account: "095-1658090" },
    { id: 3, name: "นาย นิติภูมิ มอญดี", nickname: "ภูมิ", phone: "092-7944619", bank: "ไทยพาณิชย์", account: "092-7944619" },
    { id: 4, name: "นาย ณัฐนนท์ ไพบูลย์ธนะสิน", nickname: "เปา", phone: "062-7460748", bank: "ไทยพาณิชย์", account: "357-4-07768-4" },
    { id: 5, name: "นาย อนุชา พรหมโสภา", nickname: "ชา", phone: "086-2558781", bank: "กสิกรไทย", account: "059-1-33174-4" },
    { id: 6, name: "นาย โยธิน แก้วมงคล", nickname: "เชียร์", phone: "083-0362222", bank: "ไทยพาณิชย์", account: "588-2-61521-0" },
    { id: 7, name: "นางสาว ปิยปาน มณีนาค", nickname: "ปาน", phone: "093-9901138", bank: "กสิกรไทย", account: "679-1-67849-6" },
    { id: 8, name: "นางสาว วรัญญา มณีนาค", nickname: "ฟ้า", phone: "095-3622639", bank: "กรุงไทย", account: "864-7-16268-7" },
    { id: 9, name: "นางสาว ธนัญพัธน์ ปรกกุญหญ้า", nickname: "เกรท", phone: "061-3053462", bank: "กรุงเทพ", account: "791-050711-9" },
    { id: 10, name: "นางสาว จีรนันท์ ปรกกุญหญ้า", nickname: "โจ๊ก", phone: "095-8071683", bank: "กรุงเทพ", account: "164-296657-9" },
    { id: 11, name: "นาย พัฒนพล ตระกูลภูวรัตน์", nickname: "โย", phone: "061-1020837", bank: "ไทยพาณิชย์", account: "055-1-77727-8" },
    { id: 12, name: "นาย ทวีศักดิ์ แหลมฉลาด", nickname: "เพชร", phone: "098-2872924", bank: "กสิกรไทย", account: "674-7-39230-2" },
    { id: 13, name: "นาย ธนภัทร์ โต๊ะทอง", nickname: "ร", phone: "080-5539739", bank: "กรุงไทย", account: "986-3-80832-6" },
    { id: 14, name: "นาย ชวนากร ปารเมศศศิษฐ์", nickname: "โก้", phone: "091-8814882", bank: "กรุงไทย", account: "801-9-09228-4" },
    { id: 15, name: "นาย เจตณัฐ มีสุวรรณ์", nickname: "นนท์", phone: "088-9412886", bank: "กรุงศรีอยุธยา", account: "696-1-40913-1" },
    { id: 17, name: "นาย นนทกร บัวใหญ่รักษา", nickname: "โด่", phone: "096-7278375", bank: "ไทยพาณิชย์", account: "383-424715-7" },
    { id: 18, name: "นางสาว ทิพย์สุดา ศรีปาภาวิชญ์กุล", nickname: "แบม", phone: "097-1735759", bank: "ไทยพาณิชย์", account: "383-428542-2" },
    { id: 19, name: "นางสาว ศศิพินท์ สาระวาส", nickname: "ดต๋", phone: "064-9176150", bank: "กรุงเทพ", account: "091-052174-9" },
    { id: 20, name: "นางสาว วิชญาดา คำม่วง", nickname: "แบม", phone: "084-2497503", bank: "กรุงไทย", account: "974-048617-7" },
    { id: 21, name: "นางสาว ญาณิศา มหัพพล", nickname: "—", phone: "—", bank: "กสิกรไทย", account: "106-127248-4" },
    { id: 22, name: "นางสาว ภีรดา สง่าจิตร", nickname: "—", phone: "—", bank: "กสิกรไทย", account: "0451426654" }
];

// ---------- State ----------
let employees    = JSON.parse(localStorage.getItem('employeesData')) || defaultEmployees;
let filteredList = [...employees];
let pendingDeleteId = null;

// ---------- LocalStorage ----------
function saveToLocalStorage() {
  localStorage.setItem('employeesData', JSON.stringify(employees));
}

// ---------- Clock ----------
function tick() {
  const el = document.getElementById('clockEl');
  if (el) el.textContent = new Date().toLocaleTimeString('th-TH', { hour12: false });
}
tick();
setInterval(tick, 1000);

// ---------- Avatar initials ----------
function getInitials(name = '') {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  // ใช้ตัวแรกของ part แรกที่ไม่ใช่คำนำหน้า
  const skip = ['นาย', 'นางสาว', 'นาง', 'ด.ช.', 'ด.ญ.'];
  const real  = parts.find(p => !skip.includes(p)) || parts[0];
  return real.charAt(0);
}

// ---------- Render ----------
function renderTable(list = filteredList) {
  const tbody     = document.getElementById('employeeTableBody');
  const emptyEl   = document.getElementById('emptyState');
  const statTotal = document.getElementById('statTotal');

  tbody.innerHTML = '';
  statTotal.textContent = employees.length;

  if (list.length === 0) {
    emptyEl.style.display = 'flex';
    return;
  }

  emptyEl.style.display = 'none';

  list.forEach((emp, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="cell-no">${employees.indexOf(emp) + 1}</td>
      <td>
        <div class="cell-name">
          <div class="avatar">${getInitials(emp.name)}</div>
          <span class="name-text">${emp.name}</span>
        </div>
      </td>
      <td>${emp.nickname}</td>
      <td class="cell-mono">${emp.phone}</td>
      <td><span class="bank-chip">${emp.bank}</span></td>
      <td class="cell-mono">${emp.account}</td>
      <td>
        <div class="action-cell">
          <button class="btn-icon" onclick="editEmployee(${emp.id})" title="แก้ไข" aria-label="แก้ไข ${emp.nickname}">
            <i class="ti ti-pencil" aria-hidden="true"></i>
          </button>
          <button class="btn-icon btn-icon-del" onclick="confirmDelete(${emp.id})" title="ลบ" aria-label="ลบ ${emp.nickname}">
            <i class="ti ti-trash" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- Search ----------
function handleSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  filteredList = q
    ? employees.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.nickname.toLowerCase().includes(q) ||
        e.phone.includes(q)
      )
    : [...employees];
  renderTable(filteredList);
}

// ---------- Modal (Add / Edit) ----------
function openModal(id = null) {
  const overlay = document.getElementById('modalOverlay');
  const title   = document.getElementById('modalTitle');
  const form    = document.getElementById('employeeForm');

  form.reset();

  // remove touched classes
  form.querySelectorAll('input').forEach(el => el.classList.remove('touched'));

  if (id) {
    title.textContent = 'แก้ไขข้อมูลพนักงาน';
    const emp = employees.find(e => e.id === id);
    document.getElementById('empId').value       = emp.id;
    document.getElementById('empName').value     = emp.name;
    document.getElementById('empNickname').value = emp.nickname;
    document.getElementById('empPhone').value    = emp.phone;
    document.getElementById('empBank').value     = emp.bank;
    document.getElementById('empAccount').value  = emp.account;
  } else {
    title.textContent = 'เพิ่มพนักงานใหม่';
    document.getElementById('empId').value = '';
  }

  overlay.classList.add('open');
  document.getElementById('empName').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

// ---------- Delete confirm dialog ----------
function confirmDelete(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  pendingDeleteId = id;
  document.getElementById('deleteTargetName').textContent = emp.name;
  document.getElementById('deleteOverlay').classList.add('open');
}

function closeDeleteModal() {
  pendingDeleteId = null;
  document.getElementById('deleteOverlay').classList.remove('open');
}

function handleDeleteOverlayClick(e) {
  if (e.target === e.currentTarget) closeDeleteModal();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
  if (pendingDeleteId === null) return;
  employees    = employees.filter(e => e.id !== pendingDeleteId);
  filteredList = filteredList.filter(e => e.id !== pendingDeleteId);
  saveToLocalStorage();
  renderTable(filteredList);
  closeDeleteModal();
  showToast('ลบข้อมูลเรียบร้อยแล้ว');
});

// ---------- Phone & Account Formatting ----------
document.getElementById('empPhone').addEventListener('input', function(e) {
  let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
  if (val.length > 10) val = val.slice(0, 10); // Limit to 10 digits
  
  let formatted = '';
  if (val.length > 0) {
    formatted += val.substring(0, 3);
    if (val.length > 3) formatted += '-' + val.substring(3, 6);
    if (val.length > 6) formatted += '-' + val.substring(6, 10);
  }
  e.target.value = formatted;
});

document.getElementById('empAccount').addEventListener('input', function(e) {
  let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
  if (val.length > 12) val = val.slice(0, 12); // Limit to 12 digits
  e.target.value = val;
});

// ---------- Form submit ----------
document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // touch all required
  this.querySelectorAll('input[required]').forEach(el => el.classList.add('touched'));

  const accountVal = document.getElementById('empAccount').value.trim();
  if (accountVal.length < 10) {
    alert('เลขที่บัญชีต้องมีอย่างน้อย 10 หลัก');
    return;
  }

  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

  const id       = document.getElementById('empId').value;
  const name     = document.getElementById('empName').value.trim();
  const nickname = document.getElementById('empNickname').value.trim();
  const phone    = document.getElementById('empPhone').value.trim();
  const bank     = document.getElementById('empBank').value.trim();
  const account  = document.getElementById('empAccount').value.trim();

  if (id) {
    // Update
    const index = employees.findIndex(e => e.id == id);
    employees[index] = { id: Number(id), name, nickname, phone, bank, account };
    showToast('อัปเดตข้อมูลเรียบร้อยแล้ว');
  } else {
    // Create
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id: newId, name, nickname, phone, bank, account });
    showToast('เพิ่มพนักงานเรียบร้อยแล้ว');
  }

  saveToLocalStorage();

  // re-apply search filter
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  filteredList = q
    ? employees.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.nickname.toLowerCase().includes(q) ||
        e.phone.includes(q)
      )
    : [...employees];

  renderTable(filteredList);
  closeModal();
});

// ---------- Edit ----------
function editEmployee(id) {
  openModal(id);
}

// ---------- Toast ----------
let toastTimer = null;

function showToast(msg = 'บันทึกข้อมูลเรียบร้อยแล้ว') {
  const toast   = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Keyboard: close modal on Escape ----------
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeDeleteModal();
  }
});

// ---------- Init ----------
renderTable();