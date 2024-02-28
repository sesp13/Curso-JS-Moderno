import { CLAVE } from '../clave.js';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const registrosPorPagina = 40;
let terminoBusqueda = '';
let paginaActual = 1;
let totalPaginas = 0;
let iterador;

window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  terminoBusqueda = document.querySelector('#termino').value;
  paginaActual = 1;

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
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

  fetch(url)
    .then((res) => res.json())
    .then((resultado) => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      mostrarImagenes(resultado.hits);
    });
}

function mostrarImagenes(imagenes) {
  limpiarHtml(resultado);

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

  imprimirPaginador();
}

function limpiarHtml(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

// Crear generador para el paginador
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcularPaginas(total) {
  return Math.ceil(total / registrosPorPagina);
}

function imprimirPaginador() {
  limpiarHtml(paginacionDiv);
  iterador = crearPaginador(totalPaginas);
  while (true) {
    const { value, done } = iterador.next();
    if (done) break;
    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add(
      'siguiente',
      'bg-yellow-400',
      'px-4',
      'py-1',
      'mr-2',
      'font-bold',
      'mb-3',
      'rounded'
    );
    boton.onclick = (e) => {
      paginaActual = value;
      buscarImagenes(terminoBusqueda);
    };

    paginacionDiv.appendChild(boton);
  }
}
