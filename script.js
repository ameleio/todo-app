document.addEventListener("DOMContentLoaded", () => {
    const calendarView = document.getElementById("calendarView");
    const dailyView = document.getElementById("dailyView");
    const calendar = document.getElementById("calendar");
    const selectedDateElem = document.getElementById("selectedDate");
    const backToCalendarBtn = document.getElementById("backToCalendar");
    const goalInput = document.getElementById("goalInput");
    const setGoalBtn = document.getElementById("setGoalBtn");

    let selectedDate = new Date().toISOString().split('T')[0];
    let goals = JSON.parse(localStorage.getItem("goals")) || {};
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};

    function generateCalendar() {
        calendar.innerHTML = "";
        let daysInMonth = new Date().getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
            let day = document.createElement("div");
            day.classList.add("calendar-day");
            let dateStr = new Date().toISOString().split('T')[0];

            if (completedTasks[dateStr] && completedTasks[dateStr].length >= goals[dateStr]) {
                day.classList.add("star-achieved");
            }
            
            day.innerText = i;
            day.onclick = () => openDayView(dateStr);
            calendar.appendChild(day);
        }
    }

    function openDayView(date) {
        selectedDate = date;
        selectedDateElem.innerText = date;
        calendarView.classList.add("hidden");
        dailyView.classList.remove("hidden");

        goalInput.value = goals[date] || "";
        updateTaskLists();
    }

    function updateTaskLists() {
        let taskList = document.getElementById("taskList");
        let completedList = document.getElementById("completedTasksContainer");
        taskList.innerHTML = "";
        completedList.innerHTML = "";

        (completedTasks[selectedDate] || []).forEach(task => {
            let li = document.createElement("li");
            li.innerText = task;
            completedList.appendChild(li);
        });
    }

    setGoalBtn.onclick = () => {
        goals[selectedDate] = parseInt(goalInput.value);
        localStorage.setItem("goals", JSON.stringify(goals));
        generateCalendar();
    };

    backToCalendarBtn.onclick = () => {
        calendarView.classList.remove("hidden");
        dailyView.classList.add("hidden");
        generateCalendar();
    };

    generateCalendar();
});