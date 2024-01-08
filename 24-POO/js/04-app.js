class Cliente {
  #nombre;

  constructor(nombre, saldo) {
    this.#nombre = nombre;
    this.saldo = saldo;
  }

  mostrarInformacion() {
    return `Cliente ${this.nombre}, tu saldo es de ${this.saldo}`;
  }
}

const juan = new Cliente('Juan', 400);
console.log(juan);
console.log(juan.nombre);
