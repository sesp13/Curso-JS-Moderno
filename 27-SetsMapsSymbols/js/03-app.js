const cliente = new Map([]);

cliente.set('nombre', 'Karen');
cliente.set('tipo', 'Premium');
cliente.set('saldo', 3000);

console.log(cliente);

// Extension
console.log(cliente.size);

// Comprobar llave
console.log(cliente.has('nombre'));

// Obtener valor
console.log(cliente.get('nombre'));

// Eliminar llave
console.log(cliente.delete('saldo'));
console.log(cliente.has('saldo'));
console.log(cliente.get('saldo'));

// Eliminar todo el map
cliente.clear();

// Otra forma de declararlo
const paciente = new Map([
  ['nombre', 'paciente'],
  ['cuarto', 'no definido'],
]);

paciente.set('dr', 'Dr Juan');

console.log(paciente);

// Los maps son iterables
paciente.forEach((datos, index) => {
  console.log(datos);
  console.log(index);
});
