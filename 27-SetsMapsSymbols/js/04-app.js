const producto = {
  idProducto: 10
}

const weak = new WeakMap();

weak.set(producto)

console.log(weak.has(producto));
console.log(weak.get(producto));
console.log(weak.delete(producto));

console.log(weak);