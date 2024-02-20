const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    mostrarError('Ambos campos son obligatorios');
    return;
  }

  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alertaExists = document.querySelector('.alerta-error');
  if (alertaExists) return;

  const alerta = document.createElement('div');
  alerta.classList.add(
    'bg-red-100',
    'border-red-400',
    'text-red-700',
    'px-4',
    'py-3',
    'rounded',
    'max-w-md',
    'mx-auto',
    'mt-6',
    'text-center',
    'alerta-error'
  );
  alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
  `;

  container.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 5000);
}

function consultarAPI(ciudad, pais) {
  const appId = '';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  fetch(url)
    .then((res) => res.json())
    .then((datos) => {
      if (datos.cod === '404') {
        mostrarError('Ciudad no encontrada');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
