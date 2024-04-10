// Singleton

let instancia = null;
class Persona {
  constructor(nombre, email) {
    if (instancia === null) {
      this.nombre = nombre;
      this.email = email;
      instancia = this;
    } else {
      return instancia;
    }
  }
}

const persona = new Persona('Juan', 'correo@correo.com');
console.log(persona);

const persona2 = new Persona('Karen', 'correo2@correo.com');
console.log(persona2);
