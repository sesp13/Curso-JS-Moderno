// Mediator
function Vendedor(nombre) {
  this.nombre = nombre;
  this.sala = null;
}

Vendedor.prototype = {
  oferta: (articulo, precio) => {
    console.log(
      `Tenemos el siguiente artículo ${articulo}, iniciamos con un precio de ${precio}`
    );
  },
  vendido: (comprador) => {
    console.log(`Vendido a ${comprador.nombre}`);
  },
};

function Comprador(nombre) {
  this.nombre = nombre;
  this.sala = null;
}

Comprador.prototype = {
  oferta: (cantidad, comprador) => {
    console.log(`${comprador.nombre} : ${cantidad}`);
  },
};

function Subasta() {
  let compradores = {};

  return {
    registrar: (usuario) => {
      compradores[usuario.nombre] = usuario;
      // Se da la instancia especifica de como se comunican los objetos
      usuario.sala = this;
    },
  };
}

// Crear objetos
const juan = new Comprador('Juan');
const pablo = new Comprador('Pablo');
const vendedor = new Vendedor('Vendedor de autos');
const subasta = new Subasta();

// Registro de subasta
subasta.registrar(juan);
subasta.registrar(pablo);
subasta.registrar(vendedor);

vendedor.oferta('Mustang', 300);

juan.oferta(350, juan);
pablo.oferta(450, pablo);
juan.oferta(600, juan);
pablo.oferta(700, pablo);

vendedor.vendido(pablo);
