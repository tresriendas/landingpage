import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';

const WRITE_TIMEOUT_MS = 10000;

export interface SubscribeInput {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp?: string;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);

  async subscribe(input: SubscribeInput): Promise<void> {
    const firstName = input.firstName.trim();
    const email = input.email.trim().toLowerCase();
    const whatsapp = input.whatsapp?.trim();

    const write = runInInjectionContext(this.injector, () => {
      const contactsRef = collection(this.firestore, 'Contact');
      return addDoc(contactsRef, {
        firstName,
        lastName: input.lastName.trim(),
        email,
        ...(whatsapp ? { whatsapp } : {}),
        createdAt: serverTimestamp(),
        source: 'landing-popup',
      });
    });

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado')), WRITE_TIMEOUT_MS);
    });

    await Promise.race([Promise.all([write, this.sendWelcomeEmail(email, firstName)]), timeout]);
  }

  /**
   * Encola un email de bienvenida vía la extensión de Firebase "Trigger Email from Firestore",
   * que procesa los documentos de la colección `mail`. Si esta escritura falla, no debe frenar
   * el registro: se loguea y se sigue, porque el contacto ya quedó guardado en `Contact`.
   */
  private sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const mailRef = collection(this.firestore, 'mail');
      return addDoc(mailRef, {
        to: [email],
        message: {
          subject: 'Bienvenido/a a Equestris',
          html: `<p>Hola ${firstName || ''},</p>
<p>¡Gracias por registrarse en Equestris! Le vamos a mantener al tanto de las novedades del mundo ecuestre: eventos, novedades de la comunidad y ofertas de servicios.</p>
<p>Un saludo,<br/>El equipo de Equestris</p>`,
        },
      }).then(() => undefined);
    }).catch((error) => {
      console.error('No se pudo encolar el email de bienvenida', error);
    });
  }
}
