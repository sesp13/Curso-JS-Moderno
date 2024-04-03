const cliente = 'Juan';

function mostrarCliente() {
  const cliente = 'Pedro';
  console.log(cliente);
}

mostrarCliente();

const login = true;
function clienteLogueado() {
  const cliente = 'Juan';

  if (login) {
    const cliente = 'Admin';
    console.log(cliente);
  }
}

clienteLogueado();