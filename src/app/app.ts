import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './shared/nav-bar';

@Component({
  imports: [RouterOutlet, NavBar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
