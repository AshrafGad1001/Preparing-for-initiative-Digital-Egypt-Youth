/* ═══════════════════════════════════════════
   ASHRAF GAD PORTFOLIO — main.js
═══════════════════════════════════════════ */

/* ─── NAV: Scroll Effect + Active Link ─── */
const header    = document.getElementById('header');
const navLinks  = document.querySelectorAll('.nav__link');
const sections  = document.querySelectorAll('section[id]');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  // Sticky glass header
  header.classList.toggle('scrolled', window.scrollY > 30);

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}, { passive: true });

/* ─── NAV: Hamburger Toggle ─── */
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
  }
});

/* ─── REVEAL ON SCROLL (IntersectionObserver) ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── COUNTER ANIMATION ─── */
const statNums = document.querySelectorAll('.stat__num');

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = target > 100 ? 1800 : 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ─── PROJECT FILTER ─── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const techs = card.dataset.tech || '';
      const show  = filter === 'all' || techs.includes(filter);

      if (show) {
        card.classList.remove('hidden');
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─── SMOOTH NAV ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── HERO TITLE: Subtle Parallax on Mouse Move ─── */
const heroTitle = document.querySelector('.hero__title');
const heroGlow  = document.querySelector('.hero__glow');

if (heroTitle && heroGlow) {
  document.addEventListener('mousemove', (e) => {
    const { innerWidth: W, innerHeight: H } = window;
    const dx = (e.clientX / W - 0.5) * 2;  // -1 to 1
    const dy = (e.clientY / H - 0.5) * 2;

    heroTitle.style.transform = `translate(${dx * 8}px, ${dy * 5}px)`;
    heroGlow.style.transform  = `translateX(calc(-50% + ${dx * 30}px)) translateY(${dy * 20}px)`;
  }, { passive: true });
}

/* ─── EASTER EGG: AG Logo click ─── */
const logo = document.querySelector('.nav__logo');
let clicks = 0;
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;
    if (clicks === 5) {
      clicks = 0;
      showToast('🌟 يا هلا يا Ashraf! Keep building amazing things.');
    }
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #d4af37; color: #0b0d14; padding: .8rem 1.5rem; border-radius: 8px;
    font-size: .9rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
    box-shadow: 0 8px 30px rgba(212,175,55,0.4); opacity: 0;
    transition: opacity .4s, transform .4s; z-index: 9999;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

console.log(`
  ╔═══════════════════════════════════╗
  ║   Ashraf Gad — Portfolio v1.0     ║
  ║   github.com/AshrafGad1001        ║
  ║   Built with HTML · CSS · JS      ║
  ╚═══════════════════════════════════╝
`);
