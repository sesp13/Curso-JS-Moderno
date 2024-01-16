const weakset = new WeakSet();

const cliente = {
  nombre: 'Juan',
  saldo: 100,
};
weakset.add(cliente);
const nombre = 'juan';
// Esto es un error, no es válido
// weakset.add(nombre);

console.log(weakset.has(cliente));

weakset.delete(cliente);

// No hay este método -> undefined
console.log(weakset.size);
