import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  /** Carga Google Analytics 4 solo en producción y solo si hay un Measurement ID configurado. */
  init(): void {
    const measurementId = environment.googleAnalyticsId;
    if (!environment.production || !measurementId) {
      return;
    }

    const loaderScript = document.createElement('script');
    loaderScript.async = true;
    loaderScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(loaderScript);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(inlineScript);
  }
}
