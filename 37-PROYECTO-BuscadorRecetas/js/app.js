function iniciarApp() {
  const selectCategorias = document.querySelector('#categorias');
  const resultado = document.querySelector('#resultado');
  const favoritosDiv = document.querySelector('.favoritos');
  const modal = new bootstrap.Modal('#modal', {});

  if (selectCategorias) {
    selectCategorias.addEventListener('change', seleccionarCategoria);
    obtenerCategorias();
  }
  if (favoritosDiv) {
    obtenerFavoritos();
  }

  function obtenerCategorias() {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    fetch(url)
      .then((res) => res.json())
      .then((resultado) => mostrarCategorias(resultado.categories));
  }

  function mostrarCategorias(categorias = []) {
    categorias.forEach((categoria) => {
      const { strCategory } = categoria;
      const option = document.createElement('option');
      // Se usa el nombre para el filtrado en el otro llamado de los endpoints
      option.value = strCategory;
      option.text = strCategory;
      selectCategorias.appendChild(option);
    });
  }

  function seleccionarCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

    fetch(url)
      .then((res) => res.json())
      .then((resultado) => mostrarRecetas(resultado.meals));
  }

  function mostrarRecetas(recetas = []) {
    limpiarHtml(resultado);

    const heading = document.createElement('h2');
    heading.classList.add('text-center', 'text-black', 'my-5');
    heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
    resultado.appendChild(heading);

    recetas.forEach((receta) => {
      const { strMealThumb, strMeal, idMeal } = receta;
      const recetaContenedor = document.createElement('div');
      recetaContenedor.classList.add('col-md-4');

      const recetaCard = document.createElement('div');
      recetaCard.classList.add('card', 'mb-4');

      const recetaImagen = document.createElement('img');
      recetaImagen.classList.add('card-img-top');
      recetaImagen.src = strMealThumb ?? receta.img;
      recetaImagen.alt = strMeal ?? receta.titulo;

      const recetaCardBody = document.createElement('div');
      recetaCardBody.classList.add('card-body');

      const recetaHeading = document.createElement('h3');
      recetaHeading.classList.add('card-title', 'mb-3');
      recetaHeading.textContent = strMeal ?? receta.titulo;

      const recetaButton = document.createElement('button');
      recetaButton.classList.add('btn', 'btn-danger', 'w-100');
      recetaButton.textContent = 'Ver Receta';
      recetaButton.dataset.bsTarget = '#modal';
      recetaButton.dataset.bsToggle = 'modal';
      recetaButton.onclick = () => seleccionarReceta(idMeal ?? receta.id);

      // Inyectar en el código html
      recetaCardBody.appendChild(recetaHeading);
      recetaCardBody.appendChild(recetaButton);

      recetaCard.appendChild(recetaImagen);
      recetaCard.appendChild(recetaCardBody);

      recetaContenedor.appendChild(recetaCard);

      // Agregar a la página
      resultado.appendChild(recetaContenedor);
    });
  }

  function limpiarHtml(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }

  function seleccionarReceta(id) {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((resultado) => mostrarRecetaModal(resultado.meals[0]));
  }

  function mostrarRecetaModal(receta) {
    const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

    // Añadir contenido al modal
    const modalTitle = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body');

    modalTitle.textContent = strMeal;
    modalBody.innerHTML = `
      <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
      <h3 class="my-3">Instructions</h3>
      <p>${strInstructions}</p>
      <h3 class="my-3">Ingredientes y cantidades</h3>
    `;

    // Mostrar cantidades e ingredientes
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group');
    for (let i = 1; i <= 20; i++) {
      if (receta[`strIngredient${i}`]) {
        const ingrediente = receta[`strIngredient${i}`];
        const cantidad = receta[`strMeasure${i}`];

        const ingredienteLi = document.createElement('li');
        ingredienteLi.classList.add('list-group-item');
        ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

        listGroup.appendChild(ingredienteLi);
      }
    }
    modalBody.appendChild(listGroup);

    const modalFooter = document.querySelector('.modal-footer');
    limpiarHtml(modalFooter);

    const btnFavorito = document.createElement('button');
    btnFavorito.classList.add('btn', 'btn-danger', 'col');
    btnFavorito.textContent = existeStorage(idMeal)
      ? 'Eliminar favorito'
      : 'Guardar Favorito';

    btnFavorito.onclick = () => {
      if (!existeStorage(idMeal)) {
        agregarFavorito({
          id: idMeal,
          titulo: strMeal,
          img: strMealThumb,
        });
        btnFavorito.textContent = 'Eliminar Favorito';
        mostrarToast('Favorito agregado');
      } else {
        eliminarFavorito(idMeal);
        btnFavorito.textContent = 'Guardar Favorito';
        mostrarToast('Favorito eliminado');
      }
    };

    const btnCerrar = document.createElement('button');
    btnCerrar.classList.add('btn', 'btn-secondary', 'col');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.onclick = () => {
      modal.hide();
    };

    modalFooter.appendChild(btnFavorito);
    modalFooter.appendChild(btnCerrar);

    modal.show();
  }

  function agregarFavorito(receta) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
  }

  function existeStorage(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    return favoritos.some((favorito) => favorito.id === id);
  }

  function eliminarFavorito(id) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const nuevosFavoritos = favoritos.filter((favorito) => favorito.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  }

  function mostrarToast(mensaje) {
    const toastDiv = document.querySelector('#toast');
    const toastBody = document.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastDiv);
    toastBody.textContent = mensaje;

    toast.show();
  }

  function obtenerFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    if (favoritos.length) {
      mostrarRecetas(favoritos);
    } else {
      limpiarHtml(resultado);
      const noFavoritos = document.createElement('p');
      noFavoritos.textContent = 'No hay favoritos aun';
      noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
      resultado.appendChild(noFavoritos);
    }
  }
}

document.addEventListener('DOMContentLoaded', iniciarApp);
