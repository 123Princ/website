import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const QuantityControl = ({isOpen,setIsOpen, initialValue = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange && onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onQuantityChange && onQuantityChange(quantity + 1);
  };

  return (
    <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={()=>setIsOpen(false)}>
    
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="group w-8 h-8 border border-gray-300 rounded-md inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Options</span>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleDecrease}
            >
              Decrease
            </button>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleIncrease}
            >
              Increase
            </button>
          </div>
        </div>

      </Transition>
    </div>
    </Dialog >

  );
};

export default QuantityControl;
