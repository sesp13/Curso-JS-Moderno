import { datosCita, nuevaCita } from '../funciones.js'
import {
  fechaInput,
  formulario,
  horaInput,
  mascotaInput,
  propietarioInput,
  sintomasInput,
  telefonoInput,
} from '../selectores.js';


export class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    // Formulario para nuevas citas
    formulario.addEventListener('submit', nuevaCita);
  }
}
