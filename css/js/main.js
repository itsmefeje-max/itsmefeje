/* main.js — canvas background + reveal logic + small helpers */

// Safe guard (if script loads before DOM)
(function () {
  'use strict';

  // Reveal: small helper to progressively reveal .card etc.
  function runReveals() {
    const reveals = document.querySelectorAll('.card, .hero, .about, .goals, .projects, .contact');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(r => r.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // optional: unobserve to save cycles
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  }

  // Canvas background
  function startCanvas() {
    const canvas = document.getElementById('bg');
    if (!canvas) return;
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return;

    // resize
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let t = 0;
    let raf = null;

    function draw() {
      if (prefersReduced) {
        const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        g.addColorStop(0, 'hsl(230,18%,12%)');
        g.addColorStop(1, 'hsl(260,16%,10%)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      raf = requestAnimationFrame(draw);
      t += 0.007;

      // animated gradient
      const hueA = 220 + Math.sin(t) * 12;
      const hueB = 260 + Math.cos(t * 0.92) * 10;
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, `hsl(${hueA}, 60%, 18%)`);
      g.addColorStop(1, `hsl(${hueB}, 60%, 14%)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // extremely subtle streaks for depth
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = '#fff';
      const w = canvas.width, h = canvas.height;
      for (let i = 0; i < 3; i++) {
        const x = (Math.sin(t * 0.25 + i * 2.1) + 1) * w * 0.5;
        ctx.fillRect((x % w) - 260, h * 0.32 + i * 36, 520, 8);
      }
      ctx.globalAlpha = 1;
    }

    draw();
    window.addEventListener('beforeunload', () => raf && cancelAnimationFrame(raf));
  }

  // small helpers
  document.addEventListener('DOMContentLoaded', () => {
    // set year
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();

    startCanvas();
    runReveals();

    // keyboard focus helper: if skip-link used, focus content
    const skip = document.querySelector('.skip-link');
    if (skip) {
      skip.addEventListener('click', (e) => {
        const target = document.getElementById('content');
        setTimeout(() => target && target.focus(), 20);
      });
    }
  });

})();
