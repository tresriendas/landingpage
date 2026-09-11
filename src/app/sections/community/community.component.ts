import { Component } from '@angular/core';

interface CommunityGroup {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {
  readonly groups: CommunityGroup[] = [
    {
      title: 'Jinetes y amateurs',
      description: 'Compartí tu pasión, sumate a picadas, salidas y competencias cerca tuyo.',
      icon: '🏇',
    },
    {
      title: 'Escuelas de equitación',
      description: 'Dales visibilidad a tus cursos y conectá con nuevos alumnos.',
      icon: '🎓',
    },
    {
      title: 'Veterinarios y profesionales',
      description: 'Ofrecé tus servicios a la comunidad ecuestre de todo el país.',
      icon: '🩺',
    },
    {
      title: 'Clubes e instituciones',
      description: 'Publicá tus eventos, torneos y novedades institucionales.',
      icon: '🏆',
    },
  ];
}
