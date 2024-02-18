document.addEventListener('visibilitychange', () => {
  if (document.visibilityState == 'visible') {
    console.log('ejecutar funcion para reproducir el video');
  } else {
    console.log('Detener el video');
  }
});
