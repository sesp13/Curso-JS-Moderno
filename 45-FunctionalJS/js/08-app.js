// Scope global
const cliente = 'Juan';

// Scope local
function mostrarCliente() {
  const cliente = 'Pablo';
  console.log(cliente);
}

console.log(cliente);

mostrarCliente();

const obtenerCliente = () => {
  const nombre = 'Juan';

  function muestraNombre() {
    console.log(nombre);
  }

  // Closure - hago que nombre sea accesible con esta llamada en el exterior
  return muestraNombre;
};

const cliente2 = obtenerCliente();
cliente2();
