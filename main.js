// main.js — canvas background + reveal + active nav + reduced-motion safety

// ---------- canvas background ----------
const canvas = document.getElementById('background');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const prefersReduced = window.__prefersReducedMotion === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let t = 0;
let raf = null;

function draw() {
  if (!ctx) return;
  if (prefersReduced) {
    // static, accessible gradient
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, 'hsl(230,18%,12%)');
    g.addColorStop(1, 'hsl(260,16%,10%)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    return;
  }

  raf = requestAnimationFrame(draw);
  t += 0.008;

  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const hueA = 220 + Math.sin(t)*18;
  const hueB = 260 + Math.cos(t*0.9)*14;
  g.addColorStop(0, `hsl(${hueA}, 60%, 18%)`);
  g.addColorStop(1, `hsl(${hueB}, 60%, 14%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // subtle waves overlay (low cost — just alpha noise)
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#ffffff';
  const w = canvas.width;
  const h = canvas.height;
  for (let i=0;i<3;i++){
    const x = (Math.sin(t*0.3 + i*2) + 1) * w * 0.5;
    ctx.fillRect((x % w) - 200, h*0.3 + i*40, 400, 8);
  }
  ctx.globalAlpha = 1;
}
draw();

// cleanup on unload
window.addEventListener('beforeunload', () => { if (raf) cancelAnimationFrame(raf); });

// ---------- reveal on scroll ----------
if (!prefersReduced) {
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
} else {
  // Make all revealed if reduced motion
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// ---------- active nav highlighting ----------
(function setActiveNav(){
  const navLinks = document.querySelectorAll('.site-nav a');
  function update() {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const scrollPos = window.scrollY + 140; // header offset
    let current = sections[0];
    sections.forEach(s => {
      if (s.offsetTop <= scrollPos) current = s;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
  }
  update();
  window.addEventListener('scroll', throttle(update, 120));
  window.addEventListener('resize', throttle(update, 300));
})();

// ---------- small helpers ----------
function throttle(fn, wait){
  let t = 0;
  return function(...args){
    const now = Date.now();
    if (now - t >= wait){ t = now; fn.apply(this, args); }
  };
}

// set year
document.getElementById('year')?.textContent = new Date().getFullYear();
