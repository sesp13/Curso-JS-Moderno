if ('serviceWorker' in navigator) {
  // Se toma como referencia el root del proyecto
  navigator.serviceWorker
    .register('./sw.js')
    .then((registrado) => {
      console.log('Se instalo', registrado);
    })
    .catch((error) => {
      console.log('Falló la instalación');
    });
} else {
  console.log('Service workers no soportados');
}
