// Funciones que retorna funciones
const obtenerCliente = () => () => console.log('Santiago');

const fn = obtenerCliente();

fn();
