import { constantsStore } from '../lib/constants';
import { functionsStore } from '../lib/functions';

// Re-export the stores
export const useCalculatorStore = {
  getState: () => ({
    constants: constantsStore.getState().userConstants,
    functions: functionsStore.getState().userFunctions,
    addConstant: constantsStore.getState().addConstant,
    removeConstant: constantsStore.getState().removeConstant,
    addFunction: functionsStore.getState().addFunction,
    removeFunction: functionsStore.getState().removeFunction
  }),
  subscribe: (callback: () => void) => {
    const unsubConstants = constantsStore.subscribe(callback);
    const unsubFunctions = functionsStore.subscribe(callback);
    return () => {
      unsubConstants();
      unsubFunctions();
    };
  }
};