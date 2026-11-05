import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-red',
  styleUrl: './red.scss',
  templateUrl: './red.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Red {}
