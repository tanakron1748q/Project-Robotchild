// ==========================================
//  student-info-page.js
//  Robotschild — Students + Enrollment Modal
// ==========================================

// ---------- Students Data ----------
const studentsData = [
    { id: 1,  name: "เพชรเพทาย อัตถาพร",       nickname: "ซีโน่",     grade: "ป.1", school: "จำรัสวิทยา",             phone: "092-396-1447" },
    { id: 2,  name: "ชัยภักดิ์ สุขวิจิตต์",     nickname: "อาร์ต",     grade: "ม.5", school: "สังคีตวิทยา",            phone: "063-174-8177" },
    { id: 3,  name: "กรวิชญ์ วิเชียรทอง",       nickname: "กวิน",      grade: "ป.3", school: "สาธิตปทุม",              phone: "062-701-5858" },
    { id: 4,  name: "ณัฐนนท์ เดชสุภา",          nickname: "เพิร์ช",    grade: "ป.2", school: "โชคชัยรังสิต",           phone: "086-568-3841" },
    { id: 5,  name: "ศศินา รัตนสินทวีสุข",      nickname: "แพรว",      grade: "K3",  school: "นานาชาติแคลิฟอร์เนีย",  phone: "081-855-4936" },
    { id: 6,  name: "ชัญญานุช อยู่เย็น",        nickname: "พริบพราว",  grade: "ป.4", school: "ธัญวิทย์",               phone: "062-329-4453" },
    { id: 7,  name: "ภูริชญา ไชยเดช",           nickname: "ลูกอินซ์",  grade: "อ.2", school: "ภูมิทอง",                phone: "081-806-8633" },
    { id: 8,  name: "กฤษฎิ์อนันต์ วิวัฒน์พัฒนะ", nickname: "แฮมเมอร์", grade: "ป.6", school: "สารสาสน์วิเทศ",        phone: "085-810-3039" },
    { id: 9,  name: "ณัฐสินี อินทนากรวิวัฒน์",  nickname: "แพรวดาว",  grade: "ป.3", school: "เซนต์โยเซฟเมืองเอก",    phone: "083-562-4696" },
    { id: 10, name: "พันธนภัทร รังษิมาพิกุล",   nickname: "ซีโน่",     grade: "ป.3", school: "Harrow International",   phone: "088-782-4656" },
    { id: 11, name: "ภาคิณ สายยิ้ม",            nickname: "ภาคิณ",     grade: "ป.1", school: "อัสสัมชัญ",              phone: "089-488-0948" },
    { id: 12, name: "ธนกฤต มั่นคง",             nickname: "ปันปัน",    grade: "ป.2", school: "แย้มสะอาด",              phone: "081-123-4567" },
    { id: 13, name: "พิชชาภา สวัสดิ์ดี",        nickname: "เอย",       grade: "ม.2", school: "สวนกุหลาบรังสิต",        phone: "095-987-6543" },
    { id: 14, name: "วรเมธ เอกชัย",             nickname: "เจเจ",      grade: "ป.5", school: "ไผทอุดมศึกษา",           phone: "082-445-6678" },
    { id: 15, name: "อนันดา ปรีดากุล",          nickname: "นานา",      grade: "อ.3", school: "อนุบาลรังสิต",           phone: "080-112-2233" },
    { id: 16, name: "กิตติภพ ทองคำ",            nickname: "วิน",       grade: "ม.3", school: "หอวังปทุม",              phone: "089-334-4556" },
    { id: 17, name: "นภัสสร รักษ์ดี",           nickname: "ใบเฟิร์น",  grade: "ป.4", school: "บริบูรณ์ศิลป์",          phone: "061-556-6778" },
    { id: 18, name: "จิรพัฒน์ มีสุข",           nickname: "ออโต้",     grade: "ป.6", school: "สาธิตละอออุทิศ",         phone: "088-990-0011" },
    { id: 19, name: "ศุภกร แก้วประเสริฐ",       nickname: "กาย",       grade: "ม.1", school: "พระหฤทัยคอนแวนต์",      phone: "084-223-3344" },
    { id: 20, name: "ธัญชนก สุขใจ",             nickname: "มายด์",     grade: "ป.3", school: "สายปัญญา",               phone: "087-445-5566" },
    { id: 21, name: "อัครพล พลอยดี",            nickname: "ภูมิ",      grade: "ม.4", school: "ปทุมวิไล",               phone: "099-887-7766" },
    { id: 22, name: "รินรดา สดใส",              nickname: "แก้ม",      grade: "ป.2", school: "ขจรโรจน์",               phone: "081-223-4455" },
];

// ---------- Mockup History Generator ----------
function generateHistory(student) {
    const courses = [
        { id: "RC-101", type: "กลุ่ม",  name: "Robotics Beginner", price: 4500, discount: 0,   payment: "โอนเงิน", receipt: "RC24-0081", status: "ออกแล้ว", staff: "ครูอ้อม", note: "-",          date: "12/01/67", time: "09:00–11:00", sessions: 8,  equipment: "ชุด EV3" },
        { id: "RC-205", type: "เดี่ยว", name: "Python for Kids",   price: 6000, discount: 500, payment: "เงินสด",  receipt: "RC24-0102", status: "ออกแล้ว", staff: "ครูบิ๊ก", note: "-",          date: "03/03/67", time: "13:00–15:00", sessions: 10, equipment: "-" },
        { id: "RC-310", type: "กลุ่ม",  name: "AI Explorers",      price: 5500, discount: 0,   payment: "โอนเงิน", receipt: "RC24-0145", status: "รอออก",   staff: "ครูแนน", note: "รอผู้ปกครอง", date: "15/05/67", time: "10:00–12:00", sessions: 6,  equipment: "-" },
    ];
    return courses.slice(0, (student.id % 2) + 1).map((c, i) => ({
        seq: i + 1, studentName: student.name, studentNickname: student.nickname,
        grade: student.grade, school: student.school, phone: student.phone,
        ...c, netAmount: c.price - c.discount,
    }));
}

// ---------- State ----------
let filteredData = [...studentsData];
let nextId = studentsData.length + 1;

// ---------- Elements ----------
const tbody        = document.getElementById('studentTableBody');
const searchInput  = document.getElementById('searchInput');
const countDisplay = document.getElementById('studentCount');
const emptyState   = document.getElementById('emptyState');
const historyModal = document.getElementById('historyModal');
const modalTitle   = document.getElementById('modalStudentName');
const historyBody  = document.getElementById('historyTableBody');

// ---------- Render Table ----------
function renderTable(data) {
    tbody.innerHTML = '';
    countDisplay.textContent = data.length;

    if (data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color:var(--gray-400);font-family:var(--font-mono);font-size:12px;">${index + 1}</td>
            <td><span class="student-name">${student.name}</span></td>
            <td style="color:var(--gray-500);font-size:13px;">${student.nickname}</td>
            <td><span class="grade-badge">${student.grade}</span></td>
            <td style="color:var(--gray-600);font-size:13px;">${student.school || '—'}</td>
            <td><span class="phone-text">${student.phone}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon" title="ประวัติการลงทะเบียน" onclick="openHistory(${student.id})">
                        <i class="ti ti-history"></i>
                    </button>
                    <button class="btn-icon btn-icon-add" title="เพิ่มคอร์ส" onclick="openEnrollModal(${student.id})">
                        <i class="ti ti-plus"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ---------- Open History Modal ----------
function openHistory(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    modalTitle.textContent = `${student.name}  (${student.nickname})`;
    const history = generateHistory(student);
    historyBody.innerHTML = '';

    history.forEach(h => {
        const isPaid = h.status === 'ออกแล้ว';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="color:var(--gray-400);font-family:var(--font-mono);font-size:11px;">${h.seq}</td>
            <td class="cell-mono">${h.date}</td>
            <td class="cell-mono">${h.id}</td>
            <td>${h.type}</td>
            <td class="cell-name">${h.name}</td>
            <td class="cell-mono">${h.price.toLocaleString()}</td>
            <td class="cell-mono" style="color:var(--gray-400);">${h.discount > 0 ? '-' + h.discount.toLocaleString() : '-'}</td>
            <td class="cell-mono" style="font-weight:700;color:var(--black);">${h.netAmount.toLocaleString()}</td>
            <td>${h.payment}</td>
            <td class="cell-mono">${h.receipt}</td>
            <td><span class="status-badge ${isPaid ? 'status-paid' : 'status-pending'}">${h.status}</span></td>
            <td>${h.staff}</td>
            <td style="color:var(--gray-400);">${h.note}</td>
            <td class="cell-mono">${h.date}</td>
            <td class="cell-mono">${h.time}</td>
            <td class="cell-mono" style="text-align:center;">${h.sessions}</td>
            <td>${h.equipment}</td>
        `;
        historyBody.appendChild(row);
    });

    historyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    historyModal.classList.add('hidden');
    document.body.style.overflow = '';
}

historyModal.addEventListener('click', e => { if (e.target === historyModal) closeModal(); });

// ---------- Search ----------
searchInput.addEventListener('input', function(e) {
    const kw = e.target.value.toLowerCase().trim();
    filteredData = studentsData.filter(s =>
        s.name.toLowerCase().includes(kw) ||
        s.nickname.toLowerCase().includes(kw) ||
        s.grade.toLowerCase().includes(kw) ||
        s.school.toLowerCase().includes(kw) ||
        s.phone.includes(kw)
    );
    renderTable(filteredData);
});


// ============================================================
//  ENROLLMENT MODAL
// ============================================================

const enrollModal    = document.getElementById('enrollModal');
const courseEl       = document.getElementById('eCourse');
const discountEl     = document.getElementById('eDiscount');
const statusEl       = document.getElementById('eStatus');
const statusDot      = document.getElementById('statusIndicator');
const learnDateEl    = document.getElementById('eLearnDate');
const coursePill     = document.getElementById('coursePill');
const coursePillText = document.getElementById('coursePillText');
const coursePillPrice= document.getElementById('coursePillPrice');

let enrollBasePrice = 0;
let prefillStudentId = null;

// Watched field IDs for progress
const stepFields = {
    1: ['eFullName', 'eGrade', 'ePhone'],
    2: ['eCourse', 'eLearnDate'],
    3: [],
};

// ---------- Open Enrollment Modal ----------
window.openEnrollModal = function(studentId = null) {
    prefillStudentId = studentId;
    resetEnrollForm();

    // If opening from a specific student row, prefill
    if (studentId !== null) {
        const student = studentsData.find(s => s.id === studentId);
        if (student) {
            document.getElementById('eFullName').value  = student.name;
            document.getElementById('eNickname').value  = student.nickname;
            document.getElementById('eGrade').value     = student.grade;
            document.getElementById('eSchool').value    = student.school || '';
            document.getElementById('ePhone').value     = student.phone;
            updateSidebarSteps();
            updatePaySummary();
        }
    }

    enrollModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus first field
    setTimeout(() => {
        const firstEmpty = ['eFullName','eNickname','eGrade','eSchool','ePhone'].find(id => !document.getElementById(id).value);
        const target = document.getElementById(firstEmpty || 'eCourse');
        target?.focus();
    }, 250);
};

// ---------- Close Enrollment Modal ----------
window.closeEnrollModal = function() {
    enrollModal.classList.add('hidden');
    document.body.style.overflow = '';
    prefillStudentId = null;
};

// Close on backdrop click
enrollModal.addEventListener('click', e => {
    if (e.target === enrollModal) closeEnrollModal();
});

// ---------- Reset Form ----------
function resetEnrollForm() {
    ['eFullName','eNickname','eGrade','eSchool','ePhone','eEquipment','eStaff','eNote'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.classList.remove('ef-invalid'); }
    });

    document.getElementById('eSessions').value = '8';
    document.getElementById('eDiscount').value = '0';

    if (courseEl) { courseEl.value = ''; courseEl.classList.remove('ef-invalid'); }
    if (statusEl) statusEl.value = 'ออกแล้ว';

    enrollBasePrice = 0;
    coursePill.classList.add('hidden');

    learnDateEl.valueAsDate = new Date();

    // Clear errors
    document.querySelectorAll('.ef-err').forEach(el => el.classList.remove('visible'));

    updatePaySummary();
    updateSidebarSteps();
    syncStatusDot();

    // Scroll content back to top
    const inner = document.querySelector('.enroll-content-inner');
    if (inner) inner.scrollTop = 0;
}

// ---------- Phone Formatting ----------
const phoneEl = document.getElementById('ePhone');
if (phoneEl) {
    phoneEl.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 10);
        let formatted = val.substring(0, 3);
        if (val.length > 3) formatted += '-' + val.substring(3, 6);
        if (val.length > 6) formatted += '-' + val.substring(6, 10);
        e.target.value = formatted;
        updateSidebarSteps();
    });
}

// ---------- Course Change ----------
if (courseEl) {
    courseEl.addEventListener('change', e => {
        const opt = e.target.options[e.target.selectedIndex];
        enrollBasePrice = parseFloat(opt.getAttribute('data-price')) || 0;

        if (enrollBasePrice > 0) {
            coursePillText.textContent  = opt.text;
            coursePillPrice.textContent = '฿' + enrollBasePrice.toLocaleString('th-TH');
            coursePill.classList.remove('hidden');
        } else {
            coursePill.classList.add('hidden');
        }

        updatePaySummary();
        updateSidebarSteps();
    });
}

// ---------- Discount Change ----------
if (discountEl) {
    discountEl.addEventListener('input', () => {
        let v = parseFloat(discountEl.value) || 0;
        if (v < 0) { discountEl.value = 0; v = 0; }
        if (v > enrollBasePrice) { discountEl.value = enrollBasePrice; v = enrollBasePrice; }
        updatePaySummary();
    });
}

// ---------- Pay Summary ----------
function updatePaySummary() {
    const disc = parseFloat(discountEl?.value) || 0;
    const net  = enrollBasePrice - disc;

    document.getElementById('sumPrice').textContent    = enrollBasePrice > 0 ? '฿' + enrollBasePrice.toLocaleString('th-TH') : '—';
    document.getElementById('sumDiscount').textContent = disc > 0            ? '−฿' + disc.toLocaleString('th-TH')           : '—';
    document.getElementById('sumNet').textContent      = enrollBasePrice > 0 ? '฿' + net.toLocaleString('th-TH')             : '—';
}

// ---------- Status Dot ----------
function syncStatusDot() {
    if (!statusDot || !statusEl) return;
    statusDot.style.background = statusEl.value === 'ออกแล้ว' ? '#1a7a3c' : '#c0392b';
}

if (statusEl) statusEl.addEventListener('change', syncStatusDot);

// ---------- Live listeners for sidebar steps ----------
['eFullName','eGrade','eSchool'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateSidebarSteps);
});

['eCourse','eLearnDate','eStatus','eCourseType'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateSidebarSteps);
});

// ---------- Sidebar step progress ----------
function isFieldFilled(id) {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();
    return val !== '' && val !== '— กรุณาเลือกคอร์ส —';
}

function updateSidebarSteps() {
    const s1Done = stepFields[1].every(isFieldFilled);
    const s2Done = stepFields[2].every(isFieldFilled);

    // Step 1
    setStepState('sbStep1', 'sbConn1', s1Done ? 'done' : 'active');

    // Step 2
    if (s1Done) {
        setStepState('sbStep2', 'sbConn2', s2Done ? 'done' : 'active');
    } else {
        setStepState('sbStep2', 'sbConn2', 'idle');
    }

    // Step 3
    if (s1Done && s2Done) {
        setStepState('sbStep3', null, 'active');
    } else {
        setStepState('sbStep3', null, 'idle');
    }
}

function setStepState(stepId, connId, state) {
    const stepEl = document.getElementById(stepId);
    if (!stepEl) return;

    stepEl.className = 'sb-step';
    if (state === 'done')   stepEl.classList.add('done');
    if (state === 'active') stepEl.classList.add('active');

    if (connId) {
        const connEl = document.getElementById(connId);
        if (connEl) {
            connEl.classList.toggle('done', state === 'done');
        }
    }
}

// ---------- Validation ----------
function validateEnroll() {
    let valid = true;

    const required = [
        { id: 'eFullName',  errId: 'errFullName',  msg: 'กรุณากรอกชื่อ-นามสกุล' },
        { id: 'eGrade',     errId: 'errGrade',     msg: 'กรุณากรอกระดับชั้น' },
        { id: 'ePhone',     errId: 'errPhone',     msg: 'กรุณากรอกเบอร์โทรศัพท์' },
        { id: 'eCourse',    errId: 'errCourse',    msg: 'กรุณาเลือกคอร์สเรียน' },
        { id: 'eLearnDate', errId: 'errLearnDate', msg: 'กรุณาเลือกวันที่' },
    ];

    required.forEach(({ id, errId, msg }) => {
        const el    = document.getElementById(id);
        const errEl = document.getElementById(errId);
        const val   = el ? el.value.trim() : '';
        const empty = val === '' || val === '— กรุณาเลือกคอร์ส —';

        if (empty) {
            el?.classList.add('ef-invalid');
            if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
            valid = false;
        } else {
            el?.classList.remove('ef-invalid');
            if (errEl) errEl.classList.remove('visible');
        }
    });

    // Clear invalid on input
    required.forEach(({ id, errId }) => {
        const el = document.getElementById(id);
        const errEl = document.getElementById(errId);
        el?.addEventListener('input',  () => { el.classList.remove('ef-invalid'); errEl?.classList.remove('visible'); }, { once: true });
        el?.addEventListener('change', () => { el.classList.remove('ef-invalid'); errEl?.classList.remove('visible'); }, { once: true });
    });

    return valid;
}

// ---------- Submit ----------
window.submitEnroll = function() {
    if (!validateEnroll()) {
        // Scroll to first invalid
        const firstInvalid = document.querySelector('.ef-invalid');
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const btn = document.getElementById('enrollSubmitBtn');
    btn.classList.add('loading');
    btn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 0.8s linear infinite"></i> กำลังบันทึก...';

    setTimeout(() => {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="ti ti-check"></i> บันทึกข้อมูล';

        // Build new student
        const newStudent = buildStudentFromForm();

        // Add to data array if it's a new student
        if (prefillStudentId === null) {
            studentsData.push(newStudent);
            filteredData = [...studentsData];
            renderTable(filteredData);
        }

        closeEnrollModal();
        showToast('บันทึกข้อมูลเรียบร้อยแล้ว ✓');

        // Show receipt after short delay
        setTimeout(() => showReceipt(newStudent), 500);
    }, 900);
};

function buildStudentFromForm() {
    const name     = document.getElementById('eFullName').value.trim();
    const nickname = document.getElementById('eNickname').value.trim() || '—';
    const grade    = document.getElementById('eGrade').value.trim();
    const school   = document.getElementById('eSchool').value.trim() || '—';
    const phone    = document.getElementById('ePhone').value.trim();

    const courseOpt  = courseEl.options[courseEl.selectedIndex];
    const courseId   = courseOpt.value;
    const courseName = courseOpt.text;
    const courseType = document.getElementById('eCourseType').value;
    const learnDate  = document.getElementById('eLearnDate').value;
    const sessions   = parseInt(document.getElementById('eSessions').value) || 8;
    const equipment  = document.getElementById('eEquipment').value.trim() || '—';
    const payment    = document.getElementById('ePaymentMethod').value;
    const status     = document.getElementById('eStatus').value;
    const discount   = parseFloat(discountEl.value) || 0;
    const staff      = document.getElementById('eStaff').value.trim() || '—';
    const note       = document.getElementById('eNote').value.trim() || '—';
    const net        = enrollBasePrice - discount;

    // Format date
    let formattedDate = '—';
    if (learnDate) {
        const d = new Date(learnDate);
        const dd   = String(d.getDate()).padStart(2,'0');
        const mm   = String(d.getMonth()+1).padStart(2,'0');
        const yy   = String(d.getFullYear() + 543).slice(-2);
        formattedDate = `${dd}/${mm}/${yy}`;
    }

    // Receipt number
    const ts  = Date.now();
    const rcpNo = `RC${String(new Date().getFullYear()).slice(-2)}-${String(ts).slice(-4)}`;

    return {
        id: prefillStudentId !== null ? prefillStudentId : nextId++,
        name, nickname, grade, school, phone,
        // enrollment info (for receipt)
        _enroll: { courseId, courseName, courseType, learnDate: formattedDate, sessions, equipment, payment, status, discount, staff, note, price: enrollBasePrice, net, rcpNo }
    };
}

// ---------- Receipt ----------
function showReceipt(student) {
    const e = student._enroll;
    if (!e) return;

    const now     = new Date();
    const rcpDate = now.toLocaleDateString('th-TH', { day:'2-digit', month:'2-digit', year:'numeric' });

    document.getElementById('rcpName').textContent     = student.name;
    document.getElementById('rcpDate').textContent     = rcpDate;
    document.getElementById('rcpNo').textContent       = e.rcpNo;
    document.getElementById('rcpCode').textContent     = e.courseId || '—';
    document.getElementById('rcpCourseName').textContent = e.courseName || '—';
    document.getElementById('rcpFullPrice').textContent  = e.price.toLocaleString('th-TH', { minimumFractionDigits: 2 });
    document.getElementById('rcpTotal').textContent      = e.price.toLocaleString('th-TH', { minimumFractionDigits: 2 });
    document.getElementById('rcpNet').textContent        = e.net.toLocaleString('th-TH', { minimumFractionDigits: 2 });

    document.getElementById('chkCash').checked   = e.payment === 'เงินสด';
    document.getElementById('chkCredit').checked = e.payment === 'บัตรเครดิต';
    document.getElementById('chkQR').checked     = e.payment === 'โอนเงิน';

    document.getElementById('receiptOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

window.closeReceipt = function() {
    document.getElementById('receiptOverlay').classList.add('hidden');
    document.body.style.overflow = '';
};

document.getElementById('receiptOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) window.closeReceipt();
});

// ---------- Toast ----------
function showToast(msg = 'บันทึกข้อมูลเรียบร้อยแล้ว') {
    const toast = document.getElementById('toastEl');
    const msgEl = document.getElementById('toastMsg');
    if (!toast) return;
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- Keyboard close ----------
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!document.getElementById('receiptOverlay').classList.contains('hidden')) {
            window.closeReceipt();
        } else if (!enrollModal.classList.contains('hidden')) {
            closeEnrollModal();
        } else if (!historyModal.classList.contains('hidden')) {
            closeModal();
        }
    }
});

// ---------- Spin animation for loader ----------
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleEl);

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    renderTable(studentsData);
    learnDateEl.valueAsDate = new Date();
    syncStatusDot();
    updateSidebarSteps();
    updatePaySummary();
});
