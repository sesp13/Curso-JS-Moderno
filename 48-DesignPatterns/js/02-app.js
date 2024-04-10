// Constructor pattern

// Persona es abstracta en teoría en vanilla no lo podemos forzar
class Persona { 
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

class Cliente extends Persona {
  constructor(nombre, email, empresa) {
    super(nombre, email);
    this.empresa = empresa;
  }
}

const cliente = new Cliente('Miguel', 'cliente@cliente.com', 'empresa 1');

console.log(cliente);