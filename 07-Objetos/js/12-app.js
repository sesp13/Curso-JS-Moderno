// Object literal
const producto = {
  nombre: 'Monitor 20 Pulgadas',
  precio: 300,
  disponible: true,
};

// Object constructor
function Producto(nombre, precio) {
  this.nombre =nombre;
  this.precio = precio;
  this.disponible = true;
}

const producto2 = new Producto('Tablet', 500);

console.log(producto2);

const producto3 = new Producto('TV', 300);
console.log(producto3);