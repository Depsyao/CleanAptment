const tasks = {
  "Lunedì": {
    "Bagno": ["Pulire specchio", "Cambiare asciugamani"],
    "Cucina": ["Lavare piatti", "Pulire piano cottura"]
  },
  "Martedì": {
    "Camera da letto": ["Rifare letto", "Ordinare armadio"],
    "Corridoio": ["Spazzare pavimento", "Pulire luci"]
  }
  // Aggiungi altri giorni e compiti qui
};

let currentDay = "Lunedì";

function changeDay(day) {
  currentDay = day;
  document.getElementById("selected-day").innerText = day;
  renderTasks();
}

function renderTasks() {
  const container = document.getElementById("room-list");
  container.innerHTML = "";

  const rooms = tasks[currentDay];
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

renderTasks();
