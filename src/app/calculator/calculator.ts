import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type Operator = '+' | '−' | '×' | '÷';

type Key =
  | { kind: 'digit'; label: string }
  | { kind: 'decimal'; label: '.' }
  | { kind: 'operator'; label: Operator }
  | { kind: 'equals'; label: '=' }
  | { kind: 'clear'; label: 'C' };

const ERROR = 'Error';

@Component({
  selector: 'app-calculator',
  styleUrl: './calculator.scss',
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator {
  protected readonly display = signal('0');
  protected readonly operator = signal<Operator | null>(null);

  private stored: number | null = null;
  private waitingForOperand = false;

  // Laid out row by row on a 4-column grid; "C" spans the whole first row.
  protected readonly keys: Key[] = [
    { kind: 'clear', label: 'C' },
    ...digits('789'),
    { kind: 'operator', label: '÷' },
    ...digits('456'),
    { kind: 'operator', label: '×' },
    ...digits('123'),
    { kind: 'operator', label: '−' },
    ...digits('0'),
    { kind: 'decimal', label: '.' },
    { kind: 'equals', label: '=' },
    { kind: 'operator', label: '+' },
  ];

  protected press(key: Key): void {
    switch (key.kind) {
      case 'digit':
        return this.inputDigit(key.label);
      case 'decimal':
        return this.inputDecimal();
      case 'operator':
        return this.setOperator(key.label);
      case 'equals':
        return this.equals();
      case 'clear':
        return this.clear();
    }
  }

  protected testId(key: Key): string {
    const names: Record<string, string> = {
      '+': 'add',
      '−': 'subtract',
      '×': 'multiply',
      '÷': 'divide',
      '.': 'decimal',
      '=': 'equals',
      C: 'clear',
    };
    return `key-${names[key.label] ?? key.label}`;
  }

  private inputDigit(digit: string): void {
    if (this.waitingForOperand || this.display() === ERROR) {
      this.display.set(digit);
      this.waitingForOperand = false;
    } else {
      this.display.update((value) => (value === '0' ? digit : value + digit));
    }
  }

  private inputDecimal(): void {
    if (this.waitingForOperand || this.display() === ERROR) {
      this.display.set('0.');
      this.waitingForOperand = false;
    } else if (!this.display().includes('.')) {
      this.display.update((value) => value + '.');
    }
  }

  private setOperator(next: Operator): void {
    if (this.display() === ERROR) {
      return;
    }
    const value = Number(this.display());
    const pending = this.operator();
    if (this.stored !== null && pending && !this.waitingForOperand) {
      if (!this.showResult(compute(this.stored, value, pending))) {
        return;
      }
    } else {
      this.stored = value;
    }
    this.operator.set(next);
    this.waitingForOperand = true;
  }

  private equals(): void {
    const pending = this.operator();
    if (this.stored === null || !pending) {
      return;
    }
    if (this.showResult(compute(this.stored, Number(this.display()), pending))) {
      this.stored = null;
      this.operator.set(null);
      this.waitingForOperand = true;
    }
  }

  private clear(): void {
    this.display.set('0');
    this.operator.set(null);
    this.stored = null;
    this.waitingForOperand = false;
  }

  /** Shows the result, or an error (and resets) when it is not a finite number. */
  private showResult(result: number): boolean {
    if (!Number.isFinite(result)) {
      this.clear();
      this.display.set(ERROR);
      return false;
    }
    // toPrecision hides floating point noise such as 0.1 + 0.2 = 0.30000000000000004
    const rounded = Number(result.toPrecision(12));
    this.display.set(String(rounded));
    this.stored = rounded;
    return true;
  }
}

function digits(labels: string): Key[] {
  return [...labels].map((label) => ({ kind: 'digit', label }));
}

function compute(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return a / b;
  }
}
