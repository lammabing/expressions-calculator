// Manages calculation history and last result
export class CalculationHistory {
  private lastResult: number | null = null;

  setLastResult(result: number) {
    this.lastResult = result;
  }

  getLastResult(): number | null {
    return this.lastResult;
  }
}