import { Component } from '@angular/core';
import { StatsBarComponent } from '../stats-bar/stats-bar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [StatsBarComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
