const restaurantApp = {};

restaurantApp.platillos = [
  {
    platillo: 'Pizza',
    precio: 25,
  },
  {
    platillo: 'Hamburguesa',
    precio: 48,
  },
  {
    platillo: 'Hot Dog',
    precio: 48,
  },
];

restaurantApp.funciones = {
  mostrarMenu: (platillos) => {
    console.log('Bienvenidos con nuestro menú');

    platillos.forEach((platillo, index) => {
      console.log(`${index}: ${platillo.platillo} $${platillo.precio}`);
    });
  },
  ordenar: (id) => {
    console.log(
      `Tu platillo: ${restaurantApp.platillos[id].platillo} se está preparando`
    );
  },
  agregarPlatillo: (platillo, precio) => {
    const nuevo = {
      platillo,
      precio,
    };
    restaurantApp.platillos.push(nuevo);
  },
};

const { platillos } = restaurantApp;

// Esta unicidad hace que no se choquen los nombres
restaurantApp.funciones.ordenar(1);
restaurantApp.funciones.agregarPlatillo('Taco', 20);
restaurantApp.funciones.mostrarMenu(platillos);
