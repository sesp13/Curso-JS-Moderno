const aplicarDescuento = new Promise((resolve, reject) => {
  const descuento = true;
  if (descuento) {
    resolve('Descuento aplicado');
  } else {
    reject('No se pudo aplicar el descuento');
  }
});

// 3 valores posibles
// fulfilled - el promise se cumplió
// rejected - el promise falló
// pending - no se ha cumplido ni tampoco rechazado

aplicarDescuento
  .then((result) => descuento(result))
  .catch((error) => {
    console.log(error);
  });

function descuento(mensaje) {
  console.log(mensaje);
}
