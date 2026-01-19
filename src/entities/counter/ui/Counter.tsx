import { useEffect, useState } from 'react';
import { sum, subtraction } from '../util/calculator';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count', count);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-indigo-50 via-white to-purple-50 p-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Counter</h2>

        <div className="mb-6 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 p-8 shadow-lg">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium tracking-wider text-indigo-100 uppercase">
              Current Count
            </p>
            <p
              data-testid="value"
              className="text-6xl font-bold text-white drop-shadow-lg transition-all duration-300"
            >
              {count}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            data-testid="decrement"
            onClick={() => setCount(subtraction(count, 1))}
            className="flex-1 transform rounded-xl bg-linear-to-r from-red-500 to-pink-500 px-6 py-4 text-2xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-red-600 hover:to-pink-600 hover:shadow-xl active:scale-95"
          >
            -
          </button>
          <button
            data-testid="increment"
            onClick={() => setCount(sum(count, 1))}
            className="flex-1 transform rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-6 py-4 text-2xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
