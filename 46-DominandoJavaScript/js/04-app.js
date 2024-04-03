// Implicit binding

const usuario = {
  nombre: 'Juan',
  edad: 20,
  informacion() {
    // this me dice de forma implicita que  este objeto
    console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`);
  },
  mascota: {
    nombre: 'Hook',
    edad: 2,
    informacion() {
      console.log(`Mi nombre es ${this.nombre} y mi edad es ${this.edad}`);
    },
  }
};

usuario.informacion();
usuario.mascota.informacion();