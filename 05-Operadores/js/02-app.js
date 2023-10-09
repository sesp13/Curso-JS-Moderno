const numero1 = 20;
const numero2 = '20';
const numero3 = 30;

// Revisar si 2 numeros son iguales
console.log(numero1 == numero3); // false
console.log(numero1 == numero2); // true - porque se remite al valor

// Comparador estricto
console.log(numero1 === numero2); // false todo debe coincidir - tipo de dato también
console.log(numero1 === parseInt(numero2)); // true
console.log(typeof numero1);
console.log(typeof numero2);

// Diferente
const password1 = "admin";
const password2 = "Admin";
console.log(password1 != password2);
console.log(numero1 != numero2);
console.log(password1 !== password2); // Estricto