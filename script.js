document.addEventListener("DOMContentLoaded", function () {
    const plus1 = document.getElementById("plus1");
    const plus2 = document.getElementById("plus2");
    const inputContainer = document.getElementById("inputContainer");
    const newTaskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const showAllBtn = document.getElementById("showAllBtn");

    let tasksVisible = false;

// Monat
const monthView = document.getElementById("month-view");
    const dayView = document.getElementById("day-view");
    const monthContainer = document.getElementById("month-container");
    const selectedDateDisplay = document.getElementById("selected-date");
    const backToMonthBtn = document.getElementById("back-to-month");

    let currentDate = null

    // Mobil-Zoom deaktivieren
    document.body.style.overflow = "hidden";

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

        taskList.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        savedTasks.forEach(task => addTaskToDOM(task, false));
        savedCompletedTasks.forEach(task => addTaskToDOM(task, true));
    }

    loadTasks();

    plus1.addEventListener("click", function () {
        inputContainer.style.display = "flex";
        plus1.style.display = "none";
        plus2.style.display = "inline-block";
        newTaskInput.focus();
    });

    plus2.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();

        if (taskText) {
            addNewTask(taskText);
        }

        inputContainer.style.display = "none";
        plus2.style.display = "none";
        plus1.style.display = "inline-block";
    });

    newTaskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                addNewTask(taskText);
                inputContainer.style.display = "none";
                plus2.style.display = "none";
                plus1.style.display = "inline-block";
            }
        }
    });

    function addNewTask(taskText) {
        addTaskToDOM(taskText, false);
        saveTask(taskText);
        newTaskInput.value = "";
    }

    function addTaskToDOM(taskText, isCompleted) {
        const li = document.createElement("li");
        li.textContent = taskText;

        if (!isCompleted) {
            const checkButton = document.createElement("button");
            checkButton.classList.add("icon-button");
            checkButton.innerHTML = `<img src="assets/check.png" alt="Erledigt">`;
            checkButton.addEventListener("click", function () {
                completeTask(taskText);
            });

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-btn");
            removeButton.textContent = "✖";
            removeButton.addEventListener("click", function () {
                removeTask(taskText);
            });

            li.appendChild(checkButton);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        } else {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("completed-task");

            const taskSpan = document.createElement("span");
            taskSpan.textContent = taskText;

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-btn");
            removeButton.textContent = "✖";
            removeButton.addEventListener("click", function () {
                removeCompletedTask(taskText);
            });

            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(removeButton);
            completedTasksContainer.appendChild(taskDiv);
        }
    }

    function completeTask(taskText) {
        removeTask(taskText);
        addTaskToDOM(taskText, true);
        saveCompletedTask(taskText);
    }

    function removeTask(taskText) {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        // Finde die erste Übereinstimmung und entferne sie
        const taskIndex = savedTasks.indexOf(taskText);
        if (taskIndex !== -1) {
            savedTasks.splice(taskIndex, 1);
        }
    
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        loadTasks();
    }
    
    function removeCompletedTask(taskText) {
        let savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    
        // Finde die erste Übereinstimmung und entferne sie
        const taskIndex = savedCompletedTasks.indexOf(taskText);
        if (taskIndex !== -1) {
            savedCompletedTasks.splice(taskIndex, 1);
        }
    
        localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));
        loadTasks();
    }

    function saveTask(taskText) {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }

    function saveCompletedTask(taskText) {
        const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        savedCompletedTasks.push(taskText);
        localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));
    }

    showAllBtn.addEventListener("click", function () {
        tasksVisible = !tasksVisible;

        if (tasksVisible) {
            taskList.classList.remove("hidden");

            setTimeout(() => {
                if (tasksVisible) {
                    taskList.classList.add("hidden");
                    tasksVisible = false;
                }
            }, 10000);
        } else {
            taskList.classList.add("hidden");
        }
    });

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
    generateCalendar();
});

