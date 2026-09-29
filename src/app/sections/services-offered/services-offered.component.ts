import { Component } from '@angular/core';

type ServiceIcon =
  | 'herreria'
  | 'veterinaria'
  | 'tiendas'
  | 'alimentacion'
  | 'transporte'
  | 'entrenamiento'
  | 'suministros';

interface ServiceItem {
  title: string;
  icon: ServiceIcon;
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
    { title: 'Herrería', icon: 'herreria' },
    { title: 'Tiendas', icon: 'tiendas' },
    { title: 'Alimentación', icon: 'alimentacion' },
    { title: 'Transporte', icon: 'transporte' },
    { title: 'Entrenamiento y Amansamiento', icon: 'entrenamiento' },
    { title: 'Suministros', icon: 'suministros' },
  ];
}
