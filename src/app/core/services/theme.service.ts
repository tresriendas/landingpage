import { Injectable, signal } from '@angular/core';

export type SiteTheme = 'clasico' | 'nautico';

const THEME_KEY = 'equestris_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<SiteTheme>(this.readStoredTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  setTheme(theme: SiteTheme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // localStorage no disponible (modo privado, etc.) — el tema no persiste entre visitas.
    }
  }

  private readStoredTheme(): SiteTheme {
    try {
      return localStorage.getItem(THEME_KEY) === 'clasico' ? 'clasico' : 'nautico';
    } catch {
      return 'nautico';
    }
  }

  private applyTheme(theme: SiteTheme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
