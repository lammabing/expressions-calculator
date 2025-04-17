import { Token, tokenize } from './tokenizer';
import { evaluateFunction } from './evaluator';
import { CalculationHistory } from './history';
import { EvaluationResult } from './parser/types';
import { FunctionEvaluator } from './parser/functionEvaluator';
import { ExpressionEvaluator } from './parser/expressionEvaluator';

export class Parser {
  private variables: Map<string, number> = new Map();
  private history: CalculationHistory;
  private functionEvaluator: FunctionEvaluator;
  private expressionEvaluator: ExpressionEvaluator;

  constructor() {
    this.history = new CalculationHistory();
    this.expressionEvaluator = new ExpressionEvaluator(this.variables, this.history);
    this.functionEvaluator = new FunctionEvaluator(this.evaluateTokens.bind(this));
  }

  parse(expression: string): EvaluationResult {
    try {
      expression = expression.trim();
      
      if (expression.includes('=')) {
        return this.handleAssignment(expression);
      }

      const tokens = tokenize(expression);
      const result = this.evaluateTokens(tokens);
      this.history.setLastResult(result);
      return { result, error: null };
    } catch (err) {
      return { result: null, error: err.message };
    }
  }

  private evaluateTokens(tokens: Token[]): number {
    if (tokens.length === 0) {
      throw new Error('Empty expression');
    }

    // Let the ExpressionEvaluator handle all expressions, including function calls
    return this.expressionEvaluator.evaluateExpression(tokens);
  }

  private handleAssignment(expression: string): EvaluationResult {
    const [varName, valueExp] = expression.split('=').map(s => s.trim());
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(varName)) {
      return { result: null, error: 'Invalid variable name' };
    }

    try {
      const tokens = tokenize(valueExp);
      const result = this.evaluateTokens(tokens);
      this.variables.set(varName, result);
      this.history.setLastResult(result);
      return { result, error: null };
    } catch (err) {
      return { result: null, error: err.message };
    }
  }
}