import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  styleUrl: './counter.scss',
  templateUrl: './counter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  protected readonly count = signal(0);
  protected readonly isNegative = computed(() => this.count() < 0);

  protected increment(): void {
    this.count.update((value) => value + 1);
  }

  protected decrement(): void {
    this.count.update((value) => value - 1);
  }

  protected reset(): void {
    this.count.set(0);
  }
}
