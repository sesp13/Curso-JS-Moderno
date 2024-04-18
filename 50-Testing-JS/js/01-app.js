// Probar 2 valores

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

let resultado = suma(2, 5);
let esperado = 7;

if (resultado === esperado) {
  console.log(`El ${resultado} es diferente a lo esperado; la prueba falló`);
} else {
  console.log('La prueba pasó correctamente');
}

resultado = resta(5, 3);
esperado = 2;

if (resultado === esperado) {
  console.log(`El ${resultado} es diferente a lo esperado; la prueba falló`);
} else {
  console.log('La prueba pasó correctamente');
}
