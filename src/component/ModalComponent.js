// ModalComponent.js
import React from 'react';

function ModalComponent({ title, content, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg shadow p-6">
        {/* Modal content */}
        <div className="flex justify-end">
          <button onClick={onClose} className="hover:bg-gray-600 rounded text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* ... other modal content */}
      </div>
    </div>
  );
}

export default ModalComponent;
