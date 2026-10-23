import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;
  let element: HTMLElement;

  const click = async (testId: string) => {
    element.querySelector<HTMLButtonElement>(`[data-testid="${testId}"]`)!.click();
    await fixture.whenStable();
  };
  const value = () => element.querySelector('[data-testid="value"]')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('starts at 0', () => {
    expect(value().textContent?.trim()).toBe('0');
  });

  it('increments and decrements', async () => {
    await click('increment');
    await click('increment');
    expect(value().textContent?.trim()).toBe('2');

    await click('decrement');
    expect(value().textContent?.trim()).toBe('1');
  });

  it('resets to 0', async () => {
    await click('increment');
    await click('reset');
    expect(value().textContent?.trim()).toBe('0');
  });

  it('marks negative values', async () => {
    await click('decrement');
    expect(value().textContent?.trim()).toBe('-1');
    expect(value().classList).toContain('negative');
  });
});
