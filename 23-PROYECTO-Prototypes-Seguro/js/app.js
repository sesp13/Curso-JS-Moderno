function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza la cotización del seguro
Seguro.prototype.cotizarSeguro = function () {
  /*
    Americano 1.15
    Asiatico 1.05
    Europeo 1.35
  */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  // Cada año que la diferencia es mayor, el costo va a reducirse un 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;
  /*
    si el seguro es básico se multiplica por un 30% más 
    si el seguro es completo se multiplica por un 50% más
  */
  if (this.tipo === 'basico') {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UI() {}
// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 10;

  const selectYear = document.querySelector('#year');

  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement('div');
  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));
  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (seguro, total) => {
  const { marca, year, tipo } = seguro;

  let textoMarca;

  switch (marca) {
    case '1':
      textoMarca = 'Americano';
      break;
    case '2':
      textoMarca = 'Asiatico';
      break;
    case '3':
      textoMarca = 'Europeo';
      break;
    default:
      break;
  }

  // Crear resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span> </p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span> </p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span> </p>
    <p class="font-bold">Total: <span class="font-normal">$${total}</span> </p>
    `;

  const resultadoDiv = document.querySelector('#resultado');

  // mostrar spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    // Se borra el spinner
    spinner.style.display = 'none';
    // Se muestra el resultado
    resultadoDiv.appendChild(div);
  }, 3000);
};

// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  // Llena el select con los años
  ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // Leer marca
  const marca = document.querySelector('#marca').value;

  // Leer año
  const year = document.querySelector('#year').value;

  // Leer tipo de cobertura
  const tipo = document.querySelector("input[name='tipo']:checked").value;

  if (marca === '' || year === '' || tipo === '') {
    ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }

  ui.mostrarMensaje('Cotizando...', 'exito');

  // Ocultar cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if (resultados !== null) {
    resultados.remove();
  }

  // Instanciar seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  // Usar prototype
  ui.mostrarResultado(seguro, total);
}
