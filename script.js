document.addEventListener("DOMContentLoaded", function () {
    const monthView = document.getElementById("month-view");
    const dayView = document.getElementById("day-view");
    const monthContainer = document.getElementById("month-container");
    const selectedDateDisplay = document.getElementById("selected-date");
    const backToMonthBtn = document.getElementById("back-to-month");

    // Aufgaben
    const showInputBtn = document.getElementById("show-input-btn");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const completedTasksContainer = document.getElementById("completed-tasks-container");
    const toggleTasksBtn = document.getElementById("toggle-tasks-btn");

    let currentDate = null;
    let taskData = JSON.parse(localStorage.getItem("tasks")) || {};

    function generateCalendar() {
        monthContainer.innerHTML = "";
        let today = new Date();
        let currentYear = today.getFullYear();

        for (let month = today.getMonth() - 1; month <= today.getMonth(); month++) {
            if (month < 0) continue;
            let monthBox = document.createElement("div");
            monthBox.classList.add("month-box");

            let monthTitle = document.createElement("h3");
            monthTitle.textContent = `${new Date(currentYear, month).toLocaleString('de-DE', { month: 'long' })}`;
            monthBox.appendChild(monthTitle);

            for (let day = 1; day <= 31; day++) {
                let dayBox = document.createElement("div");
                dayBox.classList.add("day-box");
                dayBox.textContent = day;
                dayBox.addEventListener("click", () => openDayView(currentYear, month, day));
                monthBox.appendChild(dayBox);
            }
            monthContainer.appendChild(monthBox);
        }
    }

    function openDayView(year, month, day) {
        currentDate = `${day}.${month + 1}.${year}`;
        selectedDateDisplay.textContent = currentDate;
        dayView.classList.remove("hidden");
        monthView.classList.add("hidden");
        loadTasks();
    }

    backToMonthBtn.addEventListener("click", () => {
        dayView.classList.add("hidden");
        monthView.classList.remove("hidden");
    });

    function loadTasks() {
        taskList.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        let tasks = taskData[currentDate] || { tasks: [], completed: [] };
        tasks.tasks.forEach((task, index) => {
            let li = createTaskElement(task, index, false);
            taskList.appendChild(li);
        });

        tasks.completed.forEach((task, index) => {
            let li = createTaskElement(task, index, true);
            completedTasksContainer.appendChild(li);
        });
    }

    function createTaskElement(task, index, completed) {
        let li = document.createElement("li");
        li.textContent = task;
        li.classList.add(completed ? "completed-task" : "task-item");
        li.addEventListener("click", () => markTaskAsDone(index));
        return li;
    }

    function markTaskAsDone(index) {
        let tasks = taskData[currentDate] || { tasks: [], completed: [] };
        let task = tasks.tasks.splice(index, 1)[0];
        tasks.completed.push(task);
        taskData[currentDate] = tasks;
        saveTasks();
        loadTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(taskData));
    }

    showInputBtn.addEventListener("click", () => {
        taskInput.classList.toggle("hidden");
        addTaskBtn.classList.toggle("hidden");
    });

    addTaskBtn.addEventListener("click", () => {
        let task = taskInput.value.trim();
        if (task) {
            taskData[currentDate].tasks.push(task);
            saveTasks();
            loadTasks();
        }
        taskInput.value = "";
    });

    generateCalendar();
});