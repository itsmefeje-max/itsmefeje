// js/main.js — aurora-style animated canvas background + minimal reveal helpers
(function () {
  'use strict';

  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
  }
  addEventListener('resize', resize);
  resize();

  const prefersReduced = window.__PRM === true || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  let t = 0;
  let raf = null;

  function drawFrame() {
    if (!prefersReduced) raf = requestAnimationFrame(drawFrame);
    t += 0.004;

    const w = canvas.width;
    const h = canvas.height;

    // dynamic gradient
    const gx = Math.sin(t * 0.4) * 0.4 * w;
    const gy = Math.cos(t * 0.3) * 0.2 * h;
    const g = ctx.createLinearGradient(gx, 0, w - gx, h - gy);

    g.addColorStop(0, `hsl(${220 + Math.sin(t) * 10}, 60%, 12%)`);
    g.addColorStop(0.45, `hsl(${260 + Math.cos(t * 0.9) * 12}, 65%, 10%)`);
    g.addColorStop(1, `hsl(${210 + Math.sin(t * 0.6) * 8}, 60%, 8%)`);

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // soft aurora streaks — gentle, layered
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#7c6bff';
    const streakCount = 3;
    for (let i = 0; i < streakCount; i++) {
      const amplitude = 0.35 + i * 0.08;
      const x = (Math.sin(t * (0.2 + i * 0.14) + i) + 1) * w * 0.5;
      const y = h * (0.22 + i * 0.13 + Math.sin(t * 0.15 + i) * 0.02);
      ctx.fillRect((x % w) - (w * amplitude), y, w * amplitude * 2, Math.max(6, 8 - i));
    }
    ctx.globalAlpha = 1;
  }

  drawFrame();

  // Reveal: sprinkle of IntersectionObserver for .card & sections
  function runReveals() {
    const reveals = document.querySelectorAll('.card, .hero, .about, .goals, .projects, .contact');
    if (!('IntersectionObserver' in window) || prefersReduced) {
      reveals.forEach(r => r.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  }

  // DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    // set year
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();

    runReveals();

    // accessibility: skip link focus
    const skip = document.querySelector('.skip-link');
    if (skip) {
      skip.addEventListener('click', () => {
        const main = document.getElementById('main');
        setTimeout(() => main && main.focus(), 10);
      });
    }
  });

  // cleanup
  window.addEventListener('beforeunload', () => { if (raf) cancelAnimationFrame(raf); });

})();
