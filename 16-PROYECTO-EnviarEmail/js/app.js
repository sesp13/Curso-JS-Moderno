document.addEventListener('DOMContentLoaded', () => {
  const contenido = {
    email: '',
    asunto: '',
    mensaje: '',
    'destinatario-cc': '',
  };
  const campoInvalido = 'no-valido';

  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const inputDestinatario = document.querySelector('#destinatario-cc');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  // Asignar eventos
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar);
  inputMensaje.addEventListener('blur', validar);
  inputDestinatario.addEventListener('blur', validar);
  btnReset.addEventListener('click', function (event) {
    event.preventDefault();
    resetearFormulario();
  });
  formulario.addEventListener('submit', enviarEmail);
  // Fin asignación de eventos

  function validar(event) {
    const value = event.target.value;
    const campo = event.target.id;
    const referenciaPadre = event.target.parentElement;

    if (value.trim() === '' && campo !== 'destinatario-cc') {
      mostrarAlerta(`El campo ${campo} es obligatorio`, referenciaPadre);
      contenido[campo] = '';
      comprobarContenido();
      return;
    }

    if (campo === 'email' && !validarEmail(value)) {
      mostrarAlerta('El email no es valido', referenciaPadre);
      contenido[campo] = '';
      comprobarContenido();
      return;
    }

    if (
      campo === 'destinatario-cc' &&
      value.trim() !== '' &&
      !validarEmail(value)
    ) {
      mostrarAlerta(
        'El destinatario debe ser un email válido',
        referenciaPadre
      );
      contenido[campo] = campoInvalido;
      comprobarContenido();
      return;
    }

    eliminarAlerta(referenciaPadre);
    contenido[campo] = value.trim().toLowerCase();
    comprobarContenido();
  }

  function mostrarAlerta(mensaje, referencia) {
    const existeAlerta = referencia.querySelector('p.bg-red-600');
    if (existeAlerta) {
      return;
    }
    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
    referencia.appendChild(error);
  }

  function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector('p.bg-red-600');
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email);
  }

  function comprobarContenido() {
    const { 'destinatario-cc': destinatarioCC, ...camposObligatorios } =
      contenido;
    if (
      Object.values(camposObligatorios).includes('') ||
      destinatarioCC === campoInvalido
    ) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  function resetearFormulario() {
    formulario.reset();
    contenido.email = '';
    contenido.asunto = '';
    contenido.mensaje = '';
    contenido['destinatario-cc'] = '';
    comprobarContenido();
  }

  function enviarEmail(event) {
    console.log();
    event.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
      resetearFormulario();

      const alertaExito = document.createElement('p');
      alertaExito.classList.add(
        'bg-green-500',
        'text-white',
        'p-2',
        'text-center',
        'rounded-lg',
        'mt-10',
        'font-bold',
        'text-sm',
        'uppercase'
      );
      alertaExito.textContent = 'Mensaje enviado correctamente';
      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 5000);
  }
});
