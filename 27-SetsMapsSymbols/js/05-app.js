const sym = Symbol();
const sym2 = Symbol();

if (sym === sym2) {
  console.log('Son iguales');
} else {
  // Un symbol es unico, jamas sera igual a otros
  console.log('Son diferentes');
}

const nombre = Symbol();
const apellido = Symbol();

const persona = {};

// Agregar nombre y apellido (symbols) como propiedades del objeto
persona[nombre] = 'Juan';
persona[apellido] = 'De la torre';
persona.tipo = 'Tipo';
persona.saldo = 500;

console.log(persona);

// Acceder a la propiedad de symbol
console.log(persona[nombre]);

// Las propiedades que se utilizan en un symbol no son iterables
for(let i in persona) {
  console.log(i);
}

const nombreCliente = Symbol('Nombre del Cliente');
const cliente = {};

cliente[nombreCliente] = 'Pedro'
console.log(cliente);