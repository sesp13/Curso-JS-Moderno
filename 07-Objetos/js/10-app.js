const producto = {
  nombre: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

const medidas = {
  peso: '1kg',
  medida: '1m',
};

// Formas de combinar
const resultado = Object.assign(producto, medidas);

console.log(resultado);

const resultado2 = {...producto, ...medidas}