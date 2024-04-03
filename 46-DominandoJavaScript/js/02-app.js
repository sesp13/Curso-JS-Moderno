// Esto funciona porque la funcion se registra
obtenerCliente();
function obtenerCliente(nombre) {
  console.log('Hi this is something function expression');
}

  // ERROR! pues la expresión es tratada como variable
  // obtenerCliente2('Pablo');

  const obtenerCliente2 = function (nombre) {
    console.log(`Function expression ${nombre}`);
  };

  obtenerCliente2('Pablo')