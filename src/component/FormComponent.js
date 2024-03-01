// FormComponent.js
import React, { useState } from 'react';

function FormComponent({ initialValues, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialValues);
  };

  const handleCancel = () => {
    onCancel();
    setFormData(initialValues);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      {/* Your form fields */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-gray-600 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      {/* ... other form fields */}

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 p-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
