const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
  moneda: '',
  criptomoneda: '',
};

const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomonedas();

  formulario.addEventListener('submit', submitFormulario);
  criptomonedasSelect.addEventListener('change', leerValor);
  monedasSelect.addEventListener('change', leerValor);
});

function consultarCriptomonedas() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(url)
    .then((res) => res.json())
    .then((resultado) => obtenerCriptomonedas(resultado.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;
    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;

  if (criptomoneda === '' || moneda === '') {
    mostrarAlerta('Ambos campos son obligatorios');
    return;
  }

  // Consultar la api con los resultados
  consultarAPI();
}

function mostrarAlerta(msg) {
  const existeError = document.querySelector('.error');
  if (!existeError) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = msg;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  fetch(url)
    .then((res) => res.json())
    .then((cotizacion) =>
      mostrarCotizacionHtml(cotizacion.DISPLAY[criptomoneda][moneda])
    );
}

function mostrarCotizacionHtml(cotizacion) {
  limpiarHtml();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.innerHTML = `El precio es de <span>${PRICE}</span>`;

  const precioAlto = document.createElement('p');
  precioAlto.innerHTML = `Precio más alto del día <span>${HIGHDAY}</span>`;

  const precioBajo = document.createElement('p');
  precioBajo.innerHTML = `Precio más bajo del día <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement('p');
  ultimasHoras.innerHTML = `Variación en las últimas 24 horas <span>${CHANGEPCT24HOUR} %</span>`;

  const ultimaActualizacion = document.createElement('p');
  ultimaActualizacion.innerHTML = `última actualización <span>${LASTUPDATE}</span>`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaActualizacion);
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHtml();
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);
}
