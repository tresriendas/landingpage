import { Component, DestroyRef, inject, signal } from '@angular/core';

interface Slide {
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 5000;

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss',
})
export class HeroCarouselComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly slides: Slide[] = [
    { src: 'images/hero/Polo.jpeg', alt: 'Jinete practicando salto' },
    { src: 'images/hero/Salto.jpeg', alt: 'Comunidad ecuestre en un evento' },
    { src: 'images/hero/Amansador_1.jpeg', alt: 'Amansador' },
    { src: 'images/hero/Veterinario.jpeg', alt: 'Cuidado sanitario de los equinos' },
    { src: 'images/hero/Herrero.jpeg', alt: 'Herrero' },
  ];

  readonly activeIndex = signal(0);

  private autoplayId: ReturnType<typeof setInterval> | undefined;
  private readonly prefersReducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    this.startAutoplay();
    this.destroyRef.onDestroy(() => this.stopAutoplay());
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  next(): void {
    this.activeIndex.update((i) => (i + 1) % this.slides.length);
    this.restartAutoplay();
  }

  prev(): void {
    this.activeIndex.update((i) => (i - 1 + this.slides.length) % this.slides.length);
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.prefersReducedMotion || this.slides.length < 2) {
      return;
    }
    this.stopAutoplay();
    this.autoplayId = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.slides.length);
    }, AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    clearInterval(this.autoplayId);
    this.autoplayId = undefined;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
