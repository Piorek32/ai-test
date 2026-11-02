import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todos } from './todos';

describe('Todos', () => {
  let fixture: ComponentFixture<Todos>;
  let element: HTMLElement;

  const q = (testId: string) => element.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!;
  const items = () => element.querySelectorAll('[data-testid="todo-item"]');
  const remaining = () => q('todo-remaining').textContent?.trim();

  const add = async (text: string) => {
    const input = q('todo-input') as HTMLInputElement;
    input.value = text;
    q('todo-add').click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Todos] }).compileComponents();
    fixture = TestBed.createComponent(Todos);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('starts empty', () => {
    expect(items().length).toBe(0);
    expect(remaining()).toBe('Pozostało: 0');
  });

  it('adds tasks and clears the input', async () => {
    await add('Kup mleko');
    await add('  Wyjdź z psem ');
    expect(items().length).toBe(2);
    expect(items()[1].textContent).toContain('Wyjdź z psem');
    expect((q('todo-input') as HTMLInputElement).value).toBe('');
    expect(remaining()).toBe('Pozostało: 2');
  });

  it('ignores empty and whitespace-only text', async () => {
    await add('');
    await add('   ');
    expect(items().length).toBe(0);
  });

  it('marks a task as done and updates the counter', async () => {
    await add('A');
    await add('B');
    element.querySelector<HTMLInputElement>('[data-testid="todo-checkbox"]')!.click();
    await fixture.whenStable();
    expect(q('todo-text').classList).toContain('done');
    expect(remaining()).toBe('Pozostało: 1');
  });

  it('removes a task', async () => {
    await add('A');
    await add('B');
    q('todo-remove').click();
    await fixture.whenStable();
    expect(items().length).toBe(1);
    expect(items()[0].textContent).toContain('B');
    expect(remaining()).toBe('Pozostało: 1');
  });
});
