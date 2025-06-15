// Definiamo le stanze disponibili
const allRooms = [
  "Bagno", "Cucina", "Soggiorno", "Camera da letto", "Corridoio", "Stanzetta"
];

// Definiamo i compiti e la loro frequenza
const tasks = {
  "Lunedì": [
    { room: "Bagno", task: "Pulire specchio", frequency: "Una volta al giorno" },
    { room: "Cucina", task: "Lavare piatti", frequency: "Una volta al giorno" }
  ],
  "Martedì": [
    { room: "Camera da letto", task: "Rifare letto", frequency: "Una volta al giorno" },
    { room: "Corridoio", task: "Spazzare pavimento", frequency: "Una volta a settimana" }
  ],
  "Mercoledì": [
    { room: "Soggiorno", task: "Spolverare mobili", frequency: "Una volta a settimana" },
    { room: "Cucina", task: "Pulire frigorifero", frequency: "Una volta al mese" }
  ],
  // Aggiungi gli altri giorni della settimana con stanze vuote...
};

let currentDay = "Lunedì"; // Giorno di default

// Funzione per cambiare il giorno e aggiornare i compiti
function changeDay(day) {
  currentDay = day; // Cambia il giorno selezionato
  document.getElementById("selected-day").innerText = day; // Aggiorna il titolo
  renderTasks(); // Rende i compiti per il giorno selezionato
}

// Funzione per renderizzare i compiti dinamicamente
function renderTasks() {
  const container = document.getElementById("room-list");
  container.innerHTML = ""; // Pulisce la lista dei compiti esistenti

  // Per ogni stanza, se non c'è un compito specifico, mettiamo un placeholder
  allRooms.forEach(room => {
    let roomTasks = tasks[currentDay].filter(task => task.room === room);
    if (roomTasks.length > 0) {
      const div = document.createElement("div");
      div.className = "room";
      div.innerHTML = `<h3>${room}</h3>`;

      roomTasks.forEach(task => {
        const p = document.createElement("p");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${task.room}-${task.task}`;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.innerText = `${task.task} - ${task.frequency}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Elimina";
        deleteButton.onclick = () => deleteTask(room, task.task); // Passiamo la stanza e il task da eliminare

        p.appendChild(checkbox);
        p.appendChild(label);
        p.appendChild(deleteButton);

        div.appendChild(p);
      });

      container.appendChild(div);
    }
  });
}

// Funzione per eliminare un task
function deleteTask(room, taskDescription) {
  // Verifica se la stanza e il compito sono corretti
  console.log(`Eliminando il compito: ${taskDescription} nella stanza: ${room}`);

  // Rimuoviamo il compito dall'array 'tasks' per il giorno corrente
  tasks[currentDay] = tasks[currentDay].filter(task => !(task.room === room && task.task === taskDescription));

  // Rende i compiti per il giorno selezionato (includendo la modifica)
  renderTasks();
}

// Funzione per aggiungere nuovi compiti
function addTask(event) {
  event.preventDefault(); // Evita il ricaricamento della pagina

  const room = document.getElementById("room-select").value;
  const taskDesc = document.getElementById("task-desc").value;
  const frequency = document.getElementById("task-frequency").value;

  // Aggiungiamo il nuovo compito al giorno corrente, raggruppandolo sotto la stanza giusta
  tasks[currentDay].push({ room, task: taskDesc, frequency });

  // Rende i compiti per il giorno selezionato (includendo il nuovo compito)
  renderTasks();

  // Resetta il modulo dopo l'aggiunta
  document.getElementById("add-task-form").reset();
}

// Aggiungiamo l'evento per il submit del modulo
document.getElementById("add-task-form").addEventListener("submit", addTask);

// Renderizza i compiti per il giorno predefinito (Lunedì)
renderTasks();

