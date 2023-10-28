const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function agregarCurso(e) {
  e.preventDefault();
  // Prevenir event bubbling
  if (e.target.classList.contains('agregar-carrito')) {
    // Seleccionar los elementos padres del elemento seleccionado
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    carritoHtml();
  }
}

function leerDatosCurso(curso) {
  // console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  // Revisa si el carrito ya existe
  const existeCurso = articulosCarrito.some(
    (curso) => curso.id === infoCurso.id
  );

  if (existeCurso) {
    const nuevosCursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad += 1;
      }
      return curso;
    });
    articulosCarrito = [...nuevosCursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
}

function carritoHtml() {
  limpiarHtml();

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" />
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">
          X
        </a>
      </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHtml() {
  // Limpiar los elementos previos - Forma lenta
  //contenedorCarrito.innerHTML = '';

  // Forma rápida de borrado
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHtml();
  }
}

function vaciarCarrito() {
  articulosCarrito = [];
  carritoHtml();
}

// Ejecucción
cargarEventListeners();
