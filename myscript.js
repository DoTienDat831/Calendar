document.addEventListener("DOMContentLoaded", function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const leftArrowBtn = document.getElementById('left-btn');
    const rightArrowBtn = document.getElementById('right-btn');
    const daysGrid = document.getElementById('days-grid'); // Lấy container chứa ngày

    const wrapper = monthSelect.parentElement;
    const updateWidth = () => {
        if (monthSelect.options && monthSelect.options.length > 0) {
            const selectedText = monthSelect.options[monthSelect.selectedIndex].text;
            wrapper.setAttribute("data-value", selectedText);
        }
    };

    // Khởi tạo thời gian thực tế
    const today = new Date(); 
    const currentYear = today.getFullYear(); 
    const currentMonth = today.getMonth(); 

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    // Render option cho Tháng
    for (let i = 0; i < 12; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = monthNames[i];
        if (i === currentMonth) option.selected = true;
        monthSelect.appendChild(option);
    }

    // Render option cho Năm
    for (let i = currentYear + 10; i >= currentYear - 100; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }

    // Hàm render lưới ngày (tính toán lại mỗi khi đổi tháng/năm)
    function renderCalendar() {
        daysGrid.innerHTML = ''; // Xóa sạch lưới cũ

        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);

        // 1. Tính toán ngày mùng 1 là thứ mấy
        // (Chú ý: Vì giao diện của bạn bắt đầu bằng Thứ 2 (MON), ta cần điều chỉnh lại giá trị getDay())
        // getDay() trả về: 0 = SUN, 1 = MON, ..., 6 = SAT.
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const emptySlots = firstDay === 0 ? 6 : firstDay - 1; 

        // 2. Tính số ngày trong tháng đó
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

        // Kiểm tra xem tháng/năm đang chọn có phải là tháng/năm hiện tại không để tô màu "today"
        const isCurrentMonthYear = (selectedMonth === today.getMonth() && selectedYear === today.getFullYear());

        // 3. In ra các ô trống đầu tháng
        for (let i = 0; i < emptySlots; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day');
            daysGrid.appendChild(emptyDiv);
        }

        // 4. In ra các ngày trong tháng
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day', 'has-date');
            dayDiv.textContent = i;

            if (isCurrentMonthYear && i === today.getDate()) {
                dayDiv.classList.add('today');
            }

            daysGrid.appendChild(dayDiv);
        }
    }

    // --- Arrow buttons ---
    leftArrowBtn.addEventListener('click', function () {
        let currentValue = parseInt(monthSelect.value);
        let currentYearValue = parseInt(yearSelect.value);
        monthSelect.value = currentValue === 0 ? 11 : currentValue - 1;
        if (currentValue === 0) yearSelect.value = currentYearValue - 1;
        updateWidth(); 
        renderCalendar(); // Cập nhật lại lịch
    });

    rightArrowBtn.addEventListener('click', function () {
        let currentValue = parseInt(monthSelect.value);
        let currentYearValue = parseInt(yearSelect.value);
        monthSelect.value = currentValue === 11 ? 0 : currentValue + 1;
        if (currentValue === 11) yearSelect.value = currentYearValue + 1;
        updateWidth(); 
        renderCalendar(); // Cập nhật lại lịch
    });

    // --- Dropdown change & initial call ---
    monthSelect.addEventListener("change", function() {
        updateWidth();
        renderCalendar();
    });

    yearSelect.addEventListener("change", renderCalendar);

    // Lần gọi đầu tiên khi load trang
    updateWidth();
    renderCalendar();
});