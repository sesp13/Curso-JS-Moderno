const cargarJSONArrayBtn = document.querySelector('#cargarJSONArray');
cargarJSONArrayBtn.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  const url = 'data/empleados.json';
  fetch(url)
    .then((response) => response.json())
    .then((resultado) => mostrarHtml(resultado));
}

function mostrarHtml(empleados) {
  const contenido = document.querySelector('.contenido');
  let html = '';
  empleados.forEach((empleado) => {
    const { id, nombre, empresa, trabajo } = empleado;
    html += `
    <p>Empleado ${nombre}</p>
    <p>Empresa: ${empresa}</p>
    <p>Id: ${id}</p>
    <p>Trabajo: ${trabajo}</p>
    <hr />
    `;
  });
  contenido.innerHTML = html;
}
