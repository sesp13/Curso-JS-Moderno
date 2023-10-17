function sumar(a, b) {
  return a + b;
}

const resultado = sumar(2, 3);

console.log(resultado);

let total = 0;

function agregarAlCarrito(precio) {
  return total += precio;
}

function calcularImpuesto(total) {
  return total * 1.15;
}

total = agregarAlCarrito(300);
total = agregarAlCarrito(100);
total = agregarAlCarrito(200);

const totalPagar = calcularImpuesto(total);
console.log(`El total a pagar es ${totalPagar}`);
console.log(total);
