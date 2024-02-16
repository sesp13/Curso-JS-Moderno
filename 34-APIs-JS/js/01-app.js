const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
  Notification.requestPermission().then((resultado) => {
    console.log(`El resultado es ${resultado}`);
  });
});

const verNotification = document.querySelector('#verNotificacion');
verNotification.addEventListener('click', () => {
  if (Notification.permission === 'granted') {
    const notificacion = new Notification('Esta es la notificación', {
      icon: 'img/ccj.png',
      body: 'Código con Juan',
    });

    notificacion.onclick = () => {
      window.open('https://adidas.co');
    };
  }
});
