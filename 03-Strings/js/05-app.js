const producto = 'Monitor 20 pulgadas';

//Reemplazar partes de la cadena de texto
console.log(producto);
console.log(producto.replace(' pulgadas', '"'));
console.log(producto.replace('Monitor', 'Monitor Curvo'));

// Cortar parte del texto
console.log(producto.slice(0, 10));
console.log(producto.slice(8));
console.log(producto.slice(2, 1));

// Alternativa a slice
console.log(producto.substring(0, 10));


const usuario = "Juan";
console.log(usuario.substring(0,1));
console.log(usuario.charAt(0));