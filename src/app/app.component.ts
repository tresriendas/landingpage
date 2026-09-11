import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { CommunityComponent } from './sections/community/community.component';
import { ServicesOfferedComponent } from './sections/services-offered/services-offered.component';
import { EventsComponent } from './sections/events/events.component';
import { EmailPopupComponent } from './shared/components/email-popup/email-popup.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    CommunityComponent,
    ServicesOfferedComponent,
    EventsComponent,
    FooterComponent,
    EmailPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
