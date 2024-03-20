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

    if (cliente.pedido.length > 0) {
      actualizarResumen();
    } else {
      mensajePedidoVacio();
    }
  }
}

function actualizarResumen() {
  const contenido = document.querySelector('#resumen .contenido');

  const resumen = document.createElement('div');
  resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');

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
  resumen.appendChild(heading);
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(grupo);

  contenido.appendChild(resumen);

  // Mostrar formulario de propinas
  formularioPropinas();
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
  if (cliente.pedido.length > 0) {
    actualizarResumen();
  } else {
    mensajePedidoVacio();
  }

  // El producto se eliminó y debemos reiniciar la cantidad
  const inputProducto = document.querySelector(`#producto-${id}`);
  inputProducto.value = 0;
}

function mensajePedidoVacio() {
  const contenido = document.querySelector('#resumen .contenido');
  const texto = document.createElement('p');
  texto.classList.add('text-center');
  texto.textContent = 'Añade los elementos del pedido';

  contenido.appendChild(texto);
}

function formularioPropinas() {
  const contenido = document.querySelector('#resumen .contenido');

  const formulario = document.createElement('div');
  formulario.classList.add('col-md-6', 'formulario');

  const divFormulario = document.createElement('div');
  divFormulario.classList.add('card', 'py-2', 'px-3', 'shadow');

  const heading = document.createElement('h3');
  heading.classList.add('my-4', 'text-center');
  heading.textContent = 'Propina';

  // Radio buttons
  // Radio 10%
  const radio10 = document.createElement('input');
  radio10.type = 'radio';
  radio10.name = 'propina';
  radio10.value = '10';
  radio10.classList.add('form-check-input');
  radio10.onclick = calcularPropina;

  const radio10Label = document.createElement('label');
  radio10Label.textContent = '10%';
  radio10Label.classList.add('form-check-label');

  const radio10Div = document.createElement('div');
  radio10Div.classList.add('form-check');
  radio10Div.appendChild(radio10);
  radio10Div.appendChild(radio10Label);

  // Radio 25%
  const radio25 = document.createElement('input');
  radio25.type = 'radio';
  radio25.name = 'propina';
  radio25.value = '25';
  radio25.classList.add('form-check-input');
  radio25.onclick = calcularPropina;

  const radio25Label = document.createElement('label');
  radio25Label.textContent = '25%';
  radio25Label.classList.add('form-check-label');

  const radio25Div = document.createElement('div');
  radio25Div.classList.add('form-check');
  radio25Div.appendChild(radio25);
  radio25Div.appendChild(radio25Label);

  // Radio 50%
  const radio50 = document.createElement('input');
  radio50.type = 'radio';
  radio50.name = 'propina';
  radio50.value = '50';
  radio50.classList.add('form-check-input');
  radio50.onclick = calcularPropina;

  const radio50Label = document.createElement('label');
  radio50Label.textContent = '50%';
  radio50Label.classList.add('form-check-label');

  const radio50Div = document.createElement('div');
  radio50Div.classList.add('form-check');
  radio50Div.appendChild(radio50);
  radio50Div.appendChild(radio50Label);

  divFormulario.appendChild(heading);
  divFormulario.appendChild(radio10Div);
  divFormulario.appendChild(radio25Div);
  divFormulario.appendChild(radio50Div);
  formulario.appendChild(divFormulario);
  contenido.appendChild(formulario);
}

function calcularPropina() {
  const { pedido } = cliente;

  const subtotal = pedido.reduce(
    (acum, item) => acum + item.cantidad * item.precio,
    0
  );

  const propinaSeleccionada = Number.parseInt(
    document.querySelector('[name="propina"]:checked').value
  );

  // Calcular la propina respectiva
  const propina = subtotal * (propinaSeleccionada / 100);

  const total = subtotal + propina;

  mostrarTotalHtml(subtotal, total, propina);
}

function mostrarTotalHtml(subtotal, total, propina) {
  const divTotales = document.createElement('div');
  divTotales.classList.add('total-pagar', 'my-5');

  // Subtotal
  const subtotalParrafo = document.createElement('p');
  subtotalParrafo.classList.add('fs-4', 'fw-bold', 'mt-2');
  subtotalParrafo.textContent = 'Subtotal Consumo: ';

  const subtotalSpan = document.createElement('span');
  subtotalSpan.classList.add('fw-normal');
  subtotalSpan.textContent = `$ ${subtotal}`;
  subtotalParrafo.appendChild(subtotalSpan);

  // Propina
  const propinaParrafo = document.createElement('p');
  propinaParrafo.classList.add('fs-4', 'fw-bold', 'mt-2');
  propinaParrafo.textContent = 'Propina:';

  const propinaSpan = document.createElement('span');
  propinaSpan.classList.add('fw-normal');
  propinaSpan.textContent = `$ ${propina}`;
  propinaParrafo.appendChild(propinaSpan);

  // Total
  const totalParrafo = document.createElement('p');
  totalParrafo.classList.add('fs-4', 'fw-bold', 'mt-2');
  totalParrafo.textContent = 'Total:';

  const totalSpan = document.createElement('span');
  totalSpan.classList.add('fw-normal');
  totalSpan.textContent = `$ ${total}`;
  totalParrafo.appendChild(totalSpan);

  // Eliminar el ultimo resultado
  const totalPagarDiv = document.querySelector('.total-pagar');
  if (totalPagarDiv) {
    totalPagarDiv.remove();
  }

  divTotales.appendChild(subtotalParrafo);
  divTotales.appendChild(propinaParrafo);
  divTotales.appendChild(totalParrafo);

  const formulario = document.querySelector('.formulario > div');
  formulario.appendChild(divTotales);
}
