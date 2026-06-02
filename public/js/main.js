/* ============================================================
   AERO-RIEL — main.js
   Slideshow · Reveal · Charts · Lightbox · Parallax · Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal ──────────────────────────────────────────
  const rvObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.querySelectorAll('.rv')];
      const delay = siblings.indexOf(e.target) * 0.09;
      e.target.style.transitionDelay = delay + 's';
      e.target.classList.add('in');
      rvObs.unobserve(e.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));


  // ── Hero Slideshow ─────────────────────────────────────────
  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('.hdot');
  const counter = document.getElementById('heroCount');
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('on');
    if (counter) counter.textContent = String(cur + 1).padStart(2, '0');
  }

  timer = setInterval(() => goTo(cur + 1), 6000);

  dots.forEach(d => {
    d.addEventListener('click', () => {
      clearInterval(timer);
      goTo(+d.dataset.i);
      timer = setInterval(() => goTo(cur + 1), 6000);
    });
  });


  // ── Carousel Gallery ───────────────────────────────────────
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselThumbs = document.querySelectorAll('.carousel-thumbnails .thumb');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const carouselCurrent = document.getElementById('carouselCurrent');
  const carouselLabel = document.getElementById('carouselLabel');
  let carouselIdx = 0;
  let carouselAutoTimer;

  function updateCarousel(n) {
    if (carouselSlides.length === 0) return;
    carouselSlides[carouselIdx].classList.remove('active');
    carouselThumbs[carouselIdx].classList.remove('active');
    carouselIdx = (n + carouselSlides.length) % carouselSlides.length;
    carouselSlides[carouselIdx].classList.add('active');
    carouselThumbs[carouselIdx].classList.add('active');
    if (carouselCurrent) carouselCurrent.textContent = carouselIdx + 1;
    if (carouselLabel && carouselSlides[carouselIdx].dataset.label) {
      carouselLabel.textContent = carouselSlides[carouselIdx].dataset.label;
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(carouselIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(carouselIdx + 1));

  carouselThumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateCarousel(i));
  });

  // Auto-advance carousel every 8 seconds
  if (carouselSlides.length > 0) {
    carouselAutoTimer = setInterval(() => updateCarousel(carouselIdx + 1), 8000);
    [prevBtn, nextBtn, ...carouselThumbs].forEach(el => {
      if (el) el.addEventListener('click', () => {
        clearInterval(carouselAutoTimer);
        carouselAutoTimer = setInterval(() => updateCarousel(carouselIdx + 1), 8000);
      });
    });
  }


  // ── Navbar scroll ──────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('dark', window.scrollY > 80);
  }, { passive: true });


  // ── Chart bar animation ────────────────────────────────────
  const chartEl = document.getElementById('chart');
  if (chartEl) {
    const chartObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.cb').forEach((b, i) => {
          setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 140);
        });
        chartObs.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    chartObs.observe(chartEl);
  }


  // ── Team Cards hover effect ────────────────────────────────
  document.querySelectorAll('.tcard').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });


  // ── Timeline interactive hover ─────────────────────────────
  document.querySelectorAll('.ti').forEach((item, idx) => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.tim .tid').style.transform = 'scale(1.3)';
      this.querySelector('.tic').style.boxShadow = '0 12px 48px rgba(5,18,10,.15)';
    });
    item.addEventListener('mouseleave', function() {
      this.querySelector('.tim .tid').style.transform = 'scale(1)';
      this.querySelector('.tic').style.boxShadow = '0 4px 24px rgba(5,18,10,.07)';
    });
  });


  // ── Lightbox ───────────────────────────────────────────────
  const lb    = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');

  if (lb && lbImg) {
    document.querySelectorAll('.gi img, .qcard img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lb.classList.add('open');
      });
    });

    document.getElementById('lbClose')
      .addEventListener('click', () => lb.classList.remove('open'));

    lb.addEventListener('click', e => {
      if (e.target === lb) lb.classList.remove('open');
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lb.classList.remove('open');
    });
  }


  // ── Parallax on fullbleed images ───────────────────────────
  const fbImgs = document.querySelectorAll('.fb-img');
  if (fbImgs.length) {
    window.addEventListener('scroll', () => {
      fbImgs.forEach(el => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const pct = rect.top / window.innerHeight;
          el.style.transform = `scale(1.04) translateY(${pct * 30}px)`;
        }
      });
    }, { passive: true });
  }


  // ── Smooth scroll ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) window.scrollTo({ top: target.offsetTop - 74, behavior: 'smooth' });
    });
  });


  // ── Dynamic quijote section ────────────────────────────────
  // Llama a /api/renders para cargar imágenes del quijote dinámicamente
  fetch('/api/renders')
    .then(r => r.json())
    .then(data => {
      const grid = document.getElementById('quijoteGrid');
      if (!grid) return;

      if (data.quijote && data.quijote.length > 0) {
        // Hay imágenes → limpiar placeholder y mostrar cards
        grid.innerHTML = '';
        data.quijote.forEach((img, i) => {
          const card = document.createElement('div');
          card.className = 'qcard rv';
          card.innerHTML = `
            <img src="${img.url}" alt="Quijote ${i + 1}" loading="lazy">
            <div class="qcard-label">Quijote — imagen ${i + 1}</div>
          `;
          grid.appendChild(card);
        });
        // Re-observar los nuevos elementos
        grid.querySelectorAll('.rv').forEach(el => rvObs.observe(el));
        // Registrar lightbox en las nuevas imágenes
        grid.querySelectorAll('img').forEach(img => {
          img.addEventListener('click', () => {
            if (lbImg && lb) { lbImg.src = img.src; lb.classList.add('open'); }
          });
        });
      }
      // Si no hay imágenes, el placeholder HTML ya está visible
    })
    .catch(() => { /* Silencioso si la API falla */ });

});
