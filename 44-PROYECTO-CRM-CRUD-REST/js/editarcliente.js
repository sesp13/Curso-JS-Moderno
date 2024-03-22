import { editarCliente, obtenerCliente } from './API.js';
import { mostrarAlerta, validar } from './funciones.js';

(function () {
  // campos del formulario
  const nombreInput = document.querySelector('#nombre');
  const empresaInput = document.querySelector('#empresa');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const idInput = document.querySelector('#id');

  document.addEventListener('DOMContentLoaded', async () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idCliente = parseInt(parametrosUrl.get('id'));
    const cliente = await obtenerCliente(idCliente);
    mostrarCliente(cliente);

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);
  });

  function mostrarCliente(cliente) {
    const { nombre, empresa, email, id, telefono } = cliente;

    nombreInput.value = nombre;
    empresaInput.value = empresa;
    emailInput.value = email;
    idInput.value = id;
    telefonoInput.value = telefono;
  }

  function validarCliente(e) {
    e.preventDefault();

    const cliente = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: idInput.value,
    };

    if (validar(cliente)) {
      mostrarAlerta('Todos los campos son obligatorios');
    }

    editarCliente(cliente);
    window.location.href = 'index.html';
  }
})();
