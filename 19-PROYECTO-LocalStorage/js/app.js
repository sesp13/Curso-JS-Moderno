const tweetsKey = 'tweets';
let tweets = localStorage.getItem(tweetsKey)
  ? JSON.parse(localStorage.getItem(tweetsKey))
  : [];

const tweetArea = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', () => {
  formulario.addEventListener('submit', agregarTweet);
  tweetArea.addEventListener('blur', validarTweet);

  cargarTweets();
});

function validarTweet(e) {
  if (e.target.value === '') {
    mostrarError('No puede ir vacio');
  }
}

function agregarTweet(e) {
  e.preventDefault();
  const { value } = tweetArea;

  if (value === '') {
    mostrarError('No puede ir vacio');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet: value,
  };

  tweets = [...tweets, tweetObj];
  cargarTweets();
  sincronizarTweets();
  formulario.reset();
}

function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function sincronizarTweets() {
  localStorage.setItem(tweetsKey, JSON.stringify(tweets));

}

function cargarTweets() {
  limpiarTweets();
  tweets.forEach(({ tweet, id }) => {
    const btnEliminar = document.createElement('a');
    btnEliminar.classList.add('borrar-tweet');
    btnEliminar.textContent = 'X';

    btnEliminar.onclick = () => {
      borrarTweet(id);
    };

    const tweetHTML = document.createElement('li');
    tweetHTML.innerHTML = tweet;
    tweetHTML.appendChild(btnEliminar);

    listaTweets.appendChild(tweetHTML);
  });
}

function limpiarTweets() {
  while (listaTweets.firstChild) {
    listaTweets.firstChild.remove();
  }
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  cargarTweets();
  sincronizarTweets();
}
