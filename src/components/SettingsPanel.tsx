import React from 'react';
import { Settings, X } from 'lucide-react';
import { FunctionEditor } from './settings/FunctionEditor';
import { ConstantEditor } from './settings/ConstantEditor';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Calculator Settings</h2>
          </div>
          <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <div className="space-y-6">
            <FunctionEditor />
            <ConstantEditor />
          </div>
        </div>
      </div>
    </div>
  );
}