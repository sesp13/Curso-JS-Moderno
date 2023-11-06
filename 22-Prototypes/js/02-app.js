function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}

const juan = new Cliente('Juan', 200);
console.log(juan);

function formatearCLiente({ nombre, saldo }) {
  return `El cliente ${nombre} tiene un saldo de ${saldo}`;
}

console.log(formatearCLiente(juan));

function Empresa(nombre, saldo, categoria) {
  this.nombre = nombre;
  this.saldo = saldo;
  this.categoria = categoria;
}

function formatearEmpresa({ nombre, saldo, categoria }) {
  return `La empresa ${nombre} tiene un saldo de ${saldo} y categoria ${categoria}`;
}

const emp1 = new Empresa('Codigo con Juan', 4000, 'cursos en linea');
console.log(formatearEmpresa(emp1));
