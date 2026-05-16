document.addEventListener('DOMContentLoaded', () => {
    // การดึง Element ต่างๆ ในฟอร์ม
    const courseSelect = document.getElementById('course');
    const unitPriceInput = document.getElementById('unitPrice');
    const discountInput = document.getElementById('discount');
    const netAmountInput = document.getElementById('netAmount');
    const learnDateInput = document.getElementById('learnDate');
    const form = document.getElementById('enrollmentForm');

    // ตั้งค่าวัดที่เริ่มต้นให้เป็น "วันนี้" อัตโนมัติ
    learnDateInput.valueAsDate = new Date();

    // ฟังก์ชันคำนวณยอดเงินสุทธิ
    const calculateNetAmount = () => {
        const price = parseFloat(unitPriceInput.value) || 0;
        let discount = parseFloat(discountInput.value) || 0;
        
        // ป้องกันไม่ให้ใส่ส่วนลดเกินราคาเต็ม
        if (discount > price) {
            discount = price;
            discountInput.value = discount;
        }

        const net = price - discount;
        netAmountInput.value = net;
    };

    // เมื่อมีการเปลี่ยน Dropdown เลือกคอร์สเรียน
    courseSelect.addEventListener('change', (e) => {
        // ดึงราคาจาก Data Attribute (data-price) ของ Option ที่เลือก
        const selectedOption = e.target.options[e.target.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        
        // อัปเดตราคาเต็มในช่องแบบ Read-only
        unitPriceInput.value = price;
        
        // สั่งคำนวณยอดสุทธิใหม่
        calculateNetAmount();
    });

    // เมื่อมีการพิมพ์ตัวเลขส่วนลด
    discountInput.addEventListener('input', calculateNetAmount);

    // จำลองการ Submit ข้อมูลส่งไปหลังบ้าน
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช

        // แสดง Alert แจ้งเตือนเมื่อข้อมูลครบ
        alert('ระบบบันทึกข้อมูลเรียบร้อยแล้ว!');
        
        // *จุดนี้จะเป็นจุดที่คุณสามารถใช้ Fetch API หรือ Axios เพื่อ Push ข้อมูลลง Database ได้ตามที่คุณต้องการ*
    });
});