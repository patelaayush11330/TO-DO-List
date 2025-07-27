document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupDarkMode();
});

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate").value;
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  const formattedDate = dueDate ? `<small>📅 ${dueDate}</small>` : "";

  li.innerHTML = `
    <div>
      <span class="task-text" onclick="toggleComplete(this)">${taskText}</span>
      ${formattedDate}
    </div>
    <div class="actions">
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
  document.getElementById("dueDate").value = "";
}

// Delete task
function deleteTask(button) {
  button.closest("li").remove();
  saveTasks();
}

// Toggle completed status
function toggleComplete(span) {
  span.closest("li").classList.toggle("completed");
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const taskListHTML = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", taskListHTML);
}

// Load tasks from localStorage
function loadTasks() {
  localStorage.removeItem("tasks"); // <-- Add this line to clear old data
  const saved = localStorage.getItem("tasks");
  if (saved) {
    document.getElementById("taskList").innerHTML = saved;
  }
}


// Setup dark mode toggle
function setupDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  });
}
