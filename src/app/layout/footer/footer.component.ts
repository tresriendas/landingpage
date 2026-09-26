import { Component } from '@angular/core';

interface SocialLink {
  label: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'linkedin';
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  /** Reemplazar cada href por el link real de cada red cuando estén disponibles. */
  readonly socialLinks: SocialLink[] = [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  ];

  readonly platformLinks = [
    { label: 'Comunidad', href: '#comunidad' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Eventos', href: '#eventos' },
  ];

  readonly companyLinks = [
    { label: 'Nosotros', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Privacidad', href: '#' },
  ];
}
