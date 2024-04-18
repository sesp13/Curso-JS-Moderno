// Probar 2 valores

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

let resultado = suma(2, 5);
let esperado = 7;

expected(resultado).toBe(esperado);

resultado = resta(5, 3);
esperado = 2;
expected(resultado).toBe(esperado);
expected(resultado).toEqual(esperado);

// Al estilo jest
function expected(esperado) {
  return {
    toBe: (resultado) => {
      if (resultado !== esperado) {
        console.log(
          `El ${resultado} es diferente a lo esperado; la prueba falló`
        );
      } else {
        console.log('La prueba pasó correctamente');
      }
    },
    toEqual: (resultado) => {
      if (resultado !== esperado) {
        console.log(
          `El ${resultado} es diferente a lo esperado; la prueba falló`
        );
      } else {
        console.log('La prueba pasó correctamente');
      }
    },
  };
}
