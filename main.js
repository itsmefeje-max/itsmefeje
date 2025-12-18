<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Itsmefeje — Roblox Developer</title>
  <meta name="description" content="Itsmefeje — Roblox developer learning LuaU, game design and game development. Prototyping systems and documenting progress." />
  <meta property="og:title" content="Itsmefeje — Roblox Developer" />
  <meta property="og:description" content="Learning LuaU, game design and scalable game mechanics — portfolio and learning log." />
  <link rel="icon" href="/favicon.ico" />
  <style>
    :root{
      --bg:#07070b; --text:#E7E7EA; --muted:#9aa0a6; --accent:#7c6bff;
      --container:1100px; --radius:12px; --gap:20px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; background:var(--bg); color:var(--text);
      font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
      line-height:1.5; scroll-behavior:smooth;
    }

    /* accessibility skip link */
    .skip{position:absolute;left:-9999px;top:auto}
    .skip:focus{left:16px;top:16px;padding:8px 10px;background:#111;border-radius:6px;z-index:1000}

    /* canvas background */
    canvas#bg{position:fixed;inset:0;width:100%;height:100%;z-index:-2;display:block}
    body::before{content:"";position:fixed;inset:0;background:linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.30));z-index:-1}

    /* header */
    header{position:fixed;left:0;right:0;top:0;z-index:30;backdrop-filter:blur(8px)}
    .header-inner{max-width:var(--container);margin:0 auto;padding:18px 24px;display:flex;align-items:center;justify-content:space-between}
    .brand a{color:var(--text);font-weight:700;text-decoration:none;letter-spacing:-0.02em}
    nav.site-nav{display:flex;gap:12px}
    nav.site-nav a{color:var(--muted);text-decoration:none;padding:6px 8px;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all .14s}
    nav.site-nav a:hover{color:var(--text);background:rgba(255,255,255,0.02);transform:translateY(-2px)}
    nav.site-nav a.active{color:var(--text);background:linear-gradient(90deg,var(--accent),#9f88ff);box-shadow:0 8px 28px rgba(124,107,255,0.12)}

    /* layout container */
    .container{max-width:var(--container);margin:0 auto;padding:120px 28px 80px;box-sizing:border-box}

    /* hero */
    .hero{ text-align:center;padding-top:10px }
    .display{font-size:clamp(2.2rem,6vw,3.6rem);margin:0 0 10px;letter-spacing:-0.02em;font-weight:700}
    .lede{color:var(--muted);margin:0 auto;max-width:56ch}

    /* sections */
    .section{padding:36px 0}
    .grid{display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start}
    .side{background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 8px 32px rgba(6,6,10,0.6)}
    .facts{list-style:none;padding:0;margin:10px 0 0;color:var(--muted)}
    h2{margin:0 0 12px;font-size:1.25rem}
    p{margin:0 0 12px;color:var(--text)}

    /* cards */
    .goals-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:12px}
    .goal-card{padding:18px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.03);box-shadow:0 6px 20px rgba(6,6,10,0.6)}

    .projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:12px}
    .project-card{padding:16px;border-radius:10px;background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));border:1px solid rgba(255,255,255,0.02);box-shadow:0 6px 18px rgba(6,6,10,0.5)}
    .project-meta{display:flex;justify-content:space-between;align-items:center;gap:8px}

    /* contact simple links (only place with visible links) */
    .contact-list{list-style:none;padding:0;margin:8px 0 0;color:var(--muted)}
    .contact-list a{color:var(--text);text-decoration:underline}

    /* footer */
    .site-footer{border-top:1px solid rgba(255,255,255,0.02);margin-top:40px;padding-top:28px;color:var(--muted)}
    .footer-inner{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}

    /* reveal animation */
    .reveal{opacity:0;transform:translateY(10px);transition:opacity .55s cubic-bezier(.2,.9,.27,1),transform .55s cubic-bezier(.2,.9,.27,1);will-change:opacity,transform}
    .reveal.visible{opacity:1;transform:none}

    /* small helpers */
    .muted{color:var(--muted)}
    code{background:rgba(255,255,255,0.02);padding:2px 6px;border-radius:6px;color:var(--text);font-size:0.95rem}

    /* responsive */
    @media (max-width:980px){ .grid{grid-template-columns:1fr} .projects-grid{grid-template-columns:1fr} .goals-grid{grid-template-columns:1fr} .container{padding:110px 20px 60px} }
    @media (max-width:520px){ .header-inner{padding:14px 16px} .display{font-size:2rem} .container{padding:80px 16px 56px} nav.site-nav{gap:8px} }

    /* reduced motion */
    @media (prefers-reduced-motion: reduce){
      .reveal{transition:none;transform:none;opacity:1}
      canvas#bg{will-change:auto}
    }
  </style>
</head>
<body>
  <a class="skip" href="#content">Skip to content</a>

  <!-- canvas background -->
  <canvas id="bg" aria-hidden="true"></canvas>

  <header aria-hidden="false">
    <div class="header-inner">
      <div class="brand"><a href="#hero">Itsmefeje</a></div>
      <nav class="site-nav" role="navigation" aria-label="Main">
        <a href="#about" data-id="about">About</a>
        <a href="#goals" data-id="goals">Goals</a>
        <a href="#projects" data-id="projects">Projects</a>
        <a href="#contact" data-id="contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="content" tabindex="-1">
    <section id="hero" class="hero container">
      <div class="reveal" style="text-align:center">
        <h1 class="display">Itsmefeje</h1>
        <p class="lede muted">Roblox developer in the learning phase of LuaU, game design & game development. I prototype systems-first and document what I learn.</p>
      </div>
    </section>

    <section id="about" class="section container">
      <div class="section-inner grid">
        <div class="col reveal">
          <h2>About</h2>
          <p>I am studying LuaU and Roblox Studio while building small prototypes that prove systems before public release. I prefer readable, maintainable code and modular design that scales with many players.</p>
          <p class="muted">I follow system-first development: understand the rules, simulate, and iterate before exposing to players.</p>
        </div>

        <aside class="col side reveal">
          <h3>Quick facts</h3>
          <ul class="facts">
            <li><strong>Role:</strong> Roblox developer (learning)</li>
            <li><strong>Handle:</strong> <code>itsmefeje</code> (Roblox & Discord)</li>
            <li><strong>Location:</strong> Philippines</li>
            <li><strong>Status:</strong> Prototyping internal systems</li>
          </ul>
        </aside>
      </div>
    </section>

    <section id="goals" class="section container">
      <div class="reveal">
        <h2>Goals</h2>
        <div class="goals-grid">
          <div class="goal-card">
            <h4>Short-term</h4>
            <ul>
              <li>Master LuaU fundamentals & scripting patterns</li>
              <li>Ship three internal prototypes</li>
              <li>Publish a small, stable Roblox experience</li>
            </ul>
          </div>
          <div class="goal-card">
            <h4>Long-term</h4>
            <ul>
              <li>Design multiplayer experiences with scalable systems</li>
              <li>Document case studies and technical decisions</li>
              <li>Grow as a full-stack Roblox developer</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="section container">
      <div class="reveal">
        <h2>Projects</h2>
        <p class="muted">Public projects will appear here when ready. Below are current prototypes and experiments.</p>

        <div class="projects-grid" aria-hidden="false">
          <article class="project-card reveal">
            <div class="project-meta"><strong>Offline Growth Prototype</strong><span class="small muted">internal</span></div>
            <p class="muted">A test of offline resource accumulation and balancing systems. Focus on stable gains while offline and fair progression when players return.</p>
          </article>

          <article class="project-card reveal">
            <div class="project-meta"><strong>Inventory & Economy Tests</strong><span class="small muted">internal</span></div>
            <p class="muted">Exploring persistence, trade patterns, and simple micro-economy interactions under load.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="section container">
      <div class="reveal">
        <h2>Contact</h2>
        <p>If you'd like to reach out, use one of the links below — these are the only visible interactive elements on the page.</p>

        <ul class="contact-list">
          <li>GitHub: <a href="https://github.com/itsmefeje" target="_blank" rel="noopener">github.com/itsmefeje</a></li>
          <li>Roblox: <strong>itsmefeje</strong> (profile/search)</li>
          <li>Discord: <strong>itsmefeje</strong></li>
          <li>Email: <a href="mailto:your.email@example.com">your.email@example.com</a> (replace)</li>
        </ul>
      </div>
    </section>

    <footer class="site-footer container">
      <div class="footer-inner">
        <small>© <span id="year"></span> Itsmefeje — Built with care</small>
        <nav class="footer-nav" aria-label="Footer">
          <a href="#about">About</a> · <a href="#goals">Goals</a> · <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  </main>

  <script>
  // Single-file JS: canvas bg, reveal, active nav, reduced-motion safe
  (function(){
    const canvas = document.getElementById('bg');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    function resize(){ if(!canvas) return; canvas.width = innerWidth; canvas.height = innerHeight; }
    addEventListener('resize', resize); resize();

    const prefersReduced = window.__prefersReducedMotion === true || matchMedia('(prefers-reduced-motion: reduce)').matches;

    // background loop
    let t = 0, raf = null;
    function draw(){
      if(!ctx) return;
      if(prefersReduced){
        const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
        g.addColorStop(0,'hsl(230,18%,12%)'); g.addColorStop(1,'hsl(260,16%,10%)');
        ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height); return;
      }
      raf = requestAnimationFrame(draw);
      t += 0.008;
      const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      const hueA = 220 + Math.sin(t)*18; const hueB = 260 + Math.cos(t*0.9)*14;
      g.addColorStop(0, `hsl(${hueA}, 60%, 18%)`); g.addColorStop(1, `hsl(${hueB}, 60%, 14%)`);
      ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height);

      // subtle low-cost waves
      ctx.globalAlpha = 0.03; ctx.fillStyle = '#fff';
      const w = canvas.width, h = canvas.height;
      for(let i=0;i<3;i++){
        const x = (Math.sin(t*0.3 + i*2) + 1) * w * 0.5;
        ctx.fillRect((x % w) - 200, h*0.32 + i*40, 400, 8);
      }
      ctx.globalAlpha = 1;
    }
    draw();
    addEventListener('beforeunload', ()=> raf && cancelAnimationFrame(raf));

    // reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    if(!prefersReduced && 'IntersectionObserver' in window){
      const io = new IntersectionObserver((entries)=> { entries.forEach(e=> { if(e.isIntersecting){ e.target.classList.add('visible'); } }); }, {threshold:0.12});
      reveals.forEach(r=> io.observe(r));
    } else {
      reveals.forEach(r=> r.classList.add('visible'));
    }

    // active nav highlight
    const navLinks = document.querySelectorAll('.site-nav a');
    function throttle(fn, wait){ let t=0; return (...a)=>{ const n = Date.now(); if(n - t >= wait){ t = n; fn(...a); } }; }
    function updateActive(){
      const sections = Array.from(document.querySelectorAll('main section[id]'));
      const scrollPos = scrollY + 140;
      let current = sections[0];
      sections.forEach(s => { if(s.offsetTop <= scrollPos) current = s; });
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current.id));
    }
    updateActive();
    addEventListener('scroll', throttle(updateActive, 120));
    addEventListener('resize', throttle(updateActive, 300));

    // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ensure focus for skip link targets
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if(el){ setTimeout(()=> el.focus({preventScroll:true}), 200); }
      });
    });
  })();
  </script>
</body>
</html>

