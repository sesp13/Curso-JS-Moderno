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

console.log(resultado);
