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

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (acumulador, item) => acumulador + item.cantidad,
      0
    );
    this.restante = this.presupuesto - gastado;
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    this.calcularRestante();
  }
}

class UI {
  constructor() {
    this.totalSelector = document.querySelector('#total');
    this.restanteSelector = document.querySelector('#restante');
  }

  insertarPresupuesto(presupuestoGlobal) {
    const { presupuesto, restante } = presupuestoGlobal;
    this.totalSelector.textContent = presupuesto;
    this.restanteSelector.textContent = restante;
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

  mostrarListadoGastos(gastos) {
    // Borrar el contenido del contenedor
    this.limpiarHtml(gastoListado);

    // Iterar sobre los gastos
    gastos.forEach(({ cantidad, nombre, id }) => {
      // Crear LI
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className =
        'list-group-item d-flex justify-content-between align-items-center mb-2';
      // Set data-id attribute
      nuevoGasto.dataset.id = id;

      // Agregar el HTML del gasto
      nuevoGasto.innerHTML = `
        ${nombre} <span class="badge badge-primary badge-pill">${cantidad}</span>
      `;

      // Boton para borrar gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times;';
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      };
      nuevoGasto.appendChild(btnBorrar);

      // Agregar al html usando propiedad global
      gastoListado.appendChild(nuevoGasto);
    });
  }

  limpiarHtml(referencia) {
    while (referencia.firstChild) {
      referencia.removeChild(referencia.firstChild);
    }
  }

  actualizarRestante(restante) {
    this.restanteSelector.textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj) {
    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector('.restante');

    if (presupuesto / 4 > restante) {
      // Comprobar 25%
      restanteDiv.classList.remove('alert-success', 'alert-warning');
      restanteDiv.classList.add('alert-danger');
    } else if (presupuesto / 2 > restante) {
      // Comprobar 50%
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-warning');
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-warning');
      restanteDiv.classList.add('alert-success');
    }

    // Si el total es 0 o menor
    if (restante < 0) {
      this.imprimirAlerta('El presupuesto se ha agotado', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true;
    }
  }
}

// Instanciar
const ui = new UI();
let presupuestoGlobal;

// Funciones
function preguntarPresupuesto() {
  // const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
  const presupuestoUsuario = 100;

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
  const cantidad = Number(document.querySelector('#cantidad').value);

  if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }

  // Generar un objeto con el gastos
  const gasto = { nombre, cantidad, id: Date.now() };
  presupuestoGlobal.nuevoGasto(gasto);
  ui.imprimirAlerta('Gasto agregado correctamente');

  // Imprimir los gastos
  const { gastos, restante } = presupuestoGlobal;
  ui.mostrarListadoGastos(gastos);

  // Actualizar restante
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuestoGlobal);

  formulario.reset();
}

function eliminarGasto(id) {
  presupuestoGlobal.eliminarGasto(id);
  const { gastos, restante } = presupuestoGlobal;
  ui.imprimirAlerta('Gasto eliminado correctamente');
  ui.mostrarListadoGastos(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuestoGlobal);
}
