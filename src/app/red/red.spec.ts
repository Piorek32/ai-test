import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Red } from './red';

describe('Red', () => {
  let fixture: ComponentFixture<Red>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Red],
    }).compileComponents();

    fixture = TestBed.createComponent(Red);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('renders an empty page area', () => {
    const page = element.querySelector('[data-testid="red-page"]')!;
    expect(page).toBeTruthy();
    expect(page.textContent?.trim()).toBe('');
  });
});
