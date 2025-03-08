document.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTask");
    const confirmAddTaskBtn = document.getElementById("confirmAddTask");
    const newTaskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const showAllBtn = document.getElementById("showAllBtn");
    const taskInputContainer = document.getElementById("taskInputContainer");

    let hiddenTasks = []; // Speichert die versteckten Aufgaben

    // Plus-Button klickt -> Eingabefeld erscheint
    addTaskBtn.addEventListener("click", function () {
        taskInputContainer.classList.toggle("hidden");
    });

    // Aufgabe hinzufügen
    confirmAddTaskBtn.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            newTaskInput.value = "";
            taskInputContainer.classList.add("hidden"); // Eingabefeld wieder ausblenden
        }
    });

    // Zeige versteckte Aufgaben für 10 Sekunden
    showAllBtn.addEventListener("click", function () {
        hiddenTasks.forEach(task => task.classList.remove("hidden"));

        setTimeout(() => {
            hiddenTasks.forEach(task => task.classList.add("hidden"));
        }, 10000);
    });

    // Funktion zum Hinzufügen einer Aufgabe
    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span> <button class="completeTask"><img src="assets/check.png" alt="Erledigt"></button>`;
        taskList.appendChild(li);

        // Klick auf Häkchen -> Aufgabe erledigt
        li.querySelector(".completeTask").addEventListener("click", function () {
            completeTask(li);
        });

        // Neue Aufgabe wird erst sichtbar, dann nach 10 Sekunden ausgeblendet
        hiddenTasks.push(li);
        setTimeout(() => {
            li.classList.add("hidden");
        }, 10000);

        saveTasks();
    }

    // Aufgabe als erledigt markieren
    function completeTask(taskElement) {
        taskElement.querySelector(".completeTask").remove(); // Häkchen entfernen
        taskElement.classList.remove("hidden"); // Falls sie versteckt war, anzeigen
        completedTasks.appendChild(taskElement);
        hiddenTasks = hiddenTasks.filter(task => task !== taskElement); // Entferne aus versteckter Liste
        saveTasks();
    }

    // Speichere Aufgaben in LocalStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => tasks.push(li.textContent));
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const completed = [];
        completedTasks.querySelectorAll("li").forEach(li => completed.push(li.textContent));
        localStorage.setItem("completedTasks", JSON.stringify(completed));
    }

    // Lade Aufgaben beim Start
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task));

        const completed = JSON.parse(localStorage.getItem("completedTasks")) || [];
        completed.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${task}</span>`;
            completedTasks.appendChild(li);
        });
    }

    loadTasks();
});