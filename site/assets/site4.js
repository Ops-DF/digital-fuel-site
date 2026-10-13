/* Digital Fuel, versão 4. Sem dependências. Tudo aqui é melhoria: sem este arquivo a página continua inteira. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  window.__df4 = true;   // avisa o <head> que o script chegou, para as seções não ficarem escondidas

  // menu no celular
  var nav = doc.querySelector('.nav'), toggle = doc.querySelector('.nav__toggle'), links = doc.getElementById('nav-links');
  if (nav && toggle && links) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    links.addEventListener('click', function (ev) { if (ev.target.closest('a')) setOpen(false); });
    doc.addEventListener('click', function (ev) { if (nav.classList.contains('is-open') && !nav.contains(ev.target)) setOpen(false); });
    doc.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  // a barra ganha sombra quando a página sai do topo
  var ticking = false;
  function onScroll() { ticking = false; if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8); }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // as seções sobem quando entram na tela
  var reveals = [].slice.call(doc.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // o vídeo do time toca uma vez, só em tela larga com mouse e sem pedido de movimento reduzido (classe "can-film" vem do <head>)
  var film = doc.querySelector('.film'), video = film && film.querySelector('video');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (video && root.classList.contains('can-film') && !saveData && 'IntersectionObserver' in window) {
    var started = false;
    var play = function () {
      if (started) return;
      started = true;
      film.classList.add('is-ready');
      setTimeout(function () {
        var p = video.play();
        if (p && p.catch) p.catch(function () { film.classList.remove('is-ready'); });
      }, 450);
    };
    video.addEventListener('error', function () { film.classList.remove('is-ready'); });
    video.addEventListener('canplaythrough', function () {
      var seen = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        seen.disconnect();
        play();
      }, { threshold: 0.5 });
      seen.observe(film);
    }, { once: true });
    video.preload = 'auto';
    video.src = video.getAttribute('data-src');
    video.load();
  }

  // o formulário do CRM só carrega o script dele quando o contato está chegando
  var contact = doc.getElementById('contact');
  if (contact) {
    var loadForm = function () {
      var s = doc.createElement('script');
      s.src = 'https://link.msgsndr.com/js/form_embed.js'; s.async = true;
      doc.body.appendChild(s);
    };
    if ('IntersectionObserver' in window) {
      var formIO = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        formIO.disconnect();
        loadForm();
      }, { rootMargin: '900px 0px' });
      formIO.observe(contact);
    } else {
      loadForm();
    }
  }
})();
