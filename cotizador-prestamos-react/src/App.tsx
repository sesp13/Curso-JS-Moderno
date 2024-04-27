import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { calcularTotalPagar, formatearDinero } from './helpers';

function App() {
  const MIN = 0;
  const MAX = 20000;
  const STEP = 500;

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(calcularTotalPagar(cantidad, meses));
  const [pagoMensual, setPagoMensual] = useState(0);

  useEffect(() => {
    const nuevoTotal = calcularTotalPagar(cantidad, meses);
    setTotal(nuevoTotal);
  }, [cantidad, meses, total]);

  useEffect(() => {
    setPagoMensual(total / meses);
  }, [total, meses]);

  const handleDineroChange = (valor: string) => {
    setCantidad(Number(valor));
  };

  function handleClickDecremento() {
    const valor = cantidad - STEP > MIN ? cantidad - STEP : MIN;
    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor = cantidad + STEP < MAX ? cantidad + STEP : MAX;
    setCantidad(valor);
  }

  function handleSelectMeses(value: string) {
    setMeses(Number(value));
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />
      <div className="flex justify-between my-6">
        <Button operador="-" handleClick={handleClickDecremento} />
        <Button operador="+" handleClick={handleClickIncremento} />
      </div>
      <input
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        value={cantidad}
        onChange={(e) => handleDineroChange(e.target.value)}
        min={MIN}
        max={MAX}
        step={STEP}
      />
      <p className="text-indigo-500 text-center text-4xl font-extrabold my-10">
        {formatearDinero(cantidad)}
      </p>
      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo</span> a pagar
      </h2>
      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 
        rounded-lg text-center font-bold text-gray-500
      "
        value={meses}
        onChange={(e) => handleSelectMeses(e.target.value)}
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5">
        <h2 className="text-center font-extrabold text-gray-500 text-2xl">
          Resumen <span className="text-indigo-600">de pagos</span>
        </h2>
        <p className="text-xl text-gray-500 text-center font-bold">
          {meses} Meses
        </p>
        <p className="text-xl text-gray-500 text-center font-bold">
          {formatearDinero(total)} Total a pagar
        </p>
        <p className="text-xl text-gray-500 text-center font-bold">
          {formatearDinero(pagoMensual)} Mensuales
        </p>
      </div>
    </div>
  );
}

export default App;
