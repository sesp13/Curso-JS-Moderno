const url = 'http://localhost:3000/clientes';

export const nuevoCliente = async (cliente) => {
  try {
    await fetch(url, {
      body: JSON.stringify(cliente),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
};

export const obtenerClientes = async () => {
  try {
    const res = await fetch(url);
    const clientes = await res.json();
    return clientes;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarCliente = async (id) => {
  try {
    await fetch(`${url}/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerCliente = async (id) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const cliente = await res.json();
    return cliente;
  } catch (error) {
    console.log(error);
  }
};

export const editarCliente = async (cliente) => {
  try {
    await fetch(`${url}/${cliente.id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
  }
};
