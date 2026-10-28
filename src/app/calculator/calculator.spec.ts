import { TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';

describe('Calculator', () => {
  it('shows the page title', async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator],
    }).compileComponents();

    const fixture = TestBed.createComponent(Calculator);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Calculator');
  });
});
