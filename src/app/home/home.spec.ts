import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;

  const byTestId = (testId: string) => element.querySelector(`[data-testid="${testId}"]`)!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows the Dodge Charger photo', () => {
    const image = byTestId('hero-image') as HTMLImageElement;
    expect(image.src).toContain('Dodge_Charger');
    expect(image.alt).toBe('Dodge Charger SRT Hellcat Redeye Widebody');
  });

  it('renders the title letter by letter with staggered animation', () => {
    const title = byTestId('hero-title');
    expect(title.getAttribute('aria-label')).toBe('Dodge Charger');

    const letters = Array.from(title.querySelectorAll<HTMLElement>('.letter'));
    expect(letters.map((l) => l.textContent).join('')).toBe('DodgeCharger');
    expect(title.querySelectorAll('.word').length).toBe(2);
    expect(letters[0].style.animationDelay).toBe('0ms');
    expect(letters[1].style.animationDelay).toBe('70ms');
    // the space between words also takes a slot, so "C" starts after a short pause
    expect(letters[5].style.animationDelay).toBe('420ms');
  });

  it('shows the subtitle', () => {
    expect(byTestId('hero-subtitle').textContent).toContain('American muscle');
  });
});
