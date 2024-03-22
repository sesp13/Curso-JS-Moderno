const suma = (a, b, c) => a + b + c;

const parcial = (a) => (b, c) => suma(a, b, c);

console.log(suma(1, 2, 3));

// CUrrying dividir en argumentos parciales
const primerNumero = parcial(5);
const resultado = primerNumero(4, 3);

console.log(resultado);

const parcial2 = (a) => (b) => (c) => suma(a, b, c);

const n1 = parcial2(5);
const n2 = n1(4);
const resultado2 = n2(3)

const nuevoCurrying = parcial2(1)(2)(3);

console.log(resultado2);
console.log(nuevoCurrying);
