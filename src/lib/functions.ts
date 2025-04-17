import { create } from 'zustand';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage';

// Built-in functions
export const builtInFunctions: Record<string, (...args: number[]) => number> = {
  sum: (...nums) => nums.reduce((a, b) => a + b, 0),
  avg: (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length,
  min: (...nums) => Math.min(...nums),
  max: (...nums) => Math.max(...nums),
  sin: (x) => Math.sin(x),
  cos: (x) => Math.cos(x),
  tan: (x) => Math.tan(x),
  sqrt: (x) => Math.sqrt(x),
  pow: (x, y) => Math.pow(x, y),
  log: (x) => Math.log(x),
  log10: (x) => Math.log10(x),
  abs: (x) => Math.abs(x),
  round: (x) => Math.round(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x)
};

interface FunctionsState {
  userFunctions: Record<string, string>;
  addFunction: (name: string, code: string) => void;
  removeFunction: (name: string) => void;
}

export const functionsStore = create<FunctionsState>((set) => ({
  userFunctions: loadFromStorage(STORAGE_KEYS.FUNCTIONS, {}),
  addFunction: (name, code) => set((state) => {
    const newFunctions = { 
      ...state.userFunctions, 
      [name]: code 
    };
    saveToStorage(STORAGE_KEYS.FUNCTIONS, newFunctions);
    return { userFunctions: newFunctions };
  }),
  removeFunction: (name) => set((state) => {
    const { [name]: _, ...rest } = state.userFunctions;
    saveToStorage(STORAGE_KEYS.FUNCTIONS, rest);
    return { userFunctions: rest };
  })
}));