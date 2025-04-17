import { constantsStore } from './constants';
import { builtInFunctions, functionsStore } from './functions';

export type Token = {
  type: 'number' | 'operator' | 'function' | 'variable' | 'constant' | 'bracket' | 'comma' | 'previous';
  value: string;
};

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let current = '';
  
  const isOperator = (char: string) => '+-*/^()'.includes(char);
  const isDigit = (char: string) => /\d/.test(char);
  const isLetter = (char: string) => /[a-zA-Z]/.test(char);
  
  const { builtInConstants, userConstants } = constantsStore.getState();
  const { userFunctions } = functionsStore.getState();
  
  const constants = new Set([
    ...Object.keys(builtInConstants),
    ...Object.keys(userConstants)
  ]);

  const functions = new Set([
    ...Object.keys(builtInFunctions),
    ...Object.keys(userFunctions)
  ]);
  
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    
    if (char === '#') {
      if (current) addToken();
      tokens.push({ type: 'previous', value: '#' });
      continue;
    }

    if (char === ' ') {
      if (current) addToken();
      continue;
    }
    
    if (char === ',') {
      if (current) addToken();
      tokens.push({ type: 'comma', value: ',' });
      continue;
    }
    
    if (isOperator(char)) {
      if (current) addToken();
      tokens.push({ type: 'operator', value: char });
      continue;
    }
    
    if (isDigit(char) || char === '.') {
      if (current && !isDigit(current[0]) && current !== '.') {
        addToken();
      }
      current += char;
      continue;
    }
    
    if (isLetter(char)) {
      if (current && !isLetter(current[0])) {
        addToken();
      }
      current += char;
    }
  }
  
  if (current) {
    addToken();
  }
  
  return tokens;
  
  function addToken() {
    if (!current) return;
    
    if (isDigit(current[0]) || current[0] === '.') {
      tokens.push({ type: 'number', value: current });
    } else if (constants.has(current.toLowerCase())) {
      tokens.push({ type: 'constant', value: current.toLowerCase() });
    } else if (functions.has(current.toLowerCase())) {
      tokens.push({ type: 'function', value: current.toLowerCase() });
    } else {
      tokens.push({ type: 'variable', value: current });
    }
    current = '';
  }
}