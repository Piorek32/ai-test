import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  styleUrl: './calculator.scss',
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calculator {}
