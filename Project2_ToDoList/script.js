// Select elements
const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener to add a new task
addTaskButton.addEventListener("click", addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const taskDateTime = taskTime.value;

  if (taskText === "" || taskDateTime === "") {
    alert("Please enter both task and time!");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
    timestamp: new Date(taskDateTime).toLocaleString(), // Convert to readable format
  };

  createTaskElement(task);
  saveTask(task);

  taskInput.value = ""; // Clear input field
  taskTime.value = ""; // Clear time field
}

// Function to create a new task element
function createTaskElement(task) {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  const timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  timestamp.textContent = `Time: ${task.timestamp}`;

  // Add toggle and delete buttons
  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "✔️";
  toggleButton.addEventListener("click", () => toggleTask(task, li));

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "❌";
  deleteButton.addEventListener("click", () => deleteTask(task, li));

  li.appendChild(taskText);
  li.appendChild(timestamp);
  li.appendChild(toggleButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Function to toggle a task as completed
function toggleTask(task, listItem) {
  task.completed = !task.completed;
  listItem.classList.toggle("completed");
  updateLocalStorage();
}

// Function to delete a task
function deleteTask(task, listItem) {
  taskList.removeChild(listItem);
  removeTaskFromStorage(task);
}

// Function to save a task to local storage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (task) =>
      task.text !== taskToRemove.text ||
      task.timestamp !== taskToRemove.timestamp
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskElement);
}

// Function to update local storage after any change
function updateLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector(".task-text").textContent;
    const timestamp = li
      .querySelector(".timestamp")
      .textContent.replace("Time: ", "");
    const completed = li.classList.contains("completed");
    tasks.push({ text, timestamp, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
