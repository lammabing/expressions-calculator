export type EvaluationResult = {
  result: number | null;
  error: string | null;
};

export type FunctionArgs = {
  args: number[];
  remaining: Token[];
};

export type ArrayLiteral = {
  numbers: number[];
  endIndex: number;
};