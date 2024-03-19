function descargarClientes() {
  return new Promise((resolve, reject) => {
    const error = true;

    setTimeout(() => {
      if (!error) {
        resolve('El listado de clientes se descargó correctamente');
      } else {
        reject('Error en la conexión')
      }
    }, 3000);
  });
}


// async await
async function ejecutar() {
  try {
    const response = await descargarClientes();
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}

ejecutar();