const carrito = [];

const producto = {
  nombre: 'Monitor 32 pulgadas',
  precio: 400,
};

const producto2 = {
  nombre: 'Teclado',
  precio: 500,
};

const producto3 = {
  nombre: 'Celular',
  precio: 100,
};

let resultado = [...carrito, producto];

resultado = [...resultado, producto2];

resultado = [producto3, ...resultado];

// Eliminar ultimo elemento
// resultado.pop();

// console.log(resultado);

// Eliminar primer elemento
// resultado.shift();
// console.log(resultado);

// eliminar de un lugar en especifico
resultado.splice(1, 1);
console.log(resultado);