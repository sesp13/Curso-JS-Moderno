// Factory
// Crear objetos basados en condiciones
class InputHtml {
  constructor(tipo, nombre) {
    this.tipo = tipo;
    this.nombre = nombre;
  }

  crearInput() {
    return `<input type="${this.tipo}" name="${this.nombre}" id="${this.nombre}">`;
  }
}

class HtmlFactory {
  crearElemento(tipo, nombre) {
    switch (tipo) {
      case 'text':
        return new InputHtml('text', nombre);
      case 'tel':
        return new InputHtml('tel', nombre);
      case 'email':
        return new InputHtml('email', nombre);
      default:
        break;
    }
  }
}

const factory = new HtmlFactory();
const inputText = factory.crearElemento('text', 'nombre-cliente');
console.log(inputText.crearInput());

const factory2 = new HtmlFactory();
const inputText2 = factory2.crearElemento('tel', 'telefono-cliente');
console.log(inputText2.crearInput());

const factory3 = new HtmlFactory();
const inputText3 = factory3.crearElemento('email', 'email-cliente');
console.log(inputText3.crearInput());

