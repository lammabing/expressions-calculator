import { Token } from './tokenizer';
import { builtInFunctions, functionsStore } from './functions';

export function evaluateFunction(funcName: string, args: number[]): number {
  // Get custom functions from store
  const { userFunctions } = functionsStore.getState();
  
  // Try custom function first
  if (userFunctions[funcName]) {
    try {
      const funcCode = userFunctions[funcName];
      // Create and execute the function directly from the arrow function
      const func = new Function(`return ${funcCode}`)();
      return func(...args);
    } catch (err) {
      throw new Error(`Error in custom function ${funcName}: ${err.message}`);
    }
  }

  // Fall back to built-in function
  const func = builtInFunctions[funcName.toLowerCase()];
  if (!func) throw new Error(`Unknown function: ${funcName}`);
  return func(...args);
}