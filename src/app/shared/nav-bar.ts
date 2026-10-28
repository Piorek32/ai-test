import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  protected readonly links = [
    { label: 'Home', path: '/', testId: 'nav-home' },
    { label: 'Calculator', path: '/calculator', testId: 'nav-calculator' },
  ];
}
