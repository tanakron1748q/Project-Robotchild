/* ══ Data ═══════════════════════════════════════════════ */
let courses = [
  { id:'RBTJ0004', type:'ROBOTICE', name:'EV3 J1-J3 (4)',        sessions:4,  price:4000,  hrs:'2 ชม.' },
  { id:'RBTJ0012', type:'ROBOTICE', name:'EV3 J1-J3 (12)',       sessions:12, price:11000, hrs:'2 ชม.' },
  { id:'RBTB0004', type:'ROBOTICE', name:'EV3 B1-B2 (4)',        sessions:4,  price:4000,  hrs:'2 ชม.' },
  { id:'RBTB0012', type:'ROBOTICE', name:'EV3 B1-B2 (12)',       sessions:12, price:11000, hrs:'2 ชม.' },
  { id:'RBTI0004', type:'ROBOTICE', name:'EV3 INT1-INT3 (4)',     sessions:4,  price:4000,  hrs:'2 ชม.' },
  { id:'RBTI0012', type:'ROBOTICE', name:'EV3 INT1-INT3 (12)',    sessions:12, price:11000, hrs:'2 ชม.' },
  { id:'RBTO0004', type:'ROBOTICE', name:'EV3 Other (4)',         sessions:4,  price:4000,  hrs:'2 ชม.' },
  { id:'RBTO0012', type:'ROBOTICE', name:'EV3 Other (12)',        sessions:12, price:11000, hrs:'2 ชม.' },
  { id:'RBTF0000', type:'ROBOTICE', name:'EV3 Initial fee',       sessions:0,  price:600,   hrs:'—' },
  { id:'MTHV0016', type:'Math',     name:'VedicMath (KG-P1)',     sessions:16, price:7450,  hrs:'1 ชม.' },
  { id:'MTHV1016', type:'Math',     name:'VedicMath (P2-and up)', sessions:16, price:7450,  hrs:'1.5 ชม.' },
  { id:'SCI_0006', type:'SCI',      name:'SCI',                   sessions:6,  price:2950,  hrs:'1 ชม.' },
  { id:'3DEP0006', type:'3D EduChild', name:'3D Pen',             sessions:6,  price:2950,  hrs:'1.5 ชม.' },
];

let filtered = [...courses];
let activeFilter = 'all';
let sortCol = null, sortAsc = true;
let page = 1;
const PER_PAGE = 10;
let deleteId = null, editId = null;

/* ══ Category config ════════════════════════════════════ */
const CAT = {
  'ROBOTICE':    { cls:'b-rob', lbl:'ROBOTICE' },
  'Math':        { cls:'b-mat', lbl:'Math' },
  'SCI':         { cls:'b-sci', lbl:'SCI' },
  '3D EduChild': { cls:'b-3d',  lbl:'3D EduChild' },
};

let courseTypes = [...new Set(courses.map(c => c.type))];

function populateTypeSelect() {
  const sel = document.getElementById('fType');
  if (!sel) return;
  const currentVal = sel.value;
  sel.innerHTML = '<option value="">เลือกประเภท</option>' + 
    courseTypes.map(t => `<option value="${t}">${t}</option>`).join('');
  sel.value = currentVal;
}

function showNewTypeForm() {
  document.getElementById('typeSelectWrap').classList.add('hidden');
  document.getElementById('newTypeWrap').classList.remove('hidden');
  document.getElementById('toggleTypeBtn').classList.add('hidden');
  document.getElementById('newTypeInput').focus();
}

function hideNewTypeForm() {
  document.getElementById('typeSelectWrap').classList.remove('hidden');
  document.getElementById('newTypeWrap').classList.add('hidden');
  document.getElementById('toggleTypeBtn').classList.remove('hidden');
  document.getElementById('newTypeInput').value = '';
}

function confirmAddNewType() {
  const input = document.getElementById('newTypeInput');
  const val = input.value.trim();
  if (val) {
    if (courseTypes.includes(val)) {
      showToast(`ประเภท "${val}" มีอยู่แล้ว`, 'error');
    } else {
      courseTypes.push(val);
      populateTypeSelect();
      document.getElementById('fType').value = val;
      showToast(`เพิ่มประเภท "${val}" เรียบร้อย`, 'success');
      hideNewTypeForm();
    }
  } else {
    showToast('กรุณาระบุชื่อประเภท', 'error');
  }
}

const badge = t => {
  const c = CAT[t] || { cls:'', lbl: t };
  return `<span class="badge ${c.cls}"><span class="bd"></span>${c.lbl}</span>`;
};

/* ══ Stats ══════════════════════════════════════════════ */
function renderStats() {
  /* -- ของเก่าชุดที่ 2 (Starting Price, Top Category, etc.) --
  const typeCounts = courses.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});
  const topDept = Object.entries(typeCounts).sort((a,b) => b[1] - a[1])[0];
  const prices = courses.map(c => c.price).filter(p => p > 0);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const totalHours = courses.reduce((s, c) => {
    const h = parseFloat(c.hrs) || 0;
    return s + (c.sessions * h);
  }, 0);
  ------------------------------------------------------- */

  // 1. จำนวนคอร์สทั้งหมด
  const totalCourses = courses.length;

  // 2. จำนวนประเภททั้งหมด
  const totalTypes = new Set(courses.map(c => c.type)).size;

  // 3. ราคาต่ำสุด (ไม่นับ 0)
  const allPrices = courses.map(c => c.price).filter(p => p > 0);
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;

  // 4. ราคาสูงสุด
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;

  document.getElementById('statsRow').innerHTML = `
    <div class="stat-card">
      <div class="stat-val">${totalCourses}</div>
      <div class="stat-lbl">คอร์สทั้งหมด</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${totalTypes}</div>
      <div class="stat-lbl">จำนวนประเภท</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${minPrice.toLocaleString()}</div>
      <div class="stat-lbl">ราคาต่ำสุด (฿)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${maxPrice.toLocaleString()}</div>
      <div class="stat-lbl">ราคาสูงสุด (฿)</div>
    </div>
  `;
}

/* ══ Pills ══════════════════════════════════════════════ */
function buildPills() {
  const types = ['all', ...new Set(courses.map(c=>c.type))];
  document.getElementById('filterPills').innerHTML = types.map(t => {
    const lbl = t === 'all' ? `ทั้งหมด (${courses.length})` : (CAT[t]?.lbl || t);
    return `<button class="pill ${t===activeFilter?'active':''}" onclick="setFilter('${t}')">${lbl}</button>`;
  }).join('');
}
function setFilter(t) { activeFilter = t; page = 1; applyFilters(); buildPills(); }

/* ══ Filter + Sort ══════════════════════════════════════ */
function applyFilters() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  filtered = courses.filter(c => {
    const mt = activeFilter === 'all' || c.type === activeFilter;
    const mq = !q || c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    return mt && mq;
  });
  if (sortCol) applySort(false);
  page = 1;
  render();
}
function sortBy(col) {
  if (sortCol === col) sortAsc = !sortAsc;
  else { sortCol = col; sortAsc = true; }
  applySort(true);
}
function applySort(rerender) {
  filtered.sort((a,b) => {
    let va = a[sortCol], vb = b[sortCol];
    if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
    return (va < vb ? -1 : va > vb ? 1 : 0) * (sortAsc ? 1 : -1);
  });
  if (rerender) render();
}

/* ══ Render ══════════════════════════════════════════════ */
function render() {
  const start = (page - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('tableBody');
  const empty = document.getElementById('emptyState');

  if (!filtered.length) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    tbody.innerHTML = rows.map(c => `
      <tr>
        <td class="td-id">${c.id}</td>
        <td>${badge(c.type)}</td>
        <td class="td-name">${c.name}</td>
        <td class="td-num">${c.sessions > 0 ? c.sessions : '—'}</td>
        <td class="td-price">฿${c.price.toLocaleString('th-TH',{minimumFractionDigits:2})}</td>
        <td class="td-hrs">${c.hrs}</td>
        <td>
          <div class="td-actions">
            <button class="btn btn-edit" data-tip="แก้ไขคอร์ส" onclick="openEditModal('${c.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z"/></svg>
              แก้ไข
            </button>
            <button class="btn btn-del" data-tip="ลบคอร์ส" onclick="openDeleteModal('${c.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
              ลบ
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Sort icons
  document.querySelectorAll('.si').forEach(el => {
    const col = el.dataset.col;
    el.textContent = sortCol === col ? (sortAsc ? '▲' : '▼') : '⬍';
  });
  document.querySelectorAll('th').forEach(th => {
    const si = th.querySelector('.si');
    th.classList.toggle('sorted', si && si.dataset.col === sortCol);
  });

  // Subtitle
  document.getElementById('pageSubtitle').textContent =
    `${courses.length} คอร์ส · ${new Set(courses.map(c=>c.type)).size} ประเภท`;

  // Footer
  const total = filtered.length;
  const from = total ? start + 1 : 0;
  const to   = Math.min(start + PER_PAGE, total);
  document.getElementById('footerInfo').textContent = `แสดง ${from}–${to} จาก ${total} คอร์ส`;

  renderPagination(total);
}

function renderPagination(total) {
  const pages = Math.ceil(total / PER_PAGE);
  const el = document.getElementById('pagination');
  if (pages <= 1) { el.innerHTML = ''; return; }
  let h = '';
  if (page > 1) h += `<button class="pgbtn" onclick="goPage(${page-1})">‹</button>`;
  for (let i = 1; i <= pages; i++)
    h += `<button class="pgbtn ${i===page?'active':''}" onclick="goPage(${i})">${i}</button>`;
  if (page < pages) h += `<button class="pgbtn" onclick="goPage(${page+1})">›</button>`;
  el.innerHTML = h;
}
function goPage(p) { page = p; render(); }

/* ══ Delete Modal ════════════════════════════════════════ */
function openDeleteModal(id) {
  deleteId = id;
  const c = courses.find(x=>x.id===id);
  document.getElementById('delId').textContent   = c.id;
  document.getElementById('delName').textContent = c.name;
  document.getElementById('deleteOverlay').classList.add('open');
}
function closeDeleteModal() {
  document.getElementById('deleteOverlay').classList.remove('open');
  deleteId = null;
}
function confirmDelete() {
  if (!deleteId) return;
  const c = courses.find(x=>x.id===deleteId);
  courses = courses.filter(x=>x.id!==deleteId);
  closeDeleteModal();
  applyFilters(); buildPills(); renderStats();
  showToast(`ลบ "${c.name}" เรียบร้อย`, 'success');
}

/* ══ Add/Edit Modal ══════════════════════════════════════ */
function openAddModal() {
  editId = null;
  document.getElementById('formTitle').textContent = '➕ เพิ่มคอร์สใหม่';
  document.getElementById('formSub').textContent   = 'กรอกข้อมูลคอร์สที่ต้องการเพิ่ม';
  document.getElementById('formSaveBtn').textContent = 'บันทึกคอร์ส';
  clearForm();
  hideNewTypeForm();
  document.getElementById('fId').readOnly = false;
  document.getElementById('formOverlay').classList.add('open');
  setTimeout(() => document.getElementById('fId').focus(), 250);
}
function openEditModal(id) {
  editId = id;
  const c = courses.find(x=>x.id===id);
  document.getElementById('formTitle').textContent   = '✏️ แก้ไขคอร์ส';
  document.getElementById('formSub').textContent     = `กำลังแก้ไข: ${c.id}`;
  document.getElementById('formSaveBtn').textContent = 'บันทึกการเปลี่ยนแปลง';
  clearForm();
  hideNewTypeForm();
  document.getElementById('fId').value = c.id; document.getElementById('fId').readOnly = true;
  document.getElementById('fType').value = c.type;
  document.getElementById('fName').value = c.name;
  document.getElementById('fSessions').value = c.sessions;
  document.getElementById('fPrice').value = c.price;
  document.getElementById('fHrs').value = c.hrs;
  document.getElementById('formOverlay').classList.add('open');
  setTimeout(() => document.getElementById('fName').focus(), 250);
}
function closeFormModal() {
  document.getElementById('formOverlay').classList.remove('open');
  editId = null;
}
function clearForm() {
  ['fId','fName','fSessions','fPrice','fHrs'].forEach(id => document.getElementById(id).value='');
  document.getElementById('fType').value = '';
}
function saveCourse() {
  const id       = document.getElementById('fId').value.trim().toUpperCase();
  const type     = document.getElementById('fType').value;
  const name     = document.getElementById('fName').value.trim();
  const sessions = parseInt(document.getElementById('fSessions').value)||0;
  const price    = parseFloat(document.getElementById('fPrice').value)||0;
  const hrs      = document.getElementById('fHrs').value.trim() || '—';

  if (!id || !type || !name || !price) { showToast('กรุณากรอกข้อมูลที่จำเป็นให้ครบ', 'error'); return; }
  if (!editId && courses.find(x=>x.id===id)) { showToast(`รหัส ${id} มีอยู่แล้วในระบบ`, 'error'); return; }

  if (editId) {
    const i = courses.findIndex(x=>x.id===editId);
    courses[i] = { id, type, name, sessions, price, hrs };
    showToast(`อัปเดต "${name}" เรียบร้อย`, 'success');
  } else {
    courses.push({ id, type, name, sessions, price, hrs });
    showToast(`เพิ่ม "${name}" เรียบร้อย`, 'success');
  }
  closeFormModal();
  applyFilters(); buildPills(); renderStats();
}

/* ══ Helpers ══════════════════════════════════════════════ */
function bgClose(e, id, fn) { if (e.target.id === id) fn(); }

/* ══ Toast ════════════════════════════════════════════════ */
function showToast(msg, type='default') {
  const stack = document.getElementById('toastStack');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const ico = type==='success' ? '✓' : type==='error' ? '✕' : 'ℹ';
  el.innerHTML = `<span style="font-weight:600">${ico}</span><span>${msg}</span>`;
  stack.appendChild(el);
  setTimeout(() => { el.classList.add('leaving'); setTimeout(()=>el.remove(),200); }, 3000);
}

/* ══ Keyboard ════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key==='Escape') { closeDeleteModal(); closeFormModal(); }
  if ((e.metaKey||e.ctrlKey) && e.key==='k') {
    e.preventDefault(); document.getElementById('searchInput').focus();
  }
});

/* ══ Init ════════════════════════════════════════════════ */
populateTypeSelect();
buildPills();
applyFilters();
renderStats();