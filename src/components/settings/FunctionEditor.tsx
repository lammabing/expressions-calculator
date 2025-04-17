import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import { functionsStore } from '../../lib/functions';

export function FunctionEditor() {
  const { userFunctions, addFunction, removeFunction } = functionsStore();
  const [newFunction, setNewFunction] = useState({ name: '', code: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (newFunction.name && newFunction.code) {
      addFunction(newFunction.name, newFunction.code);
      setNewFunction({ name: '', code: '' });
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(userFunctions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator-functions.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const functions = JSON.parse(e.target?.result as string);
        Object.entries(functions).forEach(([name, code]) => {
          addFunction(name, code as string);
        });
      } catch (error) {
        console.error('Error importing functions:', error);
        alert('Error importing functions. Please check the file format.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Custom Functions</h3>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            title="Export functions"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <label className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            Import
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(userFunctions).map(([name, code]) => (
          <div key={name} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-mono text-sm">{name}</div>
              <div className="text-sm text-gray-600 mt-1">{code}</div>
            </div>
            <button
              onClick={() => removeFunction(name)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <input
          type="text"
          placeholder="Function name"
          value={newFunction.name}
          onChange={(e) => setNewFunction(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <textarea
          placeholder="Function code (e.g., (x, y) => x + y)"
          value={newFunction.code}
          onChange={(e) => setNewFunction(prev => ({ ...prev, code: e.target.value }))}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none h-20"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Function
        </button>
      </div>
    </div>
  );
}