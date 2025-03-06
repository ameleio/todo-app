document.addEventListener("DOMContentLoaded", function() {
    let taskList = document.getElementById("taskList");
    let completedTasks = document.getElementById("completedTasks");
    let showAllBtn = document.getElementById("showAllBtn");
    let taskContainer = document.getElementById("taskContainer");

    document.getElementById("addTaskBtn").addEventListener("click", function() {
        let newTask = document.getElementById("newTask").value;
        if (newTask.trim() !== "") {
            let li = document.createElement("li");

            // Text der Aufgabe
            let span = document.createElement("span");
            span.textContent = newTask;

            // Häkchen-Button (zum Erledigen)
            let checkBtn = document.createElement("img");
            checkBtn.src = "assets/check.png";
            checkBtn.classList.add("icon-btn");
            checkBtn.addEventListener("click", function() {
                completedTasks.appendChild(li);
            });

            li.appendChild(span);
            li.appendChild(checkBtn);
            taskList.appendChild(li);
            document.getElementById("newTask").value = "";
        }
    });

    showAllBtn.addEventListener("click", function() {
        taskContainer.style.display = "block";
        setTimeout(() => taskContainer.style.display = "none", 3000);
    });
});