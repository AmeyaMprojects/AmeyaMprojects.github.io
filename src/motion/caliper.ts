// The caliper: one instrument for the whole site. It travels to whatever primary target you point at
// (or focus), closes its jaws on the target's edges and reads its width. Motion verb: travel to the mark, then read.
import { gsap } from 'gsap';
import { onScroll, isTouch, prefersReducedMotion, ease } from '../engine';

const SEL = '[data-measure]';

export function startCaliper() {
  if (isTouch()) return;
  const root = document.getElementById('caliper');
  if (!root) return;
  const [jl, jr] = [...root.querySelectorAll<HTMLElement>('.cal__jaw')];
  const bar = root.querySelector<HTMLElement>('.cal__bar')!;
  const val = root.querySelector<HTMLElement>('.cal__val')!;
  const reduce = prefersReducedMotion();
  const d = reduce ? 0 : 0.55;
  const to = (el: HTMLElement, prop: string) => gsap.quickTo(el, prop, { duration: d, ease: ease.out });
  const q = {
    lx: to(jl, 'x'), ly: to(jl, 'y'), lh: to(jl, 'scaleY'),
    rx: to(jr, 'x'), ry: to(jr, 'y'), rh: to(jr, 'scaleY'),
    bx: to(bar, 'x'), by: to(bar, 'y'), bw: to(bar, 'scaleX'),
    vx: to(val, 'x'), vy: to(val, 'y'),
  };
  gsap.set(val, { xPercent: -50, yPercent: -50 });
  const reading = { v: 0 };
  let target: HTMLElement | null = null;
  let shown = false;

  const PAD = 0;
  const bounds = (el: HTMLElement) => {
    const b = el.getBoundingClientRect();
    let l = b.left, t = b.top, r = b.right, btm = b.bottom;
    el.querySelectorAll<HTMLElement>('.arr').forEach((a) => {
      const q = a.getBoundingClientRect();
      const nudge = parseFloat(getComputedStyle(a).fontSize) * 0.15 + 4; // room for the arrow's hover nudge
      l = Math.min(l, q.left); r = Math.max(r, q.right + nudge);
    });
    const below = el.dataset.measure === 'below';
    return { left: l - PAD, right: r + PAD, top: t, height: btm - t, width: r - l + PAD * 2, barY: below ? btm + 9 : t - 9 };
  };
  const place = (el: HTMLElement) => {
    const r = bounds(el);
    const top = r.top, h = r.height;
    q.lx(r.left); q.ly(top); q.lh(h);
    q.rx(r.right - 1); q.ry(top); q.rh(h);
    const barY = r.barY;
    q.bx(r.left); q.by(barY); q.bw(r.width);
    q.vx(r.left + r.width / 2); q.vy(barY);
    return r.width;
  };
  const show = (el: HTMLElement) => {
    if (target === el) return;
    const first = !shown;
    target = el;
    if (first) {
      // Appear at the target's centre with closed jaws, then open onto the edges.
      const r = bounds(el);
      const cx = r.left + r.width / 2;
      gsap.set([jl, jr], { x: cx, y: r.top, scaleY: r.height });
      gsap.set(bar, { x: cx, y: r.barY, scaleX: 0 });
      gsap.set(val, { x: cx, y: r.barY });
      reading.v = 0;
    }
    shown = true;
    gsap.to(root, { autoAlpha: 1, duration: 0.2, overwrite: true });
    const w = place(el);
    gsap.to(reading, {
      v: w, duration: reduce ? 0 : 0.6, ease: ease.out, overwrite: true,
      onUpdate: () => { val.textContent = `${reading.v.toFixed(1)} px`; },
    });
  };
  const hide = () => {
    target = null; shown = false;
    gsap.to(root, { autoAlpha: 0, duration: 0.25, overwrite: true });
  };

  document.addEventListener('pointerover', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(SEL);
    if (el) show(el);
    else if (target) hide();
  }, { passive: true });
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(SEL);
    if (el && el.matches(':focus-visible')) show(el); else if (target) hide();
  });
  document.addEventListener('pointerleave', hide);
  // The target moves under a still pointer when the page scrolls: follow it, or let go.
  onScroll(() => { if (target) { if (!target.isConnected) hide(); else place(target); } });
  document.addEventListener('astro:before-swap', hide);
}
