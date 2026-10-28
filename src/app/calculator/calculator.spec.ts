import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';

describe('Calculator', () => {
  let fixture: ComponentFixture<Calculator>;
  let element: HTMLElement;

  const keyIds: Record<string, string> = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '.': 'decimal',
    '=': 'equals',
    C: 'clear',
  };
  /** Presses keys in order, e.g. `type('12+3=')`. */
  const type = async (keys: string) => {
    for (const key of keys) {
      const id = `key-${keyIds[key] ?? key}`;
      element.querySelector<HTMLButtonElement>(`[data-testid="${id}"]`)!.click();
    }
    await fixture.whenStable();
  };
  const display = () => element.querySelector('[data-testid="display"]')!.textContent?.trim();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator],
    }).compileComponents();

    fixture = TestBed.createComponent(Calculator);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('starts at 0', () => {
    expect(display()).toBe('0');
  });

  it('enters multi-digit numbers without a leading zero', async () => {
    await type('0123');
    expect(display()).toBe('123');
  });

  it('adds, subtracts, multiplies and divides', async () => {
    await type('12+7=');
    expect(display()).toBe('19');

    await type('C9-12=');
    expect(display()).toBe('-3');

    await type('C6*7=');
    expect(display()).toBe('42');

    await type('C1/4=');
    expect(display()).toBe('0.25');
  });

  it('chains operations left to right', async () => {
    await type('2+3*4=');
    expect(display()).toBe('20');
  });

  it('shows the running result when the next operator is pressed', async () => {
    await type('2+3*');
    expect(display()).toBe('5');
  });

  it('continues calculating from the previous result', async () => {
    await type('2+3=*10=');
    expect(display()).toBe('50');
  });

  it('allows only one decimal point and hides floating point noise', async () => {
    await type('0.1.+.2=');
    expect(display()).toBe('0.3');
  });

  it('shows an error when dividing by zero and recovers on the next digit', async () => {
    await type('5/0=');
    expect(display()).toBe('Error');

    await type('7');
    expect(display()).toBe('7');
  });

  it('clears the display', async () => {
    await type('42+');
    await type('C');
    expect(display()).toBe('0');

    await type('3=');
    expect(display()).toBe('3');
  });

  it('highlights the selected operator', async () => {
    await type('2*');
    const multiply = element.querySelector('[data-testid="key-multiply"]')!;
    expect(multiply.classList).toContain('active');

    await type('3');
    await type('=');
    expect(multiply.classList).not.toContain('active');
  });
});
