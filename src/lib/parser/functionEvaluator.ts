import { Token } from '../tokenizer';
import { FunctionArgs } from './types';

export class FunctionEvaluator {
  extractFunctionArgs(tokens: Token[], evaluateTokens: (tokens: Token[]) => number): FunctionArgs {
    if (tokens.length === 0 || tokens[0].value !== '(') {
      throw new Error('Invalid function call syntax');
    }

    const args: number[] = [];
    let currentArg: Token[] = [];
    let bracketCount = 1;
    let i = 1;

    while (i < tokens.length && bracketCount > 0) {
      const token = tokens[i];

      if (token.value === '(') {
        bracketCount++;
        currentArg.push(token);
      } else if (token.value === ')') {
        bracketCount--;
        if (bracketCount === 0) {
          if (currentArg.length > 0) {
            args.push(evaluateTokens(currentArg));
          }
          break;
        }
        currentArg.push(token);
      } else if (token.value === ',' && bracketCount === 1) {
        if (currentArg.length > 0) {
          args.push(evaluateTokens(currentArg));
          currentArg = [];
        }
      } else {
        currentArg.push(token);
      }
      i++;
    }

    return {
      args,
      remaining: tokens.slice(i + 1)
    };
  }
}