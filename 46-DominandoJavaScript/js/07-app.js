console.log('Primero');

setTimeout(() => {
  console.log('Segundo');
}, 0);

console.log('Tercero');

setTimeout(() => {
  console.log('Cuarto');
}, 0);

new Promise((resolve) => {
  resolve('Desconocido...');
}).then(console.log);

console.log('Ultimo');

// Orden real
// Primero
// 07-app.js:7 Tercero
// 07-app.js:17 Ultimo
// Desconocido...
// 07-app.js:4 Segundo
// 07-app.js:10 Cuarto

function hola() {
  console.log('Hola');
}

hola();
