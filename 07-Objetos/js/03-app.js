const producto = {
  nombre: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

// Agregar propiedades
producto.imagen = 'imagen.jpg';

// Quitar propiedades
delete producto.disponible;

console.log(producto);
