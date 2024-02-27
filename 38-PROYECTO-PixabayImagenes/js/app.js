import { CLAVE } from '../clave.js';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const registrosPorPagina = 40;
let totalPaginas = 0;

window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector('#termino').value;

  if (terminoBusqueda === '') {
    mostrarAlerta('Agrega un término de busqueda');
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector('.alerta');
  if (!existeAlerta) {
    const alerta = document.createElement('p');
    alerta.classList.add(
      'bg-red-100',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'max-w-lg',
      'mx-auto',
      'mt-6',
      'text-center',
      'alerta'
    );

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${mensaje}</span>
  `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes(termino) {
  const key = CLAVE.PIXABAY_KEY;
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${100}`;

  fetch(url)
    .then((res) => res.json())
    .then((resultado) => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      console.log(totalPaginas);
      mostrarImagenes(resultado.hits);
    });
}

function mostrarImagenes(imagenes) {
  limpiarHtml();

  imagenes.forEach((imagen) => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultado.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
      <div class="bg-white">
        <img class="w-full" src="${previewURL}">
        <div class="p-4">
          <p class="font-bold">
            ${likes} <span class="font-light"> Me Gusta </span>
          </p>
          <p class="font-bold">
            ${views} <span class="font-light"> Veces vista </span>
          </p>
          <a 
            class="
              block
              w-full 
              bg-blue-800 
              hover:bg-blue-500 
              text-white 
              uppercase
              font-bold
              text-center
              rounded
              mt-5
              p-1
            "
            href="${largeImageURL}" 
            target="_blank" 
            rel="noopener noreferer"
          >
            Ver Imagen
          </a>
        </div>
      </div>
    </div>
    `;
  });
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function calcularPaginas(total) {
  return Math.ceil(total / registrosPorPagina);
}
