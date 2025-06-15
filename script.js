const tasksByDay = {
  0: ["Pulire bagno", "Fare il letto"],
  1: ["Passare aspirapolvere", "Pulire lavastoviglie"],
  2: ["Lavare a terra", "Togliere la polvere"],
  3: ["Cucina", "Pulire bagno"],
  4: ["Fare il letto", "Togliere la polvere"],
  5: ["Passare aspirapolvere", "Cucina"],
  6: ["Lavare a terra", "Pulire lavastoviglie"]
};

function loadTasks() {
  const today = new Date().getDay();
  const tasks = tasksByDay[today] || [];
  const container = document.getElementById("tasks");
  container.innerHTML = "";
  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.textContent = "🧼 " + task;
    container.appendChild(div);
  });
}

window.onload = loadTasks;