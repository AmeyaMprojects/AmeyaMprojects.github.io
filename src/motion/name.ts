// The driver: one variable (the name's width axis) fans out to the name, its dimension line and the readout.
// Idle clock + lagged pointer keep it drifting, so the reading never settles. Paused off screen.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion, ease } from '../engine';
import { idle } from './idle';

const W_MIN = 62;
let W_MAX = 125; // per breakpoint, from --name-wmax
const fmt = (n: number) => n.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' px';

let seen = false; // the hero has been drawn once this visit

export function startName() {
  onPage(({ intro }) => {
    const box = document.querySelector<HTMLElement>('[data-measure-name]');
    const name = box?.querySelector<HTMLElement>('[data-name]');
    const line = box?.querySelector<HTMLElement>('[data-dim-line]');
    const tick = box?.querySelector<HTMLElement>('[data-dim-tick]');
    const val = box?.querySelector<HTMLElement>('[data-dim-val]');
    if (!box || !name || !line || !tick || !val) return;

    // Width is close to linear in the wdth axis: measure both ends once per resize, interpolate between.
    let wMin = 0, wMax = 0, boxW = 1, wdth = 100;
    const setAxis = (w: number) => { name.style.fontVariationSettings = `'wdth' ${w.toFixed(2)}, 'wght' 800`; };
    const measure = () => {
      W_MAX = parseFloat(getComputedStyle(box).getPropertyValue('--name-wmax')) || 125;
      setAxis(W_MIN); wMin = name.getBoundingClientRect().width;
      setAxis(W_MAX); wMax = name.getBoundingClientRect().width;
      boxW = box.getBoundingClientRect().width;
      setAxis(wdth);
    };
    const widthAt = (w: number) => wMin + ((w - W_MIN) / (W_MAX - W_MIN)) * (wMax - wMin);
    const reveal = { k: 1 }; // dimension line draw-in for the intro
    const apply = (w: number) => {
      wdth = w;
      setAxis(w);
      const px = prefersReducedMotion() ? name.getBoundingClientRect().width : widthAt(w);
      gsap.set(line, { scaleX: (px / boxW) * reveal.k, transformOrigin: '0 50%' });
      gsap.set(tick, { x: px * reveal.k - 1 });
      gsap.set(val, { xPercent: -50, yPercent: -50, x: px / 2 - boxW / 2 });
      val.textContent = fmt(px * reveal.k);
    };

    measure();
    const onResize = () => { measure(); apply(wdth); };
    addEventListener('resize', onResize);
    document.fonts.ready.then(onResize);

    if (prefersReducedMotion()) {
      apply(W_MAX); // one honest reading, held still
      // Re-read whenever the word's box changes (late font swap, resize): the number must stay true.
      const ro = new ResizeObserver(() => { measure(); apply(W_MAX); });
      ro.observe(name);
      return () => { ro.disconnect(); removeEventListener('resize', onResize); };
    }

    // Drift: two slow sines and the lagged pointer. Stays inside the axis, never settles.
    const state = { base: 0.68 };
    const target = () => {
      const t = idle.t;
      const p = state.base + 0.26 * Math.sin(t * 0.42) + 0.1 * Math.sin(t * 1.17 + 1.3) + idle.x * 0.5;
      return W_MIN + gsap.utils.clamp(0, 1, p) * (W_MAX - W_MIN);
    };
    let cur = W_MAX; // first frame: the name at full stretch, filling its measure
    const tickFn = () => {
      const r = gsap.ticker.deltaRatio();
      cur += (target() - cur) * (1 - Math.pow(0.9, r));
      apply(cur);
    };

    // Intro: the name rises, the dimension line travels out to the mark, then reads.
    // First load draws the dimension line out; after a page change the reading is already there.
    const firstLoad = !seen;
    seen = true;
    reveal.k = firstLoad ? 0 : 1;
    gsap.set(name, { yPercent: 105 });
    gsap.set(['[data-hero-gloss]', '[data-hero-lead]', '[data-hero-meta]'], { autoAlpha: 0, y: 24 });
    intro.add(gsap.to(name, { yPercent: 0, duration: 1.3, ease: ease.out }), 0);
    if (firstLoad) intro.add(gsap.to(reveal, { k: 1, duration: 1.2, ease: ease.out, onUpdate: () => apply(cur) }), 0.35);
    intro.add(gsap.to(['[data-hero-gloss]', '[data-hero-lead]', '[data-hero-meta]'], { autoAlpha: 1, y: 0, duration: 1.1, ease: ease.out, stagger: 0.07 }), 0.45);
    apply(cur);

    const st = ScrollTrigger.create({
      trigger: box, start: 'top bottom', end: 'bottom top',
      onToggle: (s) => (s.isActive ? gsap.ticker.add(tickFn) : gsap.ticker.remove(tickFn)),
    });
    if (st.isActive) gsap.ticker.add(tickFn);
    return () => { gsap.ticker.remove(tickFn); removeEventListener('resize', onResize); };
  });
}
