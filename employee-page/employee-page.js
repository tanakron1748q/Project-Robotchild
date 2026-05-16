// ข้อมูลตั้งต้น (อ้างอิงจากในรูป 2-3 คนแรก) เพื่อให้มีข้อมูลตอนเปิดเว็บครั้งแรก
const defaultEmployees = [
    { id: 1, name: "นาย ปิยะบุตร พึ่งพันธ์", nickname: "เน้ง", phone: "097-9966829", bank: "กสิกรไทย", account: "022-8-30982-1" },
    { id: 2, name: "นาย ธิติกร เอกพจน์", nickname: "สกาย", phone: "095-1658090", bank: "กรุงไทย", account: "095-1658090" },
    { id: 3, name: "นาย นิติภูมิ มอญดี", nickname: "ภูมิ", phone: "092-7944619", bank: "ไทยพาณิชย์", account: "092-7944619" }
];

// โหลดข้อมูลจาก LocalStorage ถ้าไม่มีให้ใช้ข้อมูล default
let employees = JSON.parse(localStorage.getItem('employeesData')) || defaultEmployees;

// ฟังก์ชันบันทึกข้อมูลลง LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('employeesData', JSON.stringify(employees));
}

// ฟังก์ชันแสดงข้อมูลพนักงานลงในตาราง
function renderTable() {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = ''; // ล้างข้อมูลเก่าก่อน

    employees.forEach((emp, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${emp.name}</td>
            <td>${emp.nickname}</td>
            <td>${emp.phone}</td>
            <td>${emp.bank}</td>
            <td>${emp.account}</td>
            <td>
                <button class="btn btn-edit" onclick="editEmployee(${emp.id})">แก้ไข</button>
                <button class="btn btn-delete" onclick="deleteEmployee(${emp.id})">ลบ</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// เปิด Modal สำหรับเพิ่ม/แก้ไข
function openModal(id = null) {
    const modal = document.getElementById('employeeModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('employeeForm');

    form.reset(); // ล้างค่าฟอร์มก่อน

    if (id) {
        // กรณี "แก้ไข"
        title.innerText = "แก้ไขข้อมูลพนักงาน";
        const emp = employees.find(e => e.id === id);
        
        document.getElementById('empId').value = emp.id;
        document.getElementById('empName').value = emp.name;
        document.getElementById('empNickname').value = emp.nickname;
        document.getElementById('empPhone').value = emp.phone;
        document.getElementById('empBank').value = emp.bank;
        document.getElementById('empAccount').value = emp.account;
    } else {
        // กรณี "เพิ่มใหม่"
        title.innerText = "เพิ่มพนักงานใหม่";
        document.getElementById('empId').value = '';
    }

    modal.style.display = 'flex';
}

// ปิด Modal
function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

// จัดการเมื่อกดปุ่ม "บันทึกข้อมูล"
document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const id = document.getElementById('empId').value;
    const name = document.getElementById('empName').value;
    const nickname = document.getElementById('empNickname').value;
    const phone = document.getElementById('empPhone').value;
    const bank = document.getElementById('empBank').value;
    const account = document.getElementById('empAccount').value;

    if (id) {
        // ถ้ามี ID คือการอัปเดตข้อมูลเดิม
        const index = employees.findIndex(e => e.id == id);
        employees[index] = { id: Number(id), name, nickname, phone, bank, account };
    } else {
        // ถ้าไม่มี ID คือการเพิ่มใหม่ (สร้าง ID ขึ้นมาใหม่)
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        employees.push({ id: newId, name, nickname, phone, bank, account });
    }

    saveToLocalStorage();
    renderTable();
    closeModal();
});

// ฟังก์ชันเมื่อกดปุ่ม แก้ไข
function editEmployee(id) {
    openModal(id);
}

// ฟังก์ชันเมื่อกดปุ่ม ลบ
function deleteEmployee(id) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายชื่อนี้?")) {
        employees = employees.filter(e => e.id !== id);
        saveToLocalStorage();
        renderTable();
    }
}

// สั่งให้ตารางทำงานทันทีเมื่อเปิดเว็บ
renderTable();