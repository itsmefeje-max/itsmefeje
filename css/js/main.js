/* main.js — premium aurora background (safe version) */
(function () {
  'use strict';

  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t = 0;

  function draw() {
    if (!reduced) requestAnimationFrame(draw);

    t += 0.004;

    const w = canvas.width;
    const h = canvas.height;

    const g = ctx.createLinearGradient(
      Math.sin(t) * w * 0.3,
      0,
      w,
      h
    );

    g.addColorStop(0, `hsl(${230 + Math.sin(t) * 10}, 60%, 12%)`);
    g.addColorStop(0.5, `hsl(${260 + Math.cos(t * 0.8) * 12}, 65%, 10%)`);
    g.addColorStop(1, `hsl(${210 + Math.sin(t * 0.6) * 8}, 60%, 8%)`);

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // soft aurora streaks
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#7c6bff';
    for (let i = 0; i < 3; i++) {
      const x = (Math.sin(t * 0.6 + i) + 1) * w * 0.5;
      ctx.fillRect(x - 300, h * (0.25 + i * 0.12), 600, 10);
    }
    ctx.globalAlpha = 1;
  }

  draw();

  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
