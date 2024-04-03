self.onload = () => {
  console.log('Ventana lista');
};

const producto = {
  nombre: 'Monitor',
  precio: 30,
  dispobible: true,
  mostrarInfo() {
    return `El producto ${this.nombre} tiene el precio de ${this.precio}`;
  },
};


console.log(producto.mostrarInfo());