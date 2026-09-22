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
      title: 'Jinetes y Amazonas',
      description: 'Comparta su pasión, únase a picadas, salidas y competencias cerca suyo.',
      icon: '🏇',
    },
    {
      title: 'Escuelas de equitación',
      description: 'Dele visibilidad a sus cursos y conecte con nuevos alumnos.',
      icon: '🎓',
    },
    {
      title: 'Veterinarios y profesionales',
      description: 'Ofrezca sus servicios a la comunidad ecuestre de todo el país.',
      icon: '🩺',
    },
    {
      title: 'Clubes e instituciones',
      description: 'Publique sus eventos, torneos y novedades institucionales.',
      icon: '🏆',
    },
  ];
}
