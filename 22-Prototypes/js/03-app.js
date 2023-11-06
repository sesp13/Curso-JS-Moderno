function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}
// Creando prototype
Cliente.prototype.tipoCliente = function () {
  let tipo;
  if (this.saldo > 10000) {
    tipo = 'Gold';
  } else if (this.saldo > 5000) {
    tipo = 'Platinum';
  } else {
    tipo = 'Normal';
  }

  return tipo;
};

Cliente.prototype.nombreClienteSaldo = function () {
  return `Nombre ${this.nombre}, Saldo ${
    this.saldo
  }, Tipo: ${this.tipoCliente()}`;
};

Cliente.prototype.retiraSaldo = function (cantidad) {
  this.saldo -= cantidad;
};

const pedro = new Cliente('Pedro', 6000);

console.log(pedro);
console.log(pedro.tipoCliente());
console.log(pedro.nombreClienteSaldo());
pedro.retiraSaldo(2000);
console.log(pedro.nombreClienteSaldo());

function Empresa(nombre, saldo, categoria) {
  this.nombre = nombre;
  this.saldo = saldo;
  this.categoria = categoria;
}

const empresa = new Empresa('Mi empresa', 200, 'cocina');
console.log(empresa);
