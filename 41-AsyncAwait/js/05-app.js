const url = 'https://picsum.photos/list';

document.addEventListener('DOMContentLoaded', obtenerDatos);

async function obtenerDatos() {
  try {
    const res = await fetch(url);
    const body = await res.json();
    console.log(body);
  } catch (error) {
    console.log(error);
  }
}
