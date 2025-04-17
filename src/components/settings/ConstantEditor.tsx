import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { constantsStore } from '../../lib/constants';

export function ConstantEditor() {
  const { userConstants, addConstant, removeConstant } = constantsStore();
  const [newConstant, setNewConstant] = useState({ name: '', value: '' });

  const handleAdd = () => {
    if (newConstant.name && newConstant.value) {
      const numValue = parseFloat(newConstant.value);
      if (!isNaN(numValue)) {
        addConstant(newConstant.name, numValue);
        setNewConstant({ name: '', value: '' });
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Constants</h3>
      
      <div className="space-y-4">
        {Object.entries(userConstants).map(([name, value]) => (
          <div key={name} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-mono text-sm">{name}</div>
              <div className="text-sm text-gray-600">{value}</div>
            </div>
            <button
              onClick={() => removeConstant(name)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Constant name"
            value={newConstant.name}
            onChange={(e) => setNewConstant(prev => ({ ...prev, name: e.target.value }))}
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Value"
            value={newConstant.value}
            onChange={(e) => setNewConstant(prev => ({ ...prev, value: e.target.value }))}
            className="w-32 p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Constant
        </button>
      </div>
    </div>
  );
}