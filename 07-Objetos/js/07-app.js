const producto = {
  nombre: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

// valid
producto.disponible = false;
console.log(producto);

// not valid
// producto = { other: true };
