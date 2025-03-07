ddocument.addEventListener("DOMContentLoaded", function () {
    const addTaskBtn = document.getElementById("addTaskBtn");
    const newTaskInput = document.getElementById("newTask");
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const showAllBtn = document.getElementById("showAllBtn");
    const taskContainer = document.getElementById("taskContainer");

    // Lade gespeicherte Aufgaben
    loadTasks();

    addTaskBtn.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = "";
        }
    });

    showAllBtn.addEventListener("click", function () {
        taskContainer.classList.remove("hidden");
        setTimeout(() => taskContainer.classList.add("hidden"), 10000);
    });

    function addTask(text) {
        const li = document.createElement("li");
        li.textContent = text;

        li.addEventListener("click", function () {
            taskList.removeChild(li);
            completedTasks.appendChild(li);
            saveTasks();
        });

        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => li.textContent);
        const completed = Array.from(completedTasks.children).map(li => li.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completed", JSON.stringify(completed));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const completed = JSON.parse(localStorage.getItem("completed") || "[]");

        tasks.forEach(text => addTask(text));
        completed.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            completedTasks.appendChild(li);
        });
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("Service Worker registriert"))
        .catch(error => console.log("Service Worker Fehler:", error));
}




document.getElementById("addTask").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput");
    
    // Eingabefeld ein-/ausblenden
    if (taskInput.style.display === "none") {
        taskInput.style.display = "block";
        taskInput.focus();
    } else {
        taskInput.style.display = "none";
    }
});

document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let taskText = this.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            this.value = "";
            this.style.display = "none"; // Nach dem Hinzufügen wieder ausblenden
        }
    }
});

function addTask(text) {
    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = text;

    // Häkchen-Button zum Erledigen
    let checkButton = document.createElement("button");
    checkButton.innerHTML = '<img src="assets/check.png" alt="Erledigt">';
    checkButton.addEventListener("click", function () {
        li.classList.toggle("done");
    });

    li.appendChild(checkButton);
    taskList.appendChild(li);
}