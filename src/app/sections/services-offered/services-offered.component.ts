import { Component } from '@angular/core';

interface ServiceItem {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-services-offered',
  standalone: true,
  imports: [],
  templateUrl: './services-offered.component.html',
  styleUrl: './services-offered.component.scss',
})
export class ServicesOfferedComponent {
  readonly services: ServiceItem[] = [
    { title: 'Herrería', icon: '🔨' },
    { title: 'Veterinaria', icon: '🩺' },
    { title: 'Tiendas', icon: '🧤' },
    { title: 'Alimentación', icon: '🌾' },
    { title: 'Transporte', icon: '🚛' },
    { title: 'Entrenamiento y Amansamiento', icon: '🐎' },
    { title: 'Suministros', icon: '📦' },

  ];
}
