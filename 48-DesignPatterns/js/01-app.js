// Class pattern

class Persona {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
  }
}

const juan = new Persona('Juan', 'correo@correo.com');

console.log(juan);