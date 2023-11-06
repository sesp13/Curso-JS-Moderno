const cliente = {
  nombre: 'Santiago',
  saldo: 500,
};

console.log(cliente);
console.log(typeof cliente);

function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}

const juan = new Cliente('Juan', 200);
console.log(juan);
