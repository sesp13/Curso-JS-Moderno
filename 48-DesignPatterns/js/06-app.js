// Mixin

class Persona {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

class Cliente {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

const funcionesPersona = {
  mostrarInformacion() {
    console.log(`Nombre persona ${this.nombre} Email ${this.email}`);
  },
  mostrarNombre() {
    console.log(`El nombre es ${this.nombre}`);
  },
};

// Añadir funciones a la case de persona
Object.assign(Persona.prototype, funcionesPersona);
// A cliente, ambas compartirian
Object.assign(Cliente.prototype, funcionesPersona);

const cliente = new Persona('Juan', 'juan@juan.com');
console.log(cliente);
cliente.mostrarInformacion();

const cliente2 = new Cliente('Cliente', 'Cliente@cliente.com');
console.log(cliente2);
cliente2.mostrarInformacion();
cliente2.mostrarNombre();