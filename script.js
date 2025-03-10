document.addEventListener("DOMContentLoaded", function () {
    const plus1 = document.getElementById("plus1");
    const plus2 = document.getElementById("plus2");
    const taskInput = document.getElementById("taskInput");
    const inputContainer = document.getElementById("inputContainer");
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    const toggleTasks = document.getElementById("toggleTasks");

    let showTasks = true;

    // Eingabefeld ein-/ausblenden
    plus1.addEventListener("click", function () {
        if (inputContainer.classList.contains("hidden")) {
            inputContainer.classList.remove("hidden");
            plus1.style.display = "none";
        } else {
            inputContainer.classList.add("hidden");
            plus1.style.display = "inline";
        }
    });

    // Aufgabe hinzufügen
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            inputContainer.classList.add("hidden");
            plus1.style.display = "inline";
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;

        // Erledigt-Button
        const checkBtn = document.createElement("button");
        checkBtn.textContent = "✔";
        checkBtn.classList.add("delete-btn");
        checkBtn.addEventListener("click", function () {
            completeTask(li);
        });

        // Entfernen-Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
        inputContainer.classList.add("hidden");
        plus1.style.display = "inline";

        saveTasks();
    }

    plus2.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Aufgabe als erledigt markieren
    function completeTask(taskElement) {
        taskList.removeChild(taskElement);
        completedTasks.appendChild(taskElement);
        saveTasks();
        
        setTimeout(() => {
            taskElement.remove();
            saveTasks();
        }, 10000);
    }

    // Aufgaben speichern
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(task => tasks.push(task.textContent));
        const completed = [];
        completedTasks.querySelectorAll("li").forEach(task => completed.push(task.textContent));

        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completed", JSON.stringify(completed));
    }

    // Aufgaben laden
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const savedCompleted = JSON.parse(localStorage.getItem("completed")) || [];

        savedTasks.forEach(taskText => {
            const li = document.createElement("li");
            li.textContent = taskText;
            
            const checkBtn = document.createElement("button");
            checkBtn.textContent = "✔";
            checkBtn.classList.add("delete-btn");
            checkBtn.addEventListener("click", function () {
                completeTask(li);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "✖";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });

            li.appendChild(checkBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        savedCompleted.forEach(taskText => {
            const li = document.createElement("li");
            li.textContent = taskText;
            completedTasks.appendChild(li);
        });
    }

    loadTasks();

    // Aufgaben ein-/ausblenden
    toggleTasks.addEventListener("click", function () {
        showTasks = !showTasks;
        taskList.style.display = showTasks ? "block" : "none";
    });
});