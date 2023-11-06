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

function Persona(nombre, saldo, telefono) {
  Cliente.call(this, nombre, saldo);
  this.telefono = telefono;
}

Persona.prototype = Object.create(Cliente);

Persona.prototype.constructor = Cliente;

const juan = new Persona('Juan', 500, 123456);
console.log(juan);
console.log(juan.nombreClienteSaldo());