/* Digital Fuel. Vanilla JS, no dependencies.
   The hero is a scroll-driven canvas scene built from three aligned photographic plates:
   a clean room, the light of the drop, and the light of the ring of fire. */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var ASSETS = root.getAttribute('data-assets') || 'assets/';

  /* The five static-hero gates. The same list is evaluated in <head> before first paint. */
  var GATES = window.__GATES || [
    '(max-width: 720px)',
    '(orientation: portrait) and (max-width: 1024px)',
    '(orientation: portrait) and (pointer: coarse)',
    '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
    '(prefers-reduced-motion: reduce)'
  ];
  var MQLS = GATES.map(function (q) { return window.matchMedia(q); });   // keep the lists referenced
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
  var smoothstep = function (p, e0, e1) { var t = clamp((p - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  var noise = function (x) { return (Math.sin(x * 7.1) + Math.sin(x * 11.3 + 1.7) + Math.sin(x * 17.9 + 0.4)) / 3; };
  function rng(seed) { var s = seed >>> 0; return function () { return (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }; }
  function listen(mql, fn) { if (mql.addEventListener) mql.addEventListener('change', fn); else if (mql.addListener) mql.addListener(fn); }

  /* ------------------------------------------------------------------ hero */
  var hero = doc.querySelector('.hero');
  var stage = doc.querySelector('.stage');
  var canvas = doc.querySelector('canvas.scene');   // versions 1: the drawn scene
  var video = doc.querySelector('video.scene');     // version 3: a real video, scrubbed by scroll
  var bandEls = [].slice.call(doc.querySelectorAll('.band'));
  var bands = bandEls.map(function (el, i) {
    return { el: el, a: +el.getAttribute('data-a'), b: +el.getAttribute('data-b'),
      ramp: +(el.getAttribute('data-ramp') || 0), op: -1, k: -1, on: null,
      first: i === 0, last: i === bandEls.length - 1 };
  });

  /* Split display lines into word spans once. Real spaces stay between the spans,
     so the sentence still reads as one string to crawlers and screen readers. */
  [].forEach.call(doc.querySelectorAll('.split'), function (el) {
    var band = el.closest ? el.closest('.band') : null;
    var spread = band ? +(band.getAttribute('data-spread') || 0.5) : 0.5;
    var words = el.textContent.replace(/\s+/g, ' ').trim().split(' ');
    el.textContent = '';
    words.forEach(function (w, i) {
      var s = doc.createElement('span');
      s.className = /[.!?]$/.test(w) ? 'w em' : 'w';
      s.textContent = w;
      s.style.setProperty('--th', (i / words.length * spread).toFixed(3));
      el.appendChild(s);
      if (i < words.length - 1) {
        el.appendChild(doc.createTextNode(' '));
        if (/[.!?]$/.test(w)) el.appendChild(doc.createElement('br'));   // one sentence per line
      }
    });
  });

  function heroProgress() {
    var range = hero.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
  }

  /* Captions: each band owns a range of scroll progress. Writes are delta-locked. */
  function updateCaptions(p, loadK) {
    for (var i = 0; i < bands.length; i++) {
      var B = bands[i], a = B.a, b = B.b, f = Math.min(0.02, (b - a) / 3);
      var o = (B.first ? 1 : smoothstep(p, a, a + f)) * (B.last ? 1 : 1 - smoothstep(p, b - f, b));
      var k = clamp((p - a) / (B.ramp || Math.min(0.025, (b - a) * 0.35)), 0, 1);
      if (B.first) k = Math.max(k, loadK);   // the opening beat assembles on load, then scroll takes over
      if (Math.abs(o - B.op) > 0.004 || ((o === 0 || o === 1) && o !== B.op)) {
        B.op = o; B.el.style.opacity = o.toFixed(3);
      }
      var on = o > 0.01;
      if (on !== B.on) { B.on = on; B.el.classList.toggle('on', on); }
      if (Math.abs(k - B.k) > 0.008 || ((k === 0 || k === 1) && k !== B.k)) {
        B.k = k; B.el.style.setProperty('--k', k.toFixed(3));
      }
    }
  }

  /* ---- the scene. Plate space is 1920 x 1072. Sprites are light-only and drawn additively. ---- */
  var W = 1920, H = 1072;
  var DROP = { x: 900, y: 0, ax: 1342, bottom: 582 };          // sprite origin, anchor x, bottom of the drop
  var REFL = { x: 1180, y: 780 };
  var FIRE = { x: 720, y: 60, w: 1200, h: 1012, cx: 1357, cy: 745, base: 772 };
  var START_DY = -150, LAND_DY = 163;                           // the drop's bottom meets the floor at y 745
  var T_HOVER = 0.20, T_LAND = 0.50, T_FIRE0 = 0.52, T_FIRE1 = 0.80;

  var IMG = {}, ctx = null, fxCanvas = null, fx = null;
  var sceneReady = false, heroInit = false;

  var SPARKS = (function () {
    var r = rng(7), out = [];
    for (var i = 0; i < 18; i++) {
      var ang = -Math.PI * (0.12 + 0.76 * r());
      out.push({ c: Math.cos(ang), s: Math.sin(ang), v: 200 + 420 * r(), sz: 1.6 + 2.2 * r(), d: r() * 0.3 });
    }
    return out;
  })();
  var EMBERS = (function () {
    var r = rng(21), out = [];
    for (var i = 0; i < 14; i++) {
      out.push({ x: (r() - 0.5) * 560, per: 3.2 + 3.4 * r(), ph: r(), rise: 240 + 260 * r(), sw: 12 + 22 * r(), sz: 1.3 + 1.6 * r(), sd: r() * 6.28 });
    }
    return out;
  })();

  function drawDrop(dy, sx, sy, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(DROP.ax, DROP.bottom + dy); ctx.scale(sx, sy); ctx.translate(-DROP.ax, -(DROP.bottom + dy));
    ctx.drawImage(IMG.drop, DROP.x, DROP.y + dy);
    ctx.restore();
  }

  function drawScene(p, t) {
    var z = 1 + 0.05 * p, i;                                    // a slow push in
    ctx.setTransform(z, 0, 0, z, -(z - 1) * 1344, -(z - 1) * 700);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.drawImage(IMG.clean, 0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    /* the drop hovers, then falls with gravity */
    var e = clamp((p - T_HOVER) / (T_LAND - T_HOVER), 0, 1), g = e * e;
    var dy = START_DY + (LAND_DY - START_DY) * g + (1 - e) * Math.sin(t * 1.7) * 5;
    var sq = clamp((p - T_LAND) / 0.045, 0, 1);                 // squash on impact
    if (sq < 0.997) {
      var sy = (1 + 0.2 * g) * (1 - 0.8 * sq), sx = (1 - 0.06 * g) * (1 + 0.9 * sq);
      if (e > 0.05 && sq === 0) { drawDrop(dy - 68 * e, sx, sy, 0.11 * e); drawDrop(dy - 34 * e, sx, sy, 0.22 * e); }
      drawDrop(dy, sx, sy, 1 - sq);
    }

    /* its reflection grows as it nears the floor */
    var ra = (0.35 + 0.65 * g) * (1 - clamp((p - T_LAND) / 0.06, 0, 1));
    if (ra > 0.003) {
      ctx.globalAlpha = Math.min(1, ra);
      ctx.drawImage(IMG.refl, REFL.x, REFL.y);
      if (g > 0.5) { ctx.globalAlpha = (g - 0.5) * ra; ctx.drawImage(IMG.refl, REFL.x, REFL.y); }
    }

    /* impact: a flash, a ring running across the floor, sparks */
    var fl = clamp((p - (T_LAND - 0.005)) / 0.075, 0, 1);
    if (fl > 0 && fl < 1) {
      var fa = Math.sin(Math.PI * fl) * 0.9, fr = 140 + 620 * fl;
      var gr = ctx.createRadialGradient(FIRE.cx, 738, 0, FIRE.cx, 738, fr);
      gr.addColorStop(0, 'rgba(255,236,214,' + fa.toFixed(3) + ')');
      gr.addColorStop(0.25, 'rgba(255,120,40,' + (fa * 0.6).toFixed(3) + ')');
      gr.addColorStop(1, 'rgba(255,60,0,0)');
      ctx.globalAlpha = 1; ctx.fillStyle = gr;
      ctx.fillRect(FIRE.cx - fr, 738 - fr, fr * 2, fr * 2);
      ctx.globalAlpha = (1 - fl) * 0.8; ctx.strokeStyle = '#ffb27a'; ctx.lineWidth = 5 * (1 - fl) + 1;
      ctx.beginPath(); ctx.ellipse(FIRE.cx, 750, 30 + 330 * fl, (30 + 330 * fl) * 0.17, 0, 0, Math.PI * 2); ctx.stroke();
    }
    var q = (p - T_LAND) / 0.17;
    if (q > 0 && q < 1) {
      ctx.fillStyle = '#ffa257';
      for (i = 0; i < SPARKS.length; i++) {
        var S = SPARKS[i], u = clamp((q - S.d) / (1 - S.d), 0, 1);
        if (u <= 0 || u >= 1) continue;
        ctx.globalAlpha = Math.pow(1 - u, 1.4);
        ctx.beginPath(); ctx.arc(FIRE.cx + S.c * S.v * u, 742 + S.s * S.v * u + 420 * u * u, S.sz * (1 - 0.5 * u), 0, 6.283); ctx.fill();
      }
    }

    /* the fire spreads outward from the impact point, then settles and keeps breathing */
    var fs = clamp((p - T_FIRE0) / (T_FIRE1 - T_FIRE0), 0, 1);
    if (fs > 0) {
      var inten = clamp(fs * 1.8, 0, 1), src = IMG.fire;
      var n1 = noise(t), n2 = noise(t * 1.37 + 5.1), n3 = noise(t * 0.83 + 2.2);
      if (fs < 1) {
        var r = 70 + 1500 * (1 - Math.pow(1 - fs, 3)), mx = FIRE.cx - FIRE.x, my = FIRE.cy - FIRE.y;
        fx.globalCompositeOperation = 'copy'; fx.globalAlpha = 1;
        fx.drawImage(IMG.fire, 0, 0);
        fx.globalCompositeOperation = 'destination-in';
        var mg = fx.createRadialGradient(mx, my, r * 0.45, mx, my, r);
        mg.addColorStop(0, 'rgba(0,0,0,1)'); mg.addColorStop(1, 'rgba(0,0,0,0)');
        fx.fillStyle = mg; fx.fillRect(0, 0, FIRE.w, FIRE.h);
        src = fxCanvas;
      }
      var grow = 0.55 + 0.45 * (1 - Math.pow(1 - clamp(fs * 1.35, 0, 1), 2));
      ctx.save();
      ctx.translate(FIRE.cx, FIRE.base); ctx.scale(1, grow); ctx.translate(-FIRE.cx, -FIRE.base);
      ctx.globalAlpha = inten * (0.92 + 0.08 * n1);
      ctx.drawImage(src, FIRE.x, FIRE.y);
      ctx.translate(FIRE.cx, FIRE.base); ctx.scale(1 + 0.01 * n3, 1 + 0.045 * n2); ctx.translate(-FIRE.cx, -FIRE.base);
      ctx.globalAlpha = inten * 0.12 * (0.5 + 0.5 * n2);
      ctx.drawImage(src, FIRE.x, FIRE.y);
      ctx.restore();

      ctx.fillStyle = '#ff9a4f';
      for (i = 0; i < EMBERS.length; i++) {
        var E = EMBERS[i], v = (t / E.per + E.ph) % 1;
        ctx.globalAlpha = inten * Math.sin(Math.PI * v) * 0.75;
        ctx.beginPath(); ctx.arc(FIRE.cx + E.x + Math.sin(v * 6 + E.sd) * E.sw, 730 - v * E.rise, E.sz, 0, 6.283); ctx.fill();
      }
    }
  }

  /* ---- the loop: frame-rate independent easing; it stops when the hero leaves the screen ---- */
  var target = 0, shown = 0, rafId = null, lastTick = 0, lastDraw = 0, tAmb = 0;
  var scrubOn = false, heroOnScreen = true, loadAt = 0;
  var usesP = hero.classList.contains('hero--team'), lastP = -1;   // version 2 drives its portraits from --p in CSS
  function writeP(v) { lastP = v; stage.style.setProperty('--p', v.toFixed(4)); }

  function tick(now) {
    rafId = null;
    var dt = Math.min(100, now - (lastTick || now));
    lastTick = now;
    shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
    var conv = Math.abs(target - shown) < 0.0005;
    if (conv) shown = target;
    tAmb += dt / 1000;
    var lk = clamp((now - loadAt) / 900, 0, 1);
    lk = 1 - Math.pow(1 - lk, 3);
    updateCaptions(shown, lk);
    if (usesP && (Math.abs(shown - lastP) > 0.0012 || ((shown === 0 || shown === 1) && shown !== lastP))) writeP(shown);
    if (videoReady) requestSeek(shown * video.duration);
    if (sceneReady && (!conv || now - lastDraw > 32)) { drawScene(shown, tAmb); lastDraw = now; }   // ~30fps while resting
    if (scrubOn && heroOnScreen && !doc.hidden && (sceneReady || !conv || lk < 1)) rafId = requestAnimationFrame(tick);
    else lastTick = 0;
  }
  function kick() { if (rafId === null && scrubOn && heroOnScreen && !doc.hidden) rafId = requestAnimationFrame(tick); }
  function onScroll() { target = heroProgress(); kick(); }

  /* ---- the video hero. Seeks are locked so they never overlap, and the file is fetched whole as a Blob,
         because many hosts do not support partial downloads and seeking would stick at zero. ---- */
  var videoReady = false, seekBusy = false, pendingTime = null;
  function requestSeek(t) {
    if (!videoReady || !video.duration) return;
    if (seekBusy) { pendingTime = t; return; }               // collapse to the newest target
    seekBusy = true;
    video.currentTime = Math.max(0, Math.min(t, video.duration - 0.04));
  }
  function loadHeroVideo() {
    video.addEventListener('seeked', function () {
      seekBusy = false;
      if (pendingTime !== null) { var t = pendingTime; pendingTime = null; requestSeek(t); }   // exactly one follow-up
    });
    video.addEventListener('error', function () {             // the way out of a deadlock, and of a dead video
      seekBusy = false; pendingTime = null;
      if (videoReady) { videoReady = false; stage.classList.remove('scene-ready'); }
    });
    var started = false;
    function start() {
      if (started) return;
      started = true;
      var ctrl = ('AbortController' in window) ? new AbortController() : null;
      var watchdog = setTimeout(function () { if (ctrl) ctrl.abort(); }, 25000);
      var init = { priority: 'low' };
      if (ctrl) init.signal = ctrl.signal;
      fetch(ASSETS + video.getAttribute('data-src'), init)
        .then(function (res) { if (!res.ok) throw new Error('video ' + res.status); return res.blob(); })
        .then(function (blob) {
          clearTimeout(watchdog);
          video.addEventListener('canplay', function () {
            videoReady = true;
            requestSeek(shown * video.duration);              // land on the current scroll position
            stage.classList.add('scene-ready');
          }, { once: true });
          video.src = URL.createObjectURL(blob);
          video.load();
        })
        .catch(function () { clearTimeout(watchdog); });      // complete without the video: poster plus captions
    }
    var poster = new Image();                                 // the poster wins the bandwidth race
    poster.onload = start; poster.onerror = start;
    poster.src = ASSETS + video.getAttribute('data-poster');
    setTimeout(start, 4000);
  }

  function initHeroOnce() {
    if (heroInit) return;
    heroInit = true;
    if (video) { loadHeroVideo(); return; }
    if (!canvas) return;                                   // no canvas scene on this page
    var names = { clean: 'hero-clean.jpg', drop: 'hero-drop-light.jpg', refl: 'hero-reflect-light.jpg', fire: 'hero-fire-light.jpg' };
    var keys = Object.keys(names), left = keys.length, failed = false;
    keys.forEach(function (key) {
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () {
        IMG[key] = im;
        if (--left === 0 && !failed) {
          ctx = canvas.getContext('2d', { alpha: false });
          fxCanvas = doc.createElement('canvas'); fxCanvas.width = FIRE.w; fxCanvas.height = FIRE.h;
          fx = fxCanvas.getContext('2d');
          if (!ctx || !fx) return;                         // the poster carries the page
          sceneReady = true;
          drawScene(shown, tAmb);
          stage.classList.add('scene-ready');
          kick();
        }
      };
      im.onerror = function () { failed = true; };          // complete without the scene: poster plus captions
      im.src = ASSETS + names[key];
    });
  }

  function enableScrub() {
    if (scrubOn) return;
    scrubOn = true;
    root.classList.add('scrub'); root.classList.remove('static');
    initHeroOnce();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    bands.forEach(function (B) { B.op = -1; B.k = -1; B.on = null; });   // stale pinned styles get rewritten
    unpinFinalStates();
    target = shown = heroProgress();
    if (usesP) writeP(shown);
    updateCaptions(shown, 0);
    kick();
  }
  function disableScrub() {
    root.classList.remove('scrub'); root.classList.add('static');
    if (!scrubOn) return;
    scrubOn = false;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    lastTick = 0;
    if (usesP) { stage.style.removeProperty('--p'); lastP = -1; }
    bands.forEach(function (B) {                            // hand the captions back to the static layout
      B.el.style.opacity = ''; B.el.style.removeProperty('--k'); B.el.classList.remove('on');
      B.op = -1; B.k = -1; B.on = null;
    });
  }
  function applyHeroMode() {
    if (GATES.some(function (q) { return window.matchMedia(q).matches; })) disableScrub();
    else enableScrub();
  }

  /* keyboard users: focusing a link inside a hidden caption scrolls its beat into view */
  bandEls.forEach(function (el, i) {
    el.addEventListener('focusin', function () {
      if (!scrubOn) return;
      var B = bands[i], mid = B.last ? 0.92 : (B.a + B.b) / 2;
      if (Math.abs(heroProgress() - mid) > (B.b - B.a) / 2) {
        window.scrollTo(0, hero.offsetTop + (hero.offsetHeight - window.innerHeight) * mid);
      }
    });
  });

  /* ------------------------------------------------------------ page level */
  var nav = doc.querySelector('.nav');
  var gauge = doc.querySelector('.gauge');
  var gaugeRead = doc.querySelector('.gauge__read');
  var gaugeLabel = gaugeRead ? gaugeRead.getAttribute('data-label') : '';
  var halves = doc.querySelector('.halves');
  var fuse = doc.querySelector('.fuse');
  var lastFuel = -1, lastFuse = -1, lastLabel = '', lastLabelAt = 0, labelTimer = 0, navSolid = null, pageTicking = false, pinned = false;

  function updateLabel(text, now) {
    if (text === lastLabel) return;                          // only on change
    if (now - lastLabelAt < 100) {                           // ~10Hz, with a trailing write so it never rests stale
      clearTimeout(labelTimer);
      labelTimer = setTimeout(function () { updateLabel(text, performance.now()); }, 110);
      return;
    }
    lastLabel = text; lastLabelAt = now;
    gaugeRead.textContent = text;
  }
  function pageUpdate(now) {
    pageTicking = false;
    var max = root.scrollHeight - window.innerHeight;
    var f = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    if (gauge && (Math.abs(f - lastFuel) > 0.002 || ((f === 0 || f === 1) && f !== lastFuel))) {
      lastFuel = f; gauge.style.setProperty('--fuel', f.toFixed(4));
    }
    if (gaugeRead) updateLabel(gaugeLabel + ' ' + Math.round(f * 100) + '%', now || performance.now());
    var solid = scrubOn ? hero.getBoundingClientRect().bottom < 90 : window.scrollY > 24;   // the static hero is a normal page, so the bar firms up at once
    if (solid !== navSolid) { navSolid = solid; nav.classList.toggle('is-solid', solid); }
    if (fuse && halves && !pinned) {
      var rc = halves.getBoundingClientRect();
      var k = rc.height > 0 ? clamp((window.innerHeight * 0.72 - rc.top) / rc.height, 0, 1) : 0;
      if (Math.abs(k - lastFuse) > 0.004 || ((k === 0 || k === 1) && k !== lastFuse)) {
        lastFuse = k; fuse.style.setProperty('--fuse', k.toFixed(3));
      }
    }
  }
  function onPageScroll() { if (!pageTicking) { pageTicking = true; requestAnimationFrame(pageUpdate); } }
  window.addEventListener('scroll', onPageScroll, { passive: true });
  window.addEventListener('resize', onPageScroll, { passive: true });

  /* the menu on small screens */
  var toggle = doc.querySelector('.nav__toggle');
  var links = doc.querySelector('.nav__links');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    links.addEventListener('click', function (ev) { if (ev.target.closest && ev.target.closest('a')) setMenu(false); });
    doc.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    doc.addEventListener('click', function (ev) {                    // a tap outside closes it
      if (nav.classList.contains('is-open') && !nav.contains(ev.target)) setMenu(false);
    });
    listen(window.matchMedia('(min-width: 1041px)'), function (ev) { if (ev.matches) setMenu(false); });
  }

  /* entrances, and loops that only run on screen */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        revealIO.unobserve(el);
        setTimeout(function () { el.classList.add('done'); }, 1500 + el.children.length * 90);   // retire the stagger
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    [].forEach.call(doc.querySelectorAll('[data-reveal]'), function (el) {
      [].forEach.call(el.children, function (c, i) { c.style.setProperty('--i', i); });
      revealIO.observe(el);
    });
    var liveIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('live', en.isIntersecting); });
    });
    [].forEach.call(doc.querySelectorAll('.sec, .hero'), function (el) { liveIO.observe(el); });
    new IntersectionObserver(function (entries) {
      heroOnScreen = entries[0].isIntersecting;
      if (heroOnScreen) kick();
    }).observe(hero);

    /* the CRM form's own resize script loads only when the form is near */
    var contact = doc.getElementById('contact');
    if (contact) {
      var formIO = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        formIO.disconnect();
        var s = doc.createElement('script');
        s.src = 'https://link.msgsndr.com/js/form_embed.js'; s.async = true;
        doc.body.appendChild(s);
      }, { rootMargin: '900px 0px' });
      formIO.observe(contact);
    }
  } else {
    [].forEach.call(doc.querySelectorAll('[data-reveal]'), function (el) { el.classList.add('in', 'done'); });
  }
  doc.addEventListener('visibilitychange', function () {
    doc.body.classList.toggle('paused', doc.hidden);
    if (!doc.hidden) kick();
  });

  /* ---------------------------------------- the interactive moment: hold to ignite */
  var how = doc.querySelector('.how');
  var btn = doc.querySelector('.ignite');
  var status = doc.querySelector('.ignite__status');
  var hold = 0, holding = false, lit = false, autoLit = false, holdRaf = null, holdLast = 0;

  function setLit(on) {
    lit = on;
    how.classList.toggle('lit', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    var label = btn.querySelector('.ignite__label');
    label.textContent = on ? btn.getAttribute('data-done') : btn.getAttribute('data-idle');
    hold = on ? 1 : 0;
    btn.style.setProperty('--hold', String(hold));
  }
  function ignite() { holding = false; setLit(true); autoLit = false; if (status) status.textContent = btn.getAttribute('data-done'); }
  function holdTick(now) {
    var dt = Math.min(60, now - (holdLast || now));
    holdLast = now;
    hold = clamp(hold + (holding ? dt / 1100 : -dt / 700), 0, 1);   // builds while held, eases back if released early
    btn.style.setProperty('--hold', hold.toFixed(3));
    if (hold >= 1) { holdRaf = null; ignite(); return; }
    if (hold <= 0 && !holding) { holdRaf = null; holdLast = 0; return; }
    holdRaf = requestAnimationFrame(holdTick);
  }
  function startHold() {
    if (lit) return;
    if (reduceMQ.matches) { ignite(); return; }               // reduced motion: the final state, no holding
    holding = true;
    if (holdRaf === null) { holdLast = 0; holdRaf = requestAnimationFrame(holdTick); }
  }
  function endHold() { holding = false; }
  if (btn && how) {
    btn.addEventListener('pointerdown', function (ev) {
      if (ev.button) return;
      if (btn.setPointerCapture) { try { btn.setPointerCapture(ev.pointerId); } catch (err) { /* older engines */ } }
      startHold();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (name) { btn.addEventListener(name, endHold); });
    btn.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (!lit) ignite(); }
    });
    btn.addEventListener('click', function (ev) { if (ev.detail === 0 && !lit) ignite(); });   // assistive activation
    btn.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });
  }

  /* ------------------------------------- reduced motion, honoured live, both ways */
  function pinToFinalStates() {
    pinned = true;
    if (fuse) { fuse.style.setProperty('--fuse', '1'); lastFuse = 1; }
    if (holdRaf !== null) { cancelAnimationFrame(holdRaf); holdRaf = null; }
    holding = false;
    if (how && btn && !lit) { setLit(true); autoLit = true; }
  }
  function unpinFinalStates() {
    if (!pinned) return;
    pinned = false;
    lastFuse = -1;
    if (how && btn && autoLit) { setLit(false); autoLit = false; }
    onPageScroll();
  }
  listen(reduceMQ, function (ev) {
    if (ev.matches) pinToFinalStates();
    else { unpinFinalStates(); applyHeroMode(); }
  });
  MQLS.forEach(function (m) { listen(m, applyHeroMode); });

  /* ------------------------------------------------------------------ start */
  loadAt = performance.now() + 250;
  if (reduceMQ.matches) pinToFinalStates();
  applyHeroMode();
  pageUpdate(performance.now());
})();
