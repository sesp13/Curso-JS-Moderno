window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

function actualizarEstado() {
  if (navigator.onLine) {
    console.log('Estas conectado');
  } else {
    console.log('Sin conexion');
  }
}
