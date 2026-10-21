// Global motion: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, onScroll, onPage, ease } from '../engine';
import { startIdle } from './idle';
import { startName } from './name';
import { startCaliper } from './caliper';
import { startFill } from './fill';

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));
  // Loader → hero: the count lifts out, then the vellum sheet slides off to the right like a jaw opening.
  setLoaderExit((root) => gsap.timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.35, ease: ease.inOut, stagger: 0.03 })
    .to(root.querySelector('.loader__scale'), { scaleX: 0, transformOrigin: '100% 50%', duration: 0.35, ease: ease.inOut }, '<')
    .to(root, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.55, ease: ease.inOut }, '-=0.2'));

  // Page transition: a graphite jaw with a tick scale on its leading edge travels across, carrying the destination.
  let dest = '';
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
    if (a) dest = a.dataset.title || a.textContent?.trim() || '';
  }, true);
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const label = c.querySelector<HTMLElement>('[data-curtain-label]')!;
      label.textContent = dest ? `→ ${dest}` : '';
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { xPercent: -100 }, { xPercent: 0, duration: 0.75, ease: ease.inOut })
        .fromTo(label, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: ease.out }, '-=0.3');
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      return gsap.timeline()
        .to(panel, { xPercent: 100, duration: 0.8, ease: ease.inOut })
        .set(c, { autoAlpha: 0 })
        .set(panel, { xPercent: -100 });
    },
  });

  startIdle();
  startName();
  startCaliper();
  startFill();

  // Time ruler spans draw out to their mark when the record scrolls in.
  onPage(() => {
    const spans = gsap.utils.toArray<HTMLElement>('[data-span]');
    if (!spans.length || !document.documentElement.classList.contains('motion')) return;
    gsap.from(spans, { scaleX: 0, duration: 1.2, ease: ease.out, stagger: 0.08, scrollTrigger: { trigger: '[data-ruler]', start: 'top 80%', once: true } });
  });

  // The top frame steps aside while scrolling down, returns on scroll up.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 160 && y > last);
    document.documentElement.classList.toggle('frame-solid', y > 80);
    last = y;
  });
  document.addEventListener('astro:after-swap', () => document.documentElement.classList.remove('frame-away', 'frame-solid'));
  void ScrollTrigger;
}
