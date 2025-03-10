document.addEventListener("DOMContentLoaded", () => {
    const calendarContainer = document.getElementById("calendarContainer");
    const dayPage = document.getElementById("dayPage");
    const calendarPage = document.getElementById("calendarPage");
    const selectedDateText = document.getElementById("selectedDate");
    const backToCalendarBtn = document.getElementById("backToCalendar");

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const toggleInputBtn = document.getElementById("toggleInput");
    const toggleTasksBtn = document.getElementById("toggleTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let completed = JSON.parse(localStorage.getItem("completed")) || {};
    let dailyGoal = JSON.parse(localStorage.getItem("dailyGoal")) || {};
    let monthlyGoal = JSON.parse(localStorage.getItem("monthlyGoal")) || {};

    function generateCalendar() {
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth();
        let currentDay = today.getDate();

        for (let monthOffset = -1; monthOffset <= 0; monthOffset++) {
            let date = new Date(currentYear, currentMonth + monthOffset, 1);
            let monthBox = document.createElement("div");
            monthBox.classList.add("month-box");
            monthBox.innerHTML = `<h3>${date.toLocaleString("de-DE", { month: "long" })} ${date.getFullYear()}</h3>`;

            for (let i = 1; i <= new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
                let dayBox = document.createElement("div");
                dayBox.classList.add("day-box");
                dayBox.textContent = i;

                if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && i === currentDay) {
                    dayBox.classList.add("current-day");
                }

                dayBox.addEventListener("click", () => openDayPage(i, date.getMonth(), date.getFullYear()));
                monthBox.appendChild(dayBox);
            }

            calendarContainer.appendChild(monthBox);
        }
    }

    function openDayPage(day, month, year) {
        selectedDateText.textContent = `${day.toString().padStart(2, "0")}.${(month + 1).toString().padStart(2, "0")}.${year}`;
        taskList.innerHTML = "";
        completedTasks.innerHTML = "";

        let key = `${day}-${month}-${year}`;
        if (tasks[key]) {
            tasks[key].forEach(task => addTaskToList(task, key));
        }

        if (completed[key]) {
            completed[key].forEach(task => addTaskToCompleted(task, key));
        }

        calendarPage.classList.add("hidden");
        dayPage.classList.remove("hidden");
    }

    function addTaskToList(task, key) {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `${task} <button onclick="completeTask('${task}', '${key}')">✔</button>`;
        taskList.appendChild(taskItem);
    }

    function addTaskToCompleted(task, key) {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `${task} <button onclick="removeCompletedTask('${task}', '${key}')">✖</button>`;
        completedTasks.appendChild(taskItem);
    }

    toggleInputBtn.addEventListener("click", () => {
        taskInput.classList.toggle("hidden");
    });

    backToCalendarBtn.addEventListener("click", () => {
        calendarPage.classList.remove("hidden");
        dayPage.classList.add("hidden");
    });

    generateCalendar();
});
