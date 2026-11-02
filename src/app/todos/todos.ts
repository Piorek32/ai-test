import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todos',
  styleUrl: './todos.scss',
  templateUrl: './todos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todos {
  private nextId = 1;

  protected readonly todos = signal<Todo[]>([]);
  protected readonly remaining = computed(() => this.todos().filter((todo) => !todo.done).length);

  protected add(input: HTMLInputElement): void {
    const text = input.value.trim();
    if (!text) {
      return;
    }
    this.todos.update((todos) => [...todos, { id: this.nextId++, text, done: false }]);
    input.value = '';
  }

  protected toggle(id: number): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  protected remove(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
