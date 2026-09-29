import { Component, inject } from '@angular/core';
import { SiteTheme, ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.theme;

  select(theme: SiteTheme): void {
    this.themeService.setTheme(theme);
  }
}
