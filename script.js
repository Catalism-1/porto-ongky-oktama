// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// MOBILE NAV TOGGLE
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const btnNav = document.querySelector('.btn-nav');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  if (links.style.display === 'flex') {
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = '#fff';
    links.style.padding = '20px 40px';
    links.style.borderBottom = '1px solid #e8e4de';
    links.style.boxShadow = '0 8px 24px rgba(43,55,79,0.1)';
    links.style.zIndex = '999';
  }
});

// FAQ TOGGLE
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('active');

  document.querySelectorAll('.faq-item.active').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.faq-answer').classList.remove('open');
  });

  if (!isOpen) {
    item.classList.add('active');
    answer.classList.add('open');
  }
}

// VIDEO MODAL
const videoData = {
  video1: { title: 'Short Form #1', url: '' },
  video2: { title: 'Short Form #2', url: '' },
  video3: { title: 'Short Form #3', url: '' },
  video4: { title: 'Long Form #1', url: '' },
};

function openModal(id) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const data = videoData[id];

  if (data && data.url) {
    content.innerHTML = `<iframe src="${data.url}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;"></iframe>`;
  } else {
    content.innerHTML = `<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5)">
      <div style="font-size:48px;margin-bottom:16px">▶</div>
      <p style="letter-spacing:0.05em;font-size:13px">${data ? data.title : 'Video'}</p>
      <p style="font-size:11px;margin-top:8px;opacity:0.5">Tambahkan URL video di script.js</p>
    </div>`;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  overlay.classList.remove('active');
  content.innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// FORM SUBMIT
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'TERKIRIM ✓';
  btn.style.background = '#b29170';
  btn.style.borderColor = '#b29170';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// SCROLL FADE-IN ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.kelebihan-card, .portfolio-card, .faq-item, .tentang-card, .kontak-left, .kontak-right'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// SMOOTH ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--navy)' : '';
  });
});

// HERO TYPING CURSOR BLINK (purely CSS-driven via the dot)
// Already handled by CSS animation on .accent-text
