import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';

describe('About', () => {
  let fixture: ComponentFixture<About>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows the heading', () => {
    const heading = element.querySelector('[data-testid="about-heading"]')!;
    expect(heading.tagName).toBe('H1');
    expect(heading.textContent?.trim()).toBe('O projekcie');
  });

  it('shows the description', () => {
    const text = element.querySelector('[data-testid="about-text"]')!;
    expect(text.textContent?.trim()).toBe(
      'Aplikacja pisana przez AI, recenzowana przez człowieka.',
    );
  });
});
