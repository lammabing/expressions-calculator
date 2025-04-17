import { Token } from '../tokenizer';
import { constantsStore } from '../constants';
import { CalculationHistory } from '../history';
import { evaluateFunction } from '../evaluator';
import { FunctionEvaluator } from './functionEvaluator';

export class ExpressionEvaluator {
  private functionEvaluator: FunctionEvaluator;

  constructor(
    private variables: Map<string, number>,
    private history: CalculationHistory
  ) {
    this.functionEvaluator = new FunctionEvaluator();
  }

  evaluateExpression(tokens: Token[]): number {
    let expression = '';
    let i = 0;
    
    while (i < tokens.length) {
      const token = tokens[i];

      if (token.type === 'function') {
        // Handle function calls within expressions
        const { args, remaining } = this.functionEvaluator.extractFunctionArgs(
          tokens.slice(i + 1), 
          this.evaluateExpression.bind(this)
        );
        const functionResult = evaluateFunction(token.value, args);
        expression += functionResult;
        
        // Update i to skip the processed tokens
        i = tokens.length - remaining.length;
      } else if (token.type === 'number' || token.type === 'operator') {
        expression += token.value;
        i++;
      } else if (token.type === 'variable' && this.variables.has(token.value)) {
        expression += this.variables.get(token.value);
        i++;
      } else if (token.type === 'constant') {
        const { builtInConstants, userConstants } = constantsStore.getState();
        const value = builtInConstants[token.value] ?? userConstants[token.value];
        if (value === undefined) {
          throw new Error(`Unknown constant: ${token.value}`);
        }
        expression += value;
        i++;
      } else if (token.type === 'previous') {
        const lastResult = this.history.getLastResult();
        if (lastResult === null) {
          throw new Error('No previous result available');
        }
        expression += lastResult;
        i++;
      } else if (token.type !== 'comma' && token.type !== 'bracket') {
        throw new Error(`Invalid token: ${token.value}`);
      } else {
        i++;
      }
    }

    try {
      return Function(`return ${expression}`)();
    } catch (err) {
      throw new Error('Invalid expression');
    }
  }
}