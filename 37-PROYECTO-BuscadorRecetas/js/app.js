function iniciarApp() {
  const selectCategorias = document.querySelector('#categorias');
  const resultado = document.querySelector('#resultado');

  selectCategorias.addEventListener('change', seleccionarCategoria);

  obtenerCategorias();

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
      const { strMealThumb, strMeal } = receta;
      const recetaContenedor = document.createElement('div');
      recetaContenedor.classList.add('col-md-4');

      const recetaCard = document.createElement('div');
      recetaCard.classList.add('card', 'mb-4');

      const recetaImagen = document.createElement('img');
      recetaImagen.classList.add('card-img-top');
      recetaImagen.src = strMealThumb;
      recetaImagen.alt = strMeal;

      const recetaCardBody = document.createElement('div');
      recetaCardBody.classList.add('card-body');

      const recetaHeading = document.createElement('h3');
      recetaHeading.classList.add('card-title', 'mb-3');
      recetaHeading.textContent = strMeal;

      const recetaButton = document.createElement('button');
      recetaButton.classList.add('btn', 'btn-danger', 'w-100');
      recetaButton.textContent = 'Ver Receta';

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
}

document.addEventListener('DOMContentLoaded', iniciarApp);
