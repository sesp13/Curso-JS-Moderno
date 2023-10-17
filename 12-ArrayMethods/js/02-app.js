// Find index

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

const carrito = [
  { nombre: 'Monitor 27 Pulgadas', precio: 500 },
  { nombre: 'Televisión', precio: 100 },
  { nombre: 'Tablet', precio: 200 },
  { nombre: 'Audifonos', precio: 300 },
  { nombre: 'Teclado', precio: 400 },
  { nombre: 'Celular', precio: 700 },
];

meses.forEach((mes, i) => {
  if (mes == 'Abril') {
    console.log(`el indice del mes ${mes} es ${i}`);
  }
});

const indice = meses.findIndex((mes) => mes === 'Abril');
console.log(indice);

