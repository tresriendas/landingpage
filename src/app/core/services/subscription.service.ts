import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';

const WRITE_TIMEOUT_MS = 10000;

export interface SubscribeInput {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly firestore = inject(Firestore);
  private readonly injector = inject(Injector);

  async subscribe(input: SubscribeInput): Promise<void> {
    const write = runInInjectionContext(this.injector, () => {
      const contactsRef = collection(this.firestore, 'Contact');
      return addDoc(contactsRef, {
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        email: input.email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        source: 'landing-popup',
      });
    });

    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de espera agotado')), WRITE_TIMEOUT_MS);
    });

    await Promise.race([write, timeout]);
  }
}
