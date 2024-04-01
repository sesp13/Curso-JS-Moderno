// Composition
const obtenerNombre = (info) => ({
  mostrarNombre() {
    console.log(info.nombre);
  },
});

const guardarEmail = (info) => ({
  agregarEmail(email) {
    console.log(`Guardando el email en ${info.nombre}`);
    info.email = email;
  },
});

const obtenerEmail = (info) => ({
  mostrarEmail() {
    console.log(`Correo: ${info.email}`);
  },
});

const obtenerEmpresa = (info) => ({
  mostrarEmpresa() {
    console.log(`Empresa: ${info.empresa}`);
  },
});

const obtenerPuesto = (info) => ({
  mostrarPuesto() {
    console.log(`Puesto: ${info.puesto}`);
  },
});

function Cliente(nombre, email, empresa) {
  let info = { nombre, email, empresa };

  return Object.assign(
    info,
    obtenerNombre(info),
    guardarEmail(info),
    obtenerEmail(info),
    obtenerEmpresa(info)
  );
}

function Empleado(nombre, email, puesto) {
  let info = { nombre, email, puesto };

  return Object.assign(
    info,
    obtenerNombre(info),
    guardarEmail(info),
    obtenerEmail(info),
    obtenerPuesto(info)
  );
}

const cliente = new Cliente('Juan', 'juan@correo.com', 'Código con Juan');
cliente.mostrarNombre();
cliente.agregarEmail('cliente@cliente.com');
cliente.mostrarEmail();
cliente.mostrarEmpresa();

console.log('------------');

const empleado = new Empleado('Pedro', 'pedro@correo.com', 'Manager');
empleado.mostrarNombre();
empleado.agregarEmail('empleado@correo.com');
empleado.mostrarEmail();
empleado.mostrarPuesto();