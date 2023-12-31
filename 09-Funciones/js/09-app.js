const reproductor = {
  reproducir: function (id) {
    console.log(`Reproduciendo canción con id ${id}`);
  },
  pausar: function () {
    console.log('Pausando');
  },
  crearPlaylist: function (nombre) {
    console.log(`Creando la playlist de ${nombre}`);
  },
  reproducirPlaylist: function (nombre) {
    console.log(`Reproduciendo playlist con nombre ${nombre}`);
  },
};

reproductor.reproducir(30);
reproductor.reproducir(20);
reproductor.pausar();

reproductor.borrar = function (id) {
  console.log(`Borrando canción con id ${id}`);
};

reproductor.borrar(30);
reproductor.crearPlaylist('Heavy Metal');
reproductor.crearPlaylist('Rock 90');
reproductor.reproducirPlaylist('Rock');
