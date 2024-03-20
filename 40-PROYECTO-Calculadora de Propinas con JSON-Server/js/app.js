let cliente = {
  mesa: '',
  hora: '',
  pedido: [],
};

const categorias = {
  1: 'Comida',
  2: 'Bebidas',
  3: 'Postres',
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(e) {
  const mesa = document.querySelector('#mesa').value;
  const hora = document.querySelector('#hora').value;

  const camposVacios = [mesa, hora].some((campo) => campo === '');
  if (camposVacios) {
    // Verificar si ya hay una alerta
    const existeAlerta = document.querySelector('.invalid-feedback');

    if (!existeAlerta) {
      const alerta = document.createElement('div');
      alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
      alerta.textContent = 'Todos los campos son obligatorios';

      document.querySelector('.modal-body form').appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }
    return;
  }

  cliente = { ...cliente, mesa, hora };

  const modalFormulario = document.querySelector('#formulario');
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBootstrap.hide();

  mostrarSecciones();

  // Obtener platillos de la API de JSON server
  obtenerPlatillos();
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll('.d-none');
  seccionesOcultas.forEach((seccion) => {
    seccion.classList.remove('d-none');
  });
}

function obtenerPlatillos() {
  const url = `http://localhost:3000/platillos`;

  fetch(url)
    .then((res) => res.json())
    .then((resultado) => mostrarPlatillos(resultado))
    .catch((error) => {
      console.log(error);
    });
}

function mostrarPlatillos(platillos) {
  const contenido = document.querySelector('#platillos .contenido');

  platillos.forEach((platillo) => {
    const row = document.createElement('div');
    row.classList.add('row', 'py-3', 'border-top');

    const nombre = document.createElement('div');
    nombre.classList.add('col-md-4');
    nombre.textContent = platillo.nombre;

    const precio = document.createElement('div');
    precio.classList.add('col-md-3', 'fw-bold');
    precio.textContent = `$${platillo.precio}`;

    const categoria = document.createElement('div');
    categoria.classList.add('col-md-3');
    categoria.textContent = categorias[platillo.categoria];

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.min = 0;
    inputCantidad.id = `producto-${platillo.id}`;
    inputCantidad.classList.add('form-control');
    inputCantidad.value = 0;

    // Función que detecta la cantidad y el platillo
    inputCantidad.onchange = () => {
      const cantidad = parseInt(inputCantidad.value);
      agregarPlatillo({ ...platillo, cantidad });
    };

    const agregarContainer = document.createElement('div');
    agregarContainer.classList.add('col-md-2');
    agregarContainer.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregarContainer);

    contenido.appendChild(row);
  });

  function agregarPlatillo(producto) {
    let { pedido } = cliente;

    if (producto.cantidad > 0) {
      const existeProducto = pedido.some(
        (articulo) => articulo.id === producto.id
      );
      if (existeProducto) {
        const pedidoActualizado = pedido.map((articulo) => {
          if (articulo.id === producto.id) {
            articulo.cantidad = producto.cantidad;
          }
          return articulo;
        });
        cliente.pedido = [...pedidoActualizado];
      } else {
        cliente.pedido = [...pedido, producto];
      }
    } else {
      cliente.pedido = pedido.filter((articulo) => articulo.id !== producto.id);
    }

    // Limpiar el html previo
    limpiarHtml();

    actualizarResumen();
  }
}

function actualizarResumen() {
  const contenido = document.querySelector('#resumen .contenido');

  const resumen = document.createElement('div');
  resumen.classList.add('col-md-6', 'card', 'py-5', 'px-3', 'shadow');

  // Información de la esa
  const mesa = document.createElement('p');
  mesa.textContent = `Mesa: `;
  mesa.classList.add('fw-bold');

  const mesaSpan = document.createElement('span');
  mesaSpan.textContent = cliente.mesa;
  mesa.classList.add('fw-normal');

  // Información de la hora
  const hora = document.createElement('p');
  hora.textContent = `Hora: `;
  hora.classList.add('fw-bold');

  const horaSpan = document.createElement('span');
  horaSpan.textContent = cliente.hora;
  hora.classList.add('fw-normal');

  // Agregar a los elementos padre
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  // Titulo de la seccion
  const heading = document.createElement('h3');
  heading.textContent = 'Platillos consumidos';
  heading.classList.add('my-4', 'text-center');

  // Iterar sobre los pedidos
  const grupo = document.createElement('ul');
  grupo.classList.add('list-group');
  const { pedido } = cliente;
  pedido.forEach((articulo) => {
    const { nombre, cantidad, precio, id } = articulo;

    const lista = document.createElement('li');
    lista.classList.add('list-group-item');

    // Titulo del articulo
    const nombreEl = document.createElement('h4');
    nombreEl.classList.add('my-4');
    nombreEl.textContent = nombre;

    // Cantidad del articulo
    const cantidadEl = document.createElement('p');
    cantidadEl.classList.add('fw-bold');
    cantidadEl.textContent = `Cantidad: `;

    const cantidadValor = document.createElement('span');
    cantidadValor.classList.add('fw-normal');
    cantidadValor.textContent = cantidad;

    // Precio del articulo
    const precioEl = document.createElement('p');
    precioEl.classList.add('fw-bold');
    precioEl.textContent = `Precio: `;

    const precioValor = document.createElement('span');
    precioValor.classList.add('fw-normal');
    precioValor.textContent = `$${precio}`;

    // Subotal del articulo
    const subtotalEl = document.createElement('p');
    subtotalEl.classList.add('fw-bold');
    subtotalEl.textContent = `Subtotal: `;

    const subtotalValor = document.createElement('span');
    subtotalValor.classList.add('fw-normal');
    subtotalValor.textContent = calularSubtotal(precio, cantidad);

    // Boton para eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn', 'btn-danger');
    btnEliminar.textContent = 'Eliminar del pedido';
    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    // Agregar valores a sus contenedores
    cantidadEl.appendChild(cantidadValor);
    precioEl.appendChild(precioValor);
    subtotalEl.appendChild(subtotalValor);

    // Agregar elementos al li
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(precioEl);
    lista.appendChild(subtotalEl);
    lista.appendChild(btnEliminar);

    // Agregar lista al grupo principal
    grupo.appendChild(lista);
  });

  // Agregar al contenedor
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(heading);
  resumen.appendChild(grupo);

  contenido.appendChild(resumen);
}

function limpiarHtml() {
  const contenido = document.querySelector('#resumen .contenido');
  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

function calularSubtotal(precio, cantidad) {
  return `$ ${precio * cantidad}`;
}

function eliminarProducto(id) {
  const { pedido } = cliente;
  const resultado = pedido.filter((articulo) => articulo.id !== id);
  cliente.pedido = [...resultado];
  limpiarHtml();
  actualizarResumen();
}
