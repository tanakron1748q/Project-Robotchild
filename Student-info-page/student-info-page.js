// ---------- Students Data ----------
const studentsData = [
    { id: 1,  name: "เพชรเพทาย อัตถาพร",     nickname: "ซีโน่",     grade: "ป.1", school: "จำรัสวิทยา",             phone: "092-396-1447" },
    { id: 2,  name: "ชัยภักดิ์ สุขวิจิตต์",   nickname: "อาร์ต",     grade: "ม.5", school: "สังคีตวิทยา",            phone: "063-174-8177" },
    { id: 3,  name: "กรวิชญ์ วิเชียรทอง",     nickname: "กวิน",      grade: "ป.3", school: "สาธิตปทุม",              phone: "062-701-5858" },
    { id: 4,  name: "ณัฐนนท์ เดชสุภา",        nickname: "เพิร์ช",    grade: "ป.2", school: "โชคชัยรังสิต",           phone: "086-568-3841" },
    { id: 5,  name: "ศศินา รัตนสินทวีสุข",    nickname: "แพรว",      grade: "K3",  school: "นานาชาติแคลิฟอร์เนีย",  phone: "081-855-4936" },
    { id: 6,  name: "ชัญญานุช อยู่เย็น",      nickname: "พริบพราว",  grade: "ป.4", school: "ธัญวิทย์",               phone: "062-329-4453" },
    { id: 7,  name: "ภูริชญา ไชยเดช",         nickname: "ลูกอินซ์",  grade: "อ.2", school: "ภูมิทอง",                phone: "081-806-8633" },
    { id: 8,  name: "กฤษฎิ์อนันต์ วิวัฒน์พัฒนะ", nickname: "แฮมเมอร์", grade: "ป.6", school: "สารสาสน์วิเทศ",      phone: "085-810-3039" },
    { id: 9,  name: "ณัฐสินี อินทนากรวิวัฒน์",nickname: "แพรวดาว",  grade: "ป.3", school: "เซนต์โยเซฟเมืองเอก",   phone: "083-562-4696" },
    { id: 10, name: "พันธนภัทร รังษิมาพิกุล", nickname: "ซีโน่",     grade: "ป.3", school: "Harrow International",   phone: "088-782-4656" },
    { id: 11, name: "ภาคิณ สายยิ้ม",          nickname: "ภาคิณ",     grade: "ป.1", school: "อัสสัมชัญ",              phone: "089-488-0948" },
    { id: 12, name: "ธนกฤต มั่นคง",           nickname: "ปันปัน",    grade: "ป.2", school: "แย้มสะอาด",              phone: "081-123-4567" },
    { id: 13, name: "พิชชาภา สวัสดิ์ดี",      nickname: "เอย",       grade: "ม.2", school: "สวนกุหลาบรังสิต",        phone: "095-987-6543" },
    { id: 14, name: "วรเมธ เอกชัย",           nickname: "เจเจ",      grade: "ป.5", school: "ไผทอุดมศึกษา",           phone: "082-445-6678" },
    { id: 15, name: "อนันดา ปรีดากุล",        nickname: "นานา",      grade: "อ.3", school: "อนุบาลรังสิต",           phone: "080-112-2233" },
    { id: 16, name: "กิตติภพ ทองคำ",          nickname: "วิน",       grade: "ม.3", school: "หอวังปทุม",              phone: "089-334-4556" },
    { id: 17, name: "นภัสสร รักษ์ดี",         nickname: "ใบเฟิร์น",  grade: "ป.4", school: "บริบูรณ์ศิลป์",          phone: "061-556-6778" },
    { id: 18, name: "จิรพัฒน์ มีสุข",         nickname: "ออโต้",     grade: "ป.6", school: "สาธิตละอออุทิศ",         phone: "088-990-0011" },
    { id: 19, name: "ศุภกร แก้วประเสริฐ",     nickname: "กาย",       grade: "ม.1", school: "พระหฤทัยคอนแวนต์",      phone: "084-223-3344" },
    { id: 20, name: "ธัญชนก สุขใจ",           nickname: "มายด์",     grade: "ป.3", school: "สายปัญญา",               phone: "087-445-5566" },
    { id: 21, name: "อัครพล พลอยดี",          nickname: "ภูมิ",      grade: "ม.4", school: "ปทุมวิไล",               phone: "099-887-7766" },
    { id: 22, name: "รินรดา สดใส",            nickname: "แก้ม",      grade: "ป.2", school: "ขจรโรจน์",               phone: "081-223-4455" },
];

// ---------- Mockup History Generator ----------
function generateHistory(student) {
    const courses = [
        { id: "RC-101", type: "กลุ่ม", name: "Robotics Beginner", price: 4500, discount: 0,   payment: "โอนเงิน", receipt: "RC24-0081", status: "ออกแล้ว", staff: "ครูอ้อม", note: "-",          date: "12/01/67", time: "09:00–11:00", sessions: 8,  equipment: "ชุด EV3" },
        { id: "RC-205", type: "เดี่ยว", name: "Python for Kids",   price: 6000, discount: 500, payment: "เงินสด",  receipt: "RC24-0102", status: "ออกแล้ว", staff: "ครูบิ๊ก", note: "-",          date: "03/03/67", time: "13:00–15:00", sessions: 10, equipment: "-" },
        { id: "RC-310", type: "กลุ่ม", name: "AI Explorers",       price: 5500, discount: 0,   payment: "โอนเงิน", receipt: "RC24-0145", status: "รอออก",   staff: "ครูแนน", note: "รอผู้ปกครอง", date: "15/05/67", time: "10:00–12:00", sessions: 6,  equipment: "-" },
    ];
    // Slice 1–2 courses per student based on id
    return courses.slice(0, (student.id % 2) + 1).map((c, i) => ({
        seq: i + 1,
        studentName: student.name,
        studentNickname: student.nickname,
        grade: student.grade,
        school: student.school,
        phone: student.phone,
        ...c,
        netAmount: c.price - c.discount,
    }));
}

// ---------- State ----------
let filteredData = [...studentsData];

// ---------- Elements ----------
const tbody         = document.getElementById('studentTableBody');
const searchInput   = document.getElementById('searchInput');
const countDisplay  = document.getElementById('studentCount');
const emptyState    = document.getElementById('emptyState');
const historyModal  = document.getElementById('historyModal');
const modalTitle    = document.getElementById('modalStudentName');
const historyBody   = document.getElementById('historyTableBody');

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
            <td style="color:var(--gray-600);font-size:13px;">${student.school}</td>
            <td><span class="phone-text">${student.phone}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon" title="ประวัติการลงทะเบียน" onclick="openHistory(${student.id})">
                        <i class="ti ti-history"></i>
                    </button>
                    <button class="btn-icon" title="เพิ่มคอร์ส" onclick="void(0)">
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

// ---------- Close Modal ----------
function closeModal() {
    historyModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Close on backdrop click
historyModal.addEventListener('click', function(e) {
    if (e.target === historyModal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

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

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    renderTable(studentsData);
});