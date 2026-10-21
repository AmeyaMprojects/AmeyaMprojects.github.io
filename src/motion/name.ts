// The hero name: a fixed width that fills its box (set in CSS), risen in once on load.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease } from '../engine';

export function startName() {
  onPage(({ intro }) => {
    const name = document.querySelector<HTMLElement>('[data-measure-name] [data-name]');
    if (!name || prefersReducedMotion()) return;

    gsap.set(name, { yPercent: 105 });
    gsap.set(['[data-hero-lead]', '[data-hero-meta]'], { autoAlpha: 0, y: 24 });
    intro.add(gsap.to(name, { yPercent: 0, duration: 1.3, ease: ease.out }), 0);
    intro.add(gsap.to(['[data-hero-lead]', '[data-hero-meta]'], { autoAlpha: 1, y: 0, duration: 1.1, ease: ease.out, stagger: 0.07 }), 0.45);
  });
}
