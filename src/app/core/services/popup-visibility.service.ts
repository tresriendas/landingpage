import { Injectable } from '@angular/core';

const DISMISSED_KEY = 'equestris_popup_dismissed';
const SUBSCRIBED_KEY = 'equestris_subscribed';

@Injectable({ providedIn: 'root' })
export class PopupVisibilityService {
  shouldShowPopup(): boolean {
    try {
      return !localStorage.getItem(DISMISSED_KEY) && !localStorage.getItem(SUBSCRIBED_KEY);
    } catch {
      return false;
    }
  }

  markDismissed(): void {
    this.trySet(DISMISSED_KEY);
  }

  markSubscribed(): void {
    this.trySet(SUBSCRIBED_KEY);
  }

  private trySet(key: string): void {
    try {
      localStorage.setItem(key, '1');
    } catch {
      // localStorage no disponible (modo privado, etc.) — se ignora, el popup podrá reaparecer.
    }
  }
}
