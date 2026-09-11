import { AfterViewInit, Component, DestroyRef, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { PopupVisibilityService } from '../../../core/services/popup-visibility.service';

type PopupStatus = 'idle' | 'loading' | 'success' | 'error';

const OPEN_DELAY_MS = 800;
const CLOSE_AFTER_SUCCESS_MS = 2000;

@Component({
  selector: 'app-email-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-popup.component.html',
  styleUrl: './email-popup.component.scss',
})
export class EmailPopupComponent implements AfterViewInit {
  @ViewChild('dialogRef') private readonly dialogRef!: ElementRef<HTMLDialogElement>;

  private readonly subscriptionService = inject(SubscriptionService);
  private readonly visibility = inject(PopupVisibilityService);
  private readonly destroyRef = inject(DestroyRef);

  readonly status = signal<PopupStatus>('idle');

  /** true mientras se cierra por "Ya me registré": evita que onDialogClose arme el reaparecer-al-clic. */
  private closingAsAlreadyRegistered = false;

  readonly form = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  ngAfterViewInit(): void {
    if (!this.visibility.shouldShowPopup()) {
      return;
    }
    setTimeout(() => this.dialogRef.nativeElement.showModal(), OPEN_DELAY_MS);
  }

  onDialogClose(): void {
    if (this.status() === 'success' || this.closingAsAlreadyRegistered) {
      this.closingAsAlreadyRegistered = false;
      return;
    }
    // Cierre simple (X, ESC o backdrop): el próximo clic en la página vuelve a abrir el popup.
    // El setTimeout evita que el propio clic que disparó el cierre reabra el popup al instante.
    setTimeout(() => {
      const reopen = () => this.dialogRef.nativeElement.showModal();
      document.addEventListener('click', reopen, { once: true, capture: true });
      this.destroyRef.onDestroy(() => document.removeEventListener('click', reopen, { capture: true }));
    }, 0);
  }

  closeDialog(): void {
    this.dialogRef.nativeElement.close();
  }

  /** Cierra al hacer clic en el backdrop del <dialog> nativo (fuera del contenido). */
  onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialogRef.nativeElement) {
      this.closeDialog();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    try {
      await this.subscriptionService.subscribe(this.form.getRawValue());
      this.status.set('success');
      this.visibility.markSubscribed();
      setTimeout(() => this.dialogRef.nativeElement.close(), CLOSE_AFTER_SUCCESS_MS);
    } catch {
      this.status.set('error');
    }
  }

  /** El usuario indica que ya se registró antes (en otro dispositivo/navegador): cierra para siempre en este dispositivo. */
  markAlreadyRegistered(): void {
    this.closingAsAlreadyRegistered = true;
    this.visibility.markDismissed();
    this.dialogRef.nativeElement.close();
  }
}
