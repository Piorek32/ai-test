import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavBar } from './nav-bar';

describe('NavBar', () => {
  let fixture: ComponentFixture<NavBar>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBar);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links to the home page', () => {
    const link = element.querySelector('[data-testid="nav-home"]')!;
    expect(link.textContent?.trim()).toBe('Home');
    expect(link.getAttribute('href')).toBe('/');
  });

  it('links to the calculator', () => {
    const link = element.querySelector('[data-testid="nav-calculator"]')!;
    expect(link.textContent?.trim()).toBe('Calculator');
    expect(link.getAttribute('href')).toBe('/calculator');
  });
});
