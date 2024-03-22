const suma = (a, b) => a + b;

const multiplicar = (a, b) => a * b;

const sumarOMultiplicar = (fn) => fn(10, 20);

// Funciones como argumento
console.log(sumarOMultiplicar(suma));
console.log(sumarOMultiplicar(multiplicar));
