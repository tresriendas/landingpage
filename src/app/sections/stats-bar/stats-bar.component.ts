import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [],
  templateUrl: './stats-bar.component.html',
  styleUrl: './stats-bar.component.scss',
})
export class StatsBarComponent {
  readonly stats = [
    { value: '8+', label: 'Deportes' },
    { value: '∞', label: 'Posibilidades' },
    { value: '24/7', label: 'Comunidad' },
  ];
}
