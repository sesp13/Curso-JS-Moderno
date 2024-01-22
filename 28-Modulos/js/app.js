import nuevaFuncion, {
  nombreCliente,
  ahorro,
  mostrarInformacion,
  tieneSaldo,
  Cliente,
} from './cliente.js';
import { Empresa } from './empresa.js';

console.log(nombreCliente);
console.log(ahorro);
console.log(mostrarInformacion(nombreCliente, ahorro));
tieneSaldo(ahorro);

const cliente = new Cliente(nombreCliente, ahorro);
console.log(cliente);

const empresa = new Empresa(nombreCliente, ahorro, 'Facebook');
console.log(empresa.mostrarInformacion());

nuevaFuncion();