document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const inputContainer = document.getElementById("inputContainer");
    const confirmAddTask = document.getElementById("confirmAddTask");
    const newTaskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const showAllBtn = document.getElementById("showAllBtn");

    // Aufgaben aus localStorage laden
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

        taskList.innerHTML = "";
        completedTasks.innerHTML = "";

        savedTasks.forEach(task => addTaskToDOM(task, false));
        savedCompletedTasks.forEach(task => addTaskToDOM(task, true));
    }

    loadTasks();

    // Eingabefeld einblenden
    addTaskBtn.addEventListener("click", function () {
        inputContainer.style.display = "block";
    });

    // Aufgabe hinzufügen
    confirmAddTask.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText, false);
            saveTask(taskText);
            newTaskInput.value = "";
            inputContainer.style.display = "none";
        }
    });

    // Aufgabe ins DOM einfügen
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
            li.appendChild(checkButton);
            taskList.appendChild(li);
        } else {
            completedTasks.appendChild(li);
        }
    }

    // Aufgabe als erledigt markieren
    function completeTask(taskText) {
        removeTask(taskText);
        addTaskToDOM(taskText, true);
        saveCompletedTask(taskText);
    }

    // Aufgabe aus Speicher entfernen
    function removeTask(taskText) {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks = savedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        loadTasks();
    }

    // Aufgaben speichern
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

    // Alle Aufgaben für 10 Sekunden anzeigen
    showAllBtn.addEventListener("click", function () {
        taskList.classList.remove("hidden");
        setTimeout(() => {
            taskList.classList.add("hidden");
        }, 5000);
    });
});
