import { useState } from 'react';
import { Header } from './components/Header';

function App() {
  const [cantidad, setCantidad] = useState(10000);
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const handleDineroChange = (valor: string) => {
    setCantidad(Number(valor));
  };

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />
      <input
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        value={cantidad}
        onChange={(e) => handleDineroChange(e.target.value)}
        min={MIN}
        max={MAX}
        step={STEP}
      />
      <p className='text-indigo-500 text-center text-4xl font-extrabold my-10'>{cantidad}</p>
    </div>
  );
}

export default App;
