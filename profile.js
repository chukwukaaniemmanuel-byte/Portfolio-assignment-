// ── Canvas particle background ──
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({length: 80}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 0.4 + 0.1,
  opacity: Math.random() * 0.5 + 0.2,
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.body.classList.contains('light');
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = isLight
      ? rgba(0,119,170,${p.opacity * 0.5})
      : rgba(0,212,255,${p.opacity});
    ctx.fill();
    p.y -= p.speed;
    if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Scroll animations ──
const animItems = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      // Trigger skill bars
      const bars = e.target.querySelectorAll ? e.target.querySelectorAll('.skill-bar') : [];
      bars.forEach(bar => {
        const card = bar.closest('.skill-card');
        const pct = card.getAttribute('data-bar');
        bar.style.width = pct + '%';
      });
      // Also handle individual skill card
      if (e.target.classList && e.target.classList.contains('skill-card')) {
        const bar = e.target.querySelector('.skill-bar');
        const pct = e.target.getAttribute('data-bar');
        if (bar && pct) setTimeout(() => { bar.style.width = pct + '%'; }, 200);
      }
    }
  });
}, { threshold: 0.15 });

animItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── Scroll-to-top button ──
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 400);
});
function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }

// ── Theme toggle ──
function toggleTheme() {
  document.body.classList.toggle('light');
  const btn = document.getElementById('themeBtn');
  btn.textContent = document.body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
}

// ── Mobile nav ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ── Contact form send (mailto fallback) ──
function sendMessage() {
  const name = document.querySelectorAll('.form-field')[0].value;
  const email = document.querySelectorAll('.form-field')[1].value;
  const subject = document.querySelectorAll('.form-field')[2].value;
  const msg = document.querySelectorAll('.form-field')[3].value;
  if (!name  !email  !msg) { alert('Please fill in all fields.'); return; }
  const mailto = mailto:chukwukaaniemmanuel@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Enquiry')}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + msg)};
  window.location.href = mailto;
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});