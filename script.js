const tasks = {
  "Lunedì": {
    "Bagno": ["Pulire specchio", "Cambiare asciugamani"],
    "Cucina": ["Lavare piatti", "Pulire piano cottura"]
  },
  "Martedì": {
    "Camera da letto": ["Rifare letto", "Ordinare armadio"],
    "Corridoio": ["Spazzare pavimento", "Pulire luci"]
  },
  "Mercoledì": {
    "Soggiorno": ["Spolverare mobili", "Aspirare pavimento"],
    "Cucina": ["Pulire frigorifero", "Svuotare pattumiera"]
  },
  "Giovedì": {
    "Camera da letto": ["Rifare letto", "Spolverare armadio"],
    "Bagno": ["Pulire doccia", "Cambiare asciugamani"]
  },
  // Aggiungi altri giorni e compiti qui
};

let currentDay = "Lunedì"; // Giorno di default

// Funzione per cambiare il giorno e aggiornare la lista dei compiti
function changeDay(day) {
  currentDay = day; // Cambia il giorno selezionato
  document.getElementById("selected-day").innerText = day; // Aggiorna il titolo con il giorno selezionato
  renderTasks(); // Rende di nuovo i compiti per il giorno selezionato
}

// Funzione per renderizzare i compiti dinamicamente
function renderTasks() {
  const container = document.getElementById("room-list");
  container.innerHTML = ""; // Pulisce la lista dei compiti esistenti

  const rooms = tasks[currentDay]; // Ottiene i compiti per il giorno selezionato
  for (const room in rooms) {
    const div = document.createElement("div");
    div.className = "room";
    div.innerHTML = `<h3>${room}</h3>`;
    
    rooms[room].forEach((task, idx) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `${room}-${idx}`;
      
      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerText = task;

      const p = document.createElement("p");
      p.appendChild(checkbox);
      p.appendChild(label);

      div.appendChild(p);
    });

    container.appendChild(div);
  }
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
    alert("Foto caricata. La funzione di mappatura verrà implementata presto!");
  };
  reader.readAsDataURL(file);
}

// Renderizza i compiti per il giorno predefinito (Lunedì)
renderTasks();

