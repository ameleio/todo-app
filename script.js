document.addEventListener("DOMContentLoaded", () => {
    const plus1 = document.getElementById("plus1");
    const plus2 = document.getElementById("plus2");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const inputContainer = document.getElementById("inputContainer");
    const toggleTasks = document.getElementById("toggleTasks");
    const completedTasksContainer = document.getElementById("completedTasks");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    let showTasks = false;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;

            // Häkchen-Button
            const checkButton = document.createElement("button");
            checkButton.innerHTML = "✔";
            checkButton.classList.add("icon-button");
            checkButton.addEventListener("click", () => {
                completeTask(index);
            });

            li.appendChild(checkButton);
            taskList.appendChild(li);
        });

        // Erledigte Aufgaben anzeigen
        completedTasksContainer.innerHTML = "";
        completedTasks.forEach((task, index) => {
            const div = document.createElement("div");
            div.textContent = task;
            div.classList.add("completed-task");

            // X-Button zum Löschen
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                removeCompletedTask(index);
            });

            div.appendChild(deleteButton);
            completedTasksContainer.appendChild(div);
        });
    }

    function completeTask(index) {
        completedTasks.push(tasks[index]);
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function removeCompletedTask(index) {
        completedTasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    plus1.addEventListener("click", () => {
        inputContainer.classList.remove("hidden");
        plus1.classList.add("hidden");
    });

    plus2.addEventListener("click", () => {
        if (taskInput.value.trim() !== "") {
            tasks.push(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
        inputContainer.classList.add("hidden");
        plus1.classList.remove("hidden");
    });

    toggleTasks.addEventListener("click", () => {
        showTasks = !showTasks;
        taskList.classList.toggle("hidden", !showTasks);
    });

    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && taskInput.value.trim() !== "") {
            tasks.push(taskInput.value.trim());
            taskInput.value = "";
            saveTasks();
            renderTasks();
            inputContainer.classList.add("hidden");
            plus1.classList.remove("hidden");
        }
    });

    // Automatisches Ausblenden nicht erledigter Aufgaben nach 10 Sekunden
    function autoHideTasks() {
        setTimeout(() => {
            if (showTasks) {
                taskList.classList.add("hidden");
                showTasks = false;
            }
        }, 10000);
    }

    autoHideTasks();
    renderTasks();
});