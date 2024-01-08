// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
  formulario.addEventListener('submit', agregarGasto);
}

// Clases

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
}

class UI {
  insertarPresupuesto(presupuestoGlobal) {
    const { presupuesto, restante } = presupuestoGlobal;
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');

    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

// Instanciar
const ui = new UI();
let presupuestoGlobal;

// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');

  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario == null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuestoGlobal = new Presupuesto(presupuestoUsuario);
  ui.insertarPresupuesto(presupuestoGlobal);
}

function agregarGasto(e) {
  e.preventDefault();
  const nombre = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }
}
