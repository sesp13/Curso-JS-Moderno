// Variables
const resultado = document.querySelector('#resultado');
const marcaSelect = document.querySelector('#marca');
const yearSelect = document.querySelector('#year');
// const maxYear = new Date().getFullYear();
const minimoSelect = document.querySelector('#minimo');
const maximoSelect = document.querySelector('#maximo');
const puertasSelect = document.querySelector('#puertas');
const transmisionSelect = document.querySelector('#transmision');
const colorSelect = document.querySelector('#color');

const maxYear = 2020;
const minYear = maxYear - 10;

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

// Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos);
  llenarYearSelect();
});

marcaSelect.addEventListener('change', (e) => {
  const marca = e.target.value;
  datosBusqueda.marca = marca;
  filtrarAuto();
});

yearSelect.addEventListener('change', (e) => {
  const year = e.target.value;
  datosBusqueda.year = year;
  filtrarAuto();
});

minimoSelect.addEventListener('change', (e) => {
  const minimo = e.target.value;
  datosBusqueda.minimo = minimo;
  filtrarAuto();
});

maximoSelect.addEventListener('change', (e) => {
  const maximo = e.target.value;
  datosBusqueda.maximo = maximo;
  filtrarAuto();
});

puertasSelect.addEventListener('change', (e) => {
  const puertas = e.target.value;
  datosBusqueda.puertas = puertas;
  filtrarAuto();
});

transmisionSelect.addEventListener('change', (e) => {
  const transmision = e.target.value;
  datosBusqueda.transmision = transmision;
  filtrarAuto();
});

colorSelect.addEventListener('change', (e) => {
  const color = e.target.value;
  datosBusqueda.color = color;
  filtrarAuto();
});

// Funciones
function mostrarAutos(autosSeleccionados) {
  limpiarHtml();

  if (autosSeleccionados.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Paila no hay autos';
    resultado.appendChild(mensaje);
    return
  }

  autosSeleccionados.forEach(
    ({ marca, modelo, year, puertas, transmision, precio, color }) => {
      const autoHTML = document.createElement('p');
      autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio ${precio} - Color ${color}
    `;
      resultado.appendChild(autoHTML);
    }
  );
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarYearSelect() {
  for (let currentYear = maxYear; currentYear >= minYear; currentYear--) {
    const option = document.createElement('option');
    option.value = currentYear;
    option.textContent = `${currentYear}`;
    yearSelect.appendChild(option);
  }
}

function filtrarAuto() {
  const autosFiltrados = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  mostrarAutos(autosFiltrados);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  } else {
    return auto;
  }
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  // las fechas son numeros debemos transformarla
  if (year) {
    return auto.year === parseInt(year);
  } else {
    return auto;
  }
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  } else {
    return auto;
  }
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  } else {
    return auto;
  }
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  } else {
    return auto;
  }
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  } else {
    return auto;
  }
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  } else {
    return auto;
  }
}
