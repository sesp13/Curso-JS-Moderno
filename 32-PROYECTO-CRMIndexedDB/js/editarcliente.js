(function () {
  let idCliente;

  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');
  const formulario = document.querySelector('#formulario');

  document.addEventListener('DOMContentLoaded', () => {
    conectarDB();

    formulario.addEventListener('submit', actualizarCliente);

    // Verificar el id de la url
    const parametrosUrl = new URLSearchParams(window.location.search);
    idCliente = parametrosUrl.get('id');

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 1000);
    }
  });

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    empresaInput.value = empresa;
    emailInput.value = email;
    telefonoInput.value = telefono;
  }

  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === '' ||
      emailInput.value === '' ||
      telefonoInput === '' ||
      empresaInput === ''
    ) {
      imprimirAlerta('Hubo un error', 'error');
    }

    const clienteActualizado = {
      nombre: nombreInput.value,
      empresa: empresaInput.value,
      telefono: telefonoInput.value,
      email: emailInput.value,
      id: Number(idCliente),
    };

    const transaction = DB.transaction('crm', 'readwrite');
    const objectStore = transaction.objectStore('crm');
    objectStore.put(clienteActualizado);

    transaction.oncomplete = function () {
      imprimirAlerta('Editado correctamente');
    };

    transaction.onerror = function () {
      imprimirAlerta('Hubo un error', 'error');
    };
  }
})();
