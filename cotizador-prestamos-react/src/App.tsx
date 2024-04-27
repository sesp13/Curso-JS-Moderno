import { useState } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { formatearDinero } from './helpers';

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const MIN = 0;
  const MAX = 20000;
  const STEP = 500;

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
    </div>
  );
}

export default App;
