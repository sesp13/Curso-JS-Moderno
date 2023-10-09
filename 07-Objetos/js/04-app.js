const producto = {
  nombre: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

// Object destructuring - sacar propiedades unicas
const { nombre, precio, noExiste } = producto;
console.log(nombre, precio, noExiste);
