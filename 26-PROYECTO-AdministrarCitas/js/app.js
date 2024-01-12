// Selectores
// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propetarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// Objeto con la informacion de la cita
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

// Clase
class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    divMensaje.textContent = mensaje;

    document
      .querySelector('#contenido')
      .insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach(
      ({ mascota, fecha, hora, propietario, sintomas, telefono, id }) => {
        const divCita = document.createElement('div');
        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p');
        propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario</span> ${propietario}
        `;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">telefono</span> ${telefono}
        `;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha</span> ${fecha}
        `;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora</span> ${hora}
        `;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas</span> ${sintomas}
        `;

        // Agregar parrafos al div cita
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);

        // Agregar citas al html
        contenedorCitas.appendChild(divCita);
      }
    );
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

// Instancias globales
const ui = new UI();
const administrarCitas = new Citas();

// Funciones
function eventListeners() {
  mascotaInput.addEventListener('input', datosCita);
  propetarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}

function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
  e.preventDefault();

  const { mascota, fecha, hora, propietario, sintomas, telefono } = citaObj;

  if (
    mascota === '' ||
    fecha === '' ||
    hora === '' ||
    propietario === '' ||
    sintomas === '' ||
    telefono === ''
  ) {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    return;
  }

  // Generando un id unico para la cita
  citaObj.id = Date.now();

  // Creando una nueva cita
  administrarCitas.agregarCita({ ...citaObj });

  // Reiniciar valores
  formulario.reset();
  reiniciarObjeto();

  // Mostrar html
  ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

// Ejecuccion
eventListeners();
