// Crear clase

class Cliente {
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }

  mostrarInformacion() {
    return `Cliente ${this.nombre}, tu saldo es de ${this.saldo}`;
  }
}

const juan = new Cliente('Juan', 400);
console.log(juan);
console.log(juan.mostrarInformacion());

const Cliente2 = class {
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }
};
const juan2 = new Cliente2('Simon', 50);
console.log(juan2);
