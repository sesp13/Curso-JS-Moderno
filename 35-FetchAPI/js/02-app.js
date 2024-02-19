const cargarJsonBtn = document.querySelector('#cargarJSON');
cargarJsonBtn.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  const url = 'data/empleado.json';

  fetch(url)
    .then((respuesta) => {
      // console.log(respuesta);
      // Leer el body como JSON
      return respuesta.json();
    })
    .then((resultado) => {
      mostrarHtml(resultado);
    });
}

function mostrarHtml(data) {
  const { empresa, nombre, id, trabajo } = data;

  const contenido = document.querySelector('.contenido');
  contenido.innerHTML = `
    <p>Empleado ${nombre}</p>
    <p>Empresa: ${empresa}</p>
    <p>Id: ${id}</p>
    <p>Trabajo: ${trabajo}</p>
  `;
}
