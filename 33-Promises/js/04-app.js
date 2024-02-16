const paises = [];

const nuevoPais = (pais) =>
  new Promise((resolve) => {
    setTimeout(() => {
      paises.push(pais);
      resolve(`Agregado ${pais}`);
    }, 3000);
  });

// Callback hell con promises
nuevoPais('Alemania')
  .then((result) => {
    console.log(result);
    console.log(paises);
    return nuevoPais('Francia');
  })
  .then((result) => {
    console.log(result);
    console.log(paises);
    return nuevoPais('Inglaterra');
  })
  .then((result) => {
    console.log(result);
    console.log(paises);
  });
