import React, { useState, useRef } from 'react';
import { Parser } from '../lib/parser';
import { Calculator as CalculatorIcon, Settings } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';

// Create a single parser instance
const parser = new Parser();

export function Calculator() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ expression: string; result: string }>>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const evaluate = () => {
    if (!input.trim()) return;

    const { result, error } = parser.parse(input);
    const newEntry = {
      expression: input,
      result: error ? `Error: ${error}` : `= ${result}`
    };

    setHistory(prev => [...prev, newEntry]);
    setInput('');

    setTimeout(() => {
      if (historyRef.current) {
        historyRef.current.scrollTop = historyRef.current.scrollHeight;
      }
    }, 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      evaluate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalculatorIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold">Advanced Calculator</h1>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div 
          ref={historyRef}
          className="h-64 overflow-y-auto p-4 bg-gray-50 font-mono text-sm"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="text-gray-600">{entry.expression}</div>
              <div className="text-indigo-600 pl-4">{entry.result}</div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter expression... (Use # for last result)"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-semibold mb-1">Examples:</p>
            <ul className="space-y-1">
              <li>• Basic math: 2 + 2 * 4</li>
              <li>• Functions: sum([1,2,3,4])</li>
              <li>• Variables: x = 5</li>
              <li>• Last result: # + 10</li>
            </ul>
          </div>
        </div>
      </div>

      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}