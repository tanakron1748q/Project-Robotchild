// ---------- Mockup Data (Extended) ----------
const studentsData = [
    { id: 1, name: "เพชรเพทาย อัตถาพร", nickname: "ซีโน่", grade: "ป.1", school: "จำรัสวิทยา", phone: "092-396-1447" },
    { id: 2, name: "ชัยภักดิ์ สุขวิจิตต์", nickname: "อาร์ต", grade: "ม.5", school: "สังคีตวิทยา", phone: "063-174-8177" },
    { id: 3, name: "กรวิชญ์ วิเชียรทอง", nickname: "กวิน", grade: "ป.3", school: "สาธิตปทุม", phone: "062-701-5858" },
    { id: 4, name: "ณัฐนนท์ เดชสุภา", nickname: "เพิร์ช", grade: "ป.2", school: "โชคชัยรังสิต", phone: "086-568-3841" },
    { id: 5, name: "ศศินา รัตนสินทวีสุข", nickname: "แพรว", grade: "K3", school: "นานาชาติแคลิฟอร์เนีย", phone: "081-855-4936" },
    { id: 6, name: "ชัญญานุช อยู่เย็น", nickname: "พริบพราว", grade: "ป.4", school: "ธัญวิทย์", phone: "062-329-4453" },
    { id: 7, name: "ภูริชญา ไชยเดช", nickname: "ลูกอินซ์", grade: "อ.2", school: "ภูมิทอง", phone: "081-806-8633" },
    { id: 8, name: "กฤษฎิ์อนันต์ วิวัฒน์พัฒนะ", nickname: "แฮมเมอร์", grade: "ป.6", school: "สารสาสน์วิเทศ", phone: "085-810-3039" },
    { id: 9, name: "ณัฐสินี อินทนากรวิวัฒน์", nickname: "แพรวดาว", grade: "ป.3", school: "เซนต์โยเซฟเมืองเอก", phone: "083-562-4696" },
    { id: 10, name: "พันธนภัทร รังษิมาพิกุล", nickname: "ซีโน่", grade: "ป.3", school: "Harrow International", phone: "088-782-4656" },
    { id: 11, name: "ภาคิณ สายยิ้ม", nickname: "ภาคิณ", grade: "ป.1", school: "อัสสัมชัญ", phone: "089-488-0948" },
    { id: 12, name: "ธนกฤต มั่นคง", nickname: "ปันปัน", grade: "ป.2", school: "แย้มสะอาด", phone: "081-123-4567" },
    { id: 13, name: "พิชชาภา สวัสดิ์ดี", nickname: "เอย", grade: "ม.2", school: "สวนกุหลาบรังสิต", phone: "095-987-6543" },
    { id: 14, name: "วรเมธ เอกชัย", nickname: "เจเจ", grade: "ป.5", school: "ไผทอุดมศึกษา", phone: "082-445-6678" },
    { id: 15, name: "อนันดา ปรีดากุล", nickname: "นานา", grade: "อ.3", school: "อนุบาลรังสิต", phone: "080-112-2233" },
    { id: 16, name: "กิตติภพ ทองคำ", nickname: "วิน", grade: "ม.3", school: "หอวังปทุม", phone: "089-334-4556" },
    { id: 17, name: "นภัสสร รักษ์ดี", nickname: "ใบเฟิร์น", grade: "ป.4", school: "บริบูรณ์ศิลป์", phone: "061-556-6778" },
    { id: 18, name: "จิรพัฒน์ มีสุข", nickname: "ออโต้", grade: "ป.6", school: "สาธิตละอออุทิศ", phone: "088-990-0011" },
    { id: 19, name: "ศุภกร แก้วประเสริฐ", nickname: "กาย", grade: "ม.1", school: "พระหฤทัยคอนแวนต์", phone: "084-223-3344" },
    { id: 20, name: "ธัญชนก สุขใจ", nickname: "มายด์", grade: "ป.3", school: "สายปัญญา", phone: "087-445-5566" },
    { id: 21, name: "อัครพล พลอยดี", nickname: "ภูมิ", grade: "ม.4", school: "ปทุมวิไล", phone: "099-887-7766" },
    { id: 22, name: "รินรดา สดใส", nickname: "แก้ม", grade: "ป.2", school: "ขจรโรจน์", phone: "081-223-4455" }
];

// ---------- State ----------
let filteredData = [...studentsData];

// ---------- Elements ----------
const tbody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const countDisplay = document.getElementById('studentCount');
const emptyState = document.getElementById('emptyState');

// ---------- Render Function ----------
function renderTable(data) {
    tbody.innerHTML = ''; 
    countDisplay.innerText = data.length;

    if (data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    data.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><span class="student-name">${student.name}</span></td>
            <td>${student.nickname}</td>
            <td><span class="grade-badge">${student.grade}</span></td>
            <td>${student.school}</td>
            <td><span class="phone-text">${student.phone}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon" title="ดูรายละเอียด" onclick="alert('ดูรายละเอียดของ ${student.nickname}')">
                        <i class="ti ti-info-circle"></i>
                    </button>
                    <button class="btn-icon" title="ลงทะเบียนเพิ่ม" onclick="alert('ลงทะเบียนเพิ่มให้ ${student.nickname}')">
                        <i class="ti ti-plus"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ---------- Search System ----------
searchInput.addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase().trim();
    
    filteredData = studentsData.filter(student => {
        return student.name.toLowerCase().includes(keyword) || 
               student.nickname.toLowerCase().includes(keyword) ||
               student.grade.toLowerCase().includes(keyword) ||
               student.school.toLowerCase().includes(keyword) ||
               student.phone.includes(keyword);
    });

    renderTable(filteredData);
});

// ---------- Initialization ----------
document.addEventListener('DOMContentLoaded', () => {
    renderTable(studentsData);
});
