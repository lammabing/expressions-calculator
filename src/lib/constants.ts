import { create } from 'zustand';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage';

interface ConstantsState {
  userConstants: Record<string, number>;
  builtInConstants: Record<string, number>;
  addConstant: (name: string, value: number) => void;
  removeConstant: (name: string) => void;
}

export const constantsStore = create<ConstantsState>((set) => ({
  userConstants: loadFromStorage(STORAGE_KEYS.CONSTANTS, {}),
  builtInConstants: {
    pi: Math.PI,
    e: Math.E
  },
  addConstant: (name, value) => set((state) => {
    const newConstants = { 
      ...state.userConstants, 
      [name]: value 
    };
    saveToStorage(STORAGE_KEYS.CONSTANTS, newConstants);
    return { userConstants: newConstants };
  }),
  removeConstant: (name) => set((state) => {
    const { [name]: _, ...rest } = state.userConstants;
    saveToStorage(STORAGE_KEYS.CONSTANTS, rest);
    return { userConstants: rest };
  })
}));