function descargarClientes() {
  return new Promise((resolve, reject) => {
    const error = false;

    setTimeout(() => {
      if (!error) {
        resolve('El listado de clientes se descargó correctamente');
      } else {
        reject('Error en la conexión');
      }
    }, 3000);
  });
}

// async await
const ejecutar = async () => {
  try {
    const response = await descargarClientes();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

ejecutar();
