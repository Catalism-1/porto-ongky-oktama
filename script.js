(function () {
  'use strict';

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // =============================================
  // THEME TOGGLE
  // =============================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setTheme('dark');
  } else if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) setTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // =============================================
  // PROGRESS BAR
  // =============================================
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // =============================================
  // BACK TO TOP
  // =============================================
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =============================================
  // CUSTOM CURSOR (desktop only)
  // =============================================
  if (!isTouch) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    }, { passive: true });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = 'a, button, .portfolio-card, .kelebihan-card, .faq-question, input, textarea, .back-to-top, .kontak-link';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  }

  // =============================================
  // NAVBAR SCROLL EFFECT
  // =============================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // =============================================
  // MOBILE NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (links.style.display === 'flex') {
      links.style.display = 'none';
    } else {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      links.style.display = 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '70px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = isDark ? '#1a2332' : '#fff';
      links.style.padding = '20px 40px';
      links.style.borderBottom = isDark ? '1px solid #334155' : '1px solid #e8e4de';
      links.style.boxShadow = '0 8px 24px rgba(43,55,79,0.1)';
      links.style.zIndex = '999';
    }
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const links = document.querySelector('.nav-links');
        links.style.display = 'none';
      }
    });
  });

  // =============================================
  // FAQ TOGGLE
  // =============================================
  window.toggleFaq = function (btn) {
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
  };

  // =============================================
  // VIDEO MODAL
  // =============================================
  const videoData = {
    video1: { title: 'Short Form #1', url: '' },
    video2: { title: 'Short Form #2', url: '' },
    video3: { title: 'Short Form #3', url: '' },
    video4: { title: 'Long Form #1', url: '' },
  };

  window.openModal = function (id) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    const data = videoData[id];

    if (data && data.url) {
      content.innerHTML = '<iframe src="' + data.url + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%;height:100%;"></iframe>';
    } else {
      content.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5)"><div style="font-size:48px;margin-bottom:16px">▶</div><p style="letter-spacing:0.05em;font-size:13px">' + (data ? data.title : 'Video') + '</p><p style="font-size:11px;margin-top:8px;opacity:0.5">Tambahkan URL video di script.js</p></div>';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    overlay.classList.remove('active');
    content.innerHTML = '';
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // =============================================
  // FORM SUBMIT
  // =============================================
  window.submitForm = function (e) {
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
  };

  // =============================================
  // SCROLL FADE-IN ANIMATIONS (enhanced)
  // =============================================
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.kelebihan-card, .portfolio-card, .faq-item, .tentang-card, .kontak-left, .kontak-right, .stat-item'
  ).forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
  });

  // =============================================
  // PARALLAX EFFECT
  // =============================================
  const heroImage = document.querySelector('.hero-img-wrapper');
  const heroText = document.querySelector('.hero-text');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (heroImage && scrolled < window.innerHeight) {
          heroImage.style.transform = 'translateY(' + scrolled * 0.08 + 'px)';
        }
        if (heroText && scrolled < window.innerHeight) {
          heroText.style.transform = 'translateY(' + scrolled * -0.04 + 'px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // =============================================
  // STATS COUNTER ANIMATION
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, interval);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNumbers.forEach(num => {
          animateCounter(num, parseInt(num.getAttribute('data-target'), 10));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  // =============================================
  // 3D TILT ON CARDS
  // =============================================
  if (!isTouch) {
    document.querySelectorAll('.portfolio-card, .kelebihan-card, .tentang-card').forEach(card => {
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // =============================================
  // MAGNETIC BUTTONS
  // =============================================
  if (!isTouch) {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav').forEach(btn => {
      btn.classList.add('magnetic-btn');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + x * 0.25 + 'px, ' + y * 0.25 + 'px)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // =============================================
  // PARTICLE SYSTEM
  // =============================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas && !isTouch) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 35;
    let animId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.25 + 0.05
      };
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    function connectParticles(ctx, particles, dist) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(178,145,112,' + (0.04 * (1 - d / dist)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(43,55,79,' + p.opacity + ')';
        ctx.fill();
      });

      connectParticles(ctx, particles, 130);
      animId = requestAnimationFrame(animate);
    }
    animate();
  }

  // =============================================
  // SMOOTH ACTIVE NAV HIGHLIGHT
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? '' : '';
    });
  }, { passive: true });

  // =============================================
  // HERO TEXT TYPING / REVEAL
  // =============================================
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  const heroLabel = document.querySelector('.hero-label');
  if (heroLabel) {
    heroLabel.style.opacity = '0';
    heroLabel.style.transform = 'translateX(-16px)';
    heroLabel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroLabel.style.opacity = '1';
      heroLabel.style.transform = 'translateX(0)';
    }, 400);
  }

  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    heroSub.style.opacity = '0';
    heroSub.style.transform = 'translateY(10px)';
    heroSub.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroSub.style.opacity = '1';
      heroSub.style.transform = 'translateY(0)';
    }, 600);
  }

  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    heroDesc.style.opacity = '0';
    heroDesc.style.transform = 'translateY(10px)';
    heroDesc.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroDesc.style.opacity = '1';
      heroDesc.style.transform = 'translateY(0)';
    }, 750);
  }

  const heroBtns = document.querySelector('.hero-btns');
  if (heroBtns) {
    heroBtns.style.opacity = '0';
    heroBtns.style.transform = 'translateY(10px)';
    heroBtns.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroBtns.style.opacity = '1';
      heroBtns.style.transform = 'translateY(0)';
    }, 900);
  }

  const heroImgWrapper = document.querySelector('.hero-img-wrapper');
  if (heroImgWrapper) {
    heroImgWrapper.style.opacity = '0';
    heroImgWrapper.style.transform = 'scale(0.92)';
    heroImgWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroImgWrapper.style.opacity = '1';
      heroImgWrapper.style.transform = 'scale(1)';
    }, 350);
  }

})();
