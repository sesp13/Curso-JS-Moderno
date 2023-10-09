const numero1 = "20";
const numero2 = "20.2";
const numero3 = "uno";
const numero4 = 20.2;

console.log(numero1);
console.log(Number.parseInt(numero1));
console.log(Number.parseFloat(numero2));
console.log(Number.parseInt(numero3)); // NaN

// Revisar si es entero o no
console.log(Number.isInteger(numero1)); // true
console.log(Number.isInteger(numero3)); // false