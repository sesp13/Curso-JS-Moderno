const carrito = new Set();
carrito.add('Camisa');
carrito.add('Disco 1');
carrito.add('Disco 2');
carrito.add('Disco 3');
// No se agrega
carrito.add('Disco 3');
console.log(carrito);

// tamaño
console.log(carrito.size);

// comprobar si hay un elemento
console.log(carrito.has('Camisa'));
console.log(carrito.has('Guitarra'));

carrito.forEach((elemento) => {
  console.log(elemento);
});

// Eliminar -- retorna true o false si lo logra eliminar
carrito.delete('Disco 3');

// Eliminar todos los elementos del set
carrito.clear();

// ejemplo del siguiente arreglo eliminar los duplicados
const numeros = [10, 20, 30, 40, 50, 10, 20, 50];
const unicos = new Set(numeros);
console.log(unicos);
