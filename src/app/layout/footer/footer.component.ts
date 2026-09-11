import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

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
