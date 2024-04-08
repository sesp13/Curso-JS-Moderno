const nombreCache = 'apv-v6';
const archivos = [
  '/',
  'index.html',
  '/error.html',
  '/css/bootstrap.css',
  '/css/styles.css',
  '/js/app.js',
  '/js/apv.js',
];

// Cuando se instala el service worker, esto solo pasa una vez
self.addEventListener('install', (e) => {
  console.log('Instalado el service worker');

  // Proceso de cacheado de archivos
  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      console.log('Cacheado');
      cache.addAll(archivos);
    })
  );
});

// Activar el service worker
self.addEventListener('activate', (e) => {
  console.log('Service worker activado');
  console.log(e);

  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        // Borrar caches viejas
        keys
          .filter((key) => key !== nombreCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Evento fetch para descargar archivos estáticos
self.addEventListener('fetch', (e) => {
  console.log('Instalador');
  console.log(e);

  // Mostrar caché  soporte offline
  e.respondWith(
    caches
      .match(e.request)
      .then((respuestaCache) => respuestaCache)
      .catch((e) => {
        // Mostrar página de error si la página no está en caché
        caches.match('/error.html');
      })
  );
});
