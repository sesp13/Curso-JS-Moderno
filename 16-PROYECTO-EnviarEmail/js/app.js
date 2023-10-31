document.addEventListener('DOMContentLoaded', () => {
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');

  inputEmail.addEventListener('blur', validar);

  inputAsunto.addEventListener('blur', validar);

  inputMensaje.addEventListener('blur', validar);

  function validar(event) {
    const value = event.target.value;

    if (value.trim() === '') {
      mostrarAlerta();
    }
  }

  function mostrarAlerta() {
    const error = document.createElement('p');
    error.textContent = 'Hubo un error';
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
    formulario.appendChild(error);
  }
});
