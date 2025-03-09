document.addEventListener("DOMContentLoaded", function () {
    const plus1 = document.getElementById("plus1"); // Button 1 (Eingabefeld anzeigen)
    const plus2 = document.getElementById("plus2"); // Button 2 (Aufgabe hinzufügen)
    const inputContainer = document.getElementById("inputContainer"); // Eingabebereich
    const newTaskInput = document.getElementById("newTask"); // Eingabefeld
    const taskList = document.getElementById("taskList");
    const completedTasksContainer = document.getElementById("completedTasksContainer");
    const showAllBtn = document.getElementById("showAllBtn");

    let tasksVisible = false;

    // Scrollen auf Mobilgeräten deaktivieren
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

    // Plus1 (Eingabefeld anzeigen)
    plus1.addEventListener("click", function () {
        inputContainer.style.display = "flex"; // Eingabefeld anzeigen
        plus1.style.display = "none"; // Plus1 verstecken
        plus2.style.display = "inline-block"; // Plus2 anzeigen
        newTaskInput.focus();
    });

    // Plus2 (Aufgabe hinzufügen oder Eingabefeld schließen)
    plus2.addEventListener("click", function () {
        const taskText = newTaskInput.value.trim();

        if (taskText) {
            addNewTask(taskText);
        }

        // Eingabefeld & Plus2 ausblenden, Plus1 wieder anzeigen
        inputContainer.style.display = "none";
        plus2.style.display = "none";
        plus1.style.display = "inline-block";
    });

    // Aufgabe hinzufügen durch Enter-Taste
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

    function completeTask(taskText) {
        removeTask(taskText);
        addTaskToDOM(taskText, true);
        saveCompletedTask(taskText);
    }

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
});
