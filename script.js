document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTaskBtn"); // Plus-Button
    const inputContainer = document.getElementById("inputContainer"); // Eingabefeld + Button
    const newTaskInput = document.getElementById("newTask"); // Textfeld
    const addTaskConfirmBtn = document.getElementById("addTaskConfirmBtn"); // Bestätigungs-Plus
    const taskList = document.getElementById("taskList");
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const showAllBtn = document.getElementById("showAllBtn");

    let tasksVisible = false; // Speichert, ob die Aufgaben aktuell sichtbar sind

    // Scrollen auf Mobilgeräten deaktivieren
    document.body.style.overflow = "hidden";

    // Aufgaben aus localStorage laden
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

        taskList.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        savedTasks.forEach(task => addTaskToDOM(task, false));
        savedCompletedTasks.forEach(task => addTaskToDOM(task, true));
    }

    loadTasks();

    // Plus-Button steuert das Eingabefeld & das Hinzufügen von Aufgaben
    addTaskBtn.addEventListener("click", function () {
        if (inputContainer.style.display === "none" || inputContainer.style.display === "") {
            // Eingabefeld anzeigen + rechten Plus-Button ausblenden
            inputContainer.style.display = "flex";
            addTaskBtn.style.display = "none";
            newTaskInput.focus();
        } else {
            // Eingabefeld ausblenden & rechten Plus-Button wieder anzeigen
            inputContainer.style.display = "none";
            addTaskBtn.style.display = "inline-block";
        }
    });

    // Aufgabe hinzufügen, wenn auf das Bestätigungs-Plus geklickt wird
    addTaskConfirmBtn.addEventListener("click", function () {
        addTask();
    });

    // Aufgabe hinzufügen, wenn Enter gedrückt wird
    newTaskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addNewTask(taskText);
            newTaskInput.value = "";
            inputContainer.style.display = "none"; // Eingabefeld ausblenden
            addTaskBtn.style.display = "inline-block"; // Rechten Plus-Button wieder einblenden
        }
    }

    function addNewTask(taskText) {
        addTaskToDOM(taskText, false);
        saveTask(taskText);
    }

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

    // Aufgabe als erledigt markieren
    function completeTask(taskText) {
        removeTask(taskText);
        addTaskToDOM(taskText, true);
        saveCompletedTask(taskText);
    }

    // Aufgabe entfernen
    function removeTask(taskText) {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks = savedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        loadTasks();
    }

    function removeCompletedTask(taskText) {
        let savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        savedCompletedTasks = savedCompletedTasks.filter(task => task !== taskText);
        localStorage.setItem("completedTasks", JSON.stringify(savedCompletedTasks));

        loadTasks();
    }

    // Speichern
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

    // Aufgaben manuell ein-/ausblenden
    showAllBtn.addEventListener("click", function () {
        tasksVisible = !tasksVisible; // Zustand umkehren

        if (tasksVisible) {
            taskList.classList.remove("hidden");

            // Automatisch nach 10 Sekunden wieder ausblenden
            setTimeout(() => {
                if (tasksVisible) { // Nur ausblenden, wenn der Nutzer nicht selbst wieder eingeschaltet hat
                    taskList.classList.add("hidden");
                    tasksVisible = false;
                }
            }, 10000);
        } else {
            taskList.classList.add("hidden");
        }
    });
});
