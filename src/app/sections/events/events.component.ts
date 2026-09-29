import { Component } from '@angular/core';

interface EventItem {
  title: string;
  date: string;
  place: string;
  image: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  readonly events: EventItem[] = [
    { title: 'Torneo de salto', date: '12 oct', place: 'Club Hípico San Isidro', image: 'images/hero/Salto.jpeg' },
    { title: 'Clínica de amansamiento', date: '9 nov', place: 'Sociedad Rural', image: 'images/hero/Amansador_2.jpeg' },
    { title: 'Exposición y remate', date: '21 nov', place: 'Predio Ferial', image: 'images/events/Exposicion.jpg' },
    { title: 'Clínica de entrenamiento', date: '5 dic', place: 'Haras El Retiro', image: 'images/events/Entrenamiento.jpg' },
  ];
}
