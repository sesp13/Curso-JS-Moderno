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

let editando = false;

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

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }

  editarCita(nuevaCita) {
    this.citas = this.citas.map((cita) => {
      if (cita.id === nuevaCita.id) {
        return nuevaCita;
      } else {
        return cita;
      }
    });
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

    citas.forEach((cita) => {
      const { mascota, fecha, hora, propietario, sintomas, telefono, id } =
        cita;
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

      // Boton para eliminar la cita
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = 'Eliminar';
      btnEliminar.onclick = () => eliminarCita(id);

      // Boton para editar la cita
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info');
      btnEditar.innerHTML = 'Editar';
      btnEditar.onclick = () => cargarEdicion(cita);

      // Agregar parrafos al div cita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // Agregar citas al html
      contenedorCitas.appendChild(divCita);
    });
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

  if (editando) {
    editarCita();
  } else {
    crearCita();
  }

  // Reiniciar valores
  formulario.reset();
  reiniciarObjeto();

  // Mostrar html
  ui.imprimirCitas(administrarCitas);
}

function crearCita() {
  // Generando un id unico para la cita
  citaObj.id = Date.now();

  // Creando una nueva cita
  administrarCitas.agregarCita({ ...citaObj });

  ui.imprimirAlerta('Se agregó correctamente');
}

function editarCita() {
  administrarCitas.editarCita({ ...citaObj });
  ui.imprimirAlerta('Se editó correctamente');
  // Regresar el texto del botón a su estado original
  formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
  editando = false;
}

function reiniciarObjeto() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

function eliminarCita(id) {
  // Eliminar la cita
  administrarCitas.eliminarCita(id);

  // Muestre un mensaje
  ui.imprimirAlerta('Cita eliminada correctamente');

  // Refrescar
  ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicipon
function cargarEdicion(cita) {
  const { mascota, fecha, hora, propietario, sintomas, telefono, id } = cita;

  mascotaInput.value = mascota;
  propetarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.propietario = propietario;
  citaObj.sintomas = sintomas;
  citaObj.telefono = telefono;
  citaObj.id = id;

  // Cambiar texto del boton
  formulario.querySelector('button[type="submit"]').textContent =
    'Guardar Cambios';

  editando = true;
}

// Ejecuccion
eventListeners();
