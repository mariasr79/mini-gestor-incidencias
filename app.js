// Array donde guardaremos las incidencias
let incidencias = JSON.parse(localStorage.getItem("incidencias")) || [];

// Referencias al DOM
const form = document.getElementById("formIncidencia");
const lista = document.getElementById("listaIncidencias");

const abiertasEl = document.getElementById("abiertas");
const resueltasEl = document.getElementById("resueltas");
const filtro = document.getElementById("filtro");

// Mostrar incidencias + actualizar contador
function mostrarIncidencias() {
  lista.innerHTML = "";

  let abiertas = 0;
  let resueltas = 0;
  const valorFiltro = filtro.value;

  incidencias.forEach((incidencia, index) => {
    // Aplicar filtro
    if (valorFiltro !== "todas" && incidencia.estado !== valorFiltro) {
      return;
    }

    const li = document.createElement("li");
    li.className = "incidencia";

    li.innerHTML = `
      <div>
        <strong>${incidencia.titulo}</strong> - ${incidencia.cliente} <br>
        <small>${incidencia.descripcion}</small>
      </div>
      ${
        incidencia.estado === "abierta"
          ? `<button onclick="resolverIncidencia(${index})">Resolver</button>`
          : `<span style="color:green; font-weight:bold;">Resuelta</span>`
      }
    `;

    lista.appendChild(li);

    // Contar incidencias
    if (incidencia.estado === "abierta") {
      abiertas++;
    } else {
      resueltas++;
    }
  });

  // Actualizar contadores en pantalla
  abiertasEl.textContent = abiertas;
  resueltasEl.textContent = resueltas;
}

// Escuchar cambios en el filtro
filtro.addEventListener("change", mostrarIncidencias);


// Añadir nueva incidencia
form.addEventListener("submit", e => {
  e.preventDefault();

  const nueva = {
    titulo: document.getElementById("titulo").value,
    descripcion: document.getElementById("descripcion").value,
    cliente: document.getElementById("cliente").value,
    estado: "abierta"
  };

  incidencias.push(nueva);
  localStorage.setItem("incidencias", JSON.stringify(incidencias));
  form.reset();
  mostrarIncidencias();
});

// Marcar como resuelta
function resolverIncidencia(index) {
  incidencias[index].estado = "resuelta"; // solo cambiamos el estado
  localStorage.setItem("incidencias", JSON.stringify(incidencias));
  mostrarIncidencias();
}


// Inicializar
mostrarIncidencias();
