import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  readonly navLinks = [
    { label: 'Comunidad', href: '#comunidad' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Eventos', href: '#eventos' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
