import { Component } from '@angular/core';
import { StatsBarComponent } from '../stats-bar/stats-bar.component';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [StatsBarComponent, HeroCarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
