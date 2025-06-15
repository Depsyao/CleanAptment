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
    let taskFound = false;

    // Controlla se c'è un compito per la stanza nel giorno selezionato
    tasks[currentDay].forEach(task => {
      if (task.room === room) {
        taskFound = true;
        const div = document.createElement("div");
        div.className = "room";
        div.innerHTML = `<h3>${task.room}</h3>`;
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${task.room}-${task.task}`;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.innerText = `${task.task} - ${task.frequency}`;

        const p = document.createElement("p");
        p.appendChild(checkbox);
        p.appendChild(label);

        div.appendChild(p);
        container.appendChild(div);
      }
    });

    // Se non c'è nessun compito, inseriamo un task vuoto per la stanza
    if (!taskFound) {
      const div = document.createElement("div");
      div.className = "room";
      div.innerHTML = `<h3>${room}</h3>`;
      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.disabled = true; // Non sarà cliccabile

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerText = "Nessun compito definito";

      const p = document.createElement("p");
      p.appendChild(checkbox);
      p.appendChild(label);

      div.appendChild(p);
      container.appendChild(div);
    }
  });
}

// Funzione per caricare foto
function uploadPhoto() {
  const file = document.getElementById("room-photo").files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement("img");
    img.src = e.target.result;

    document.getElementById("planimetria-preview").appendChild(img);
    alert("Foto caricata. La funzione di mapp
