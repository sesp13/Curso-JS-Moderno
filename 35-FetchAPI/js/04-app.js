const cargarApiBtn = document.querySelector('#cargarAPI');
cargarApiBtn.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  const url = 'https://picsum.photos/list';
  fetch(url)
    .then((response) => response.json())
    .then((resultado) => mostrarHtml(resultado));
}

function mostrarHtml(data) {
  const contenido = document.querySelector('.contenido');
  let html = '';
  data.forEach((perfil) => {
    const { author, post_url } = perfil;
    html += ` 
    <p>${author}</p>
    <a href="${post_url}" target="_blank">Ver imagen</a>
    <hr />
    `;
  });
  contenido.innerHTML = html;
}
