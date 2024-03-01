// TableComponent.js
import React from 'react';

function TableComponent({ data, columns, onEdit, onDelete }) {
  return (
    <table className="w-full table-auto divide-y divide-gray-500">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-base text-medium">#</th>
          {columns.map((column) => (
            <th key={column.key} className="px-6 py-3 text-left text-xs font-base text-medium">
              {column.label}
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-base text-medium">Edit & Remove</th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-500">
        {data.map((item, index) => (
          <tr key={item.id} className={`bg-gray-800 hover:bg-gray-700`}>
            <td className="px-6 py-3 whitespace-nowrap text-sm">{index + 1}</td>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-3 whitespace-nowrap text-sm">
                {item[column.key]}
              </td>
            ))}
            <td className="px-6 py-3 whitespace-nowrap text-sm">
              <button
                className="p-1 rounded hover:bg-gray-500 text-blue-600"
                onClick={() => onEdit(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
              <span className="px-3">|</span>
              <button
                className="p-1 rounded hover:bg-red-400"
                onClick={() => onDelete(item.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
