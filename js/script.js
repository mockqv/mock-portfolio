/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — Richard Silva  |  script.js
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  lucide.createIcons();

  /* ── CUSTOM CURSOR ───────────────────────────────────────── */
  const cursor        = document.getElementById('cursor');
  const cursorFollow  = document.getElementById('cursor-follower');
  let   mouseX = 0, mouseY = 0;
  let   followX = 0, followY = 0;

  if (cursor && cursorFollow && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // smooth follower
    (function animateFollower() {
      followX += (mouseX - followX) * 0.12;
      followY += (mouseY - followY) * 0.12;
      cursorFollow.style.left = followX + 'px';
      cursorFollow.style.top  = followY + 'px';
      requestAnimationFrame(animateFollower);
    })();

    // expand on hover interactive elements
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '20px';
        cursor.style.height = '20px';
        cursorFollow.style.width  = '60px';
        cursorFollow.style.height = '60px';
        cursorFollow.style.opacity = '0.3';
        cursorFollow.style.borderColor = 'var(--accent3)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '12px';
        cursor.style.height = '12px';
        cursorFollow.style.width  = '36px';
        cursorFollow.style.height = '36px';
        cursorFollow.style.opacity = '0.6';
        cursorFollow.style.borderColor = 'var(--accent)';
      });
    });
  }

  /* ── PARTICLES ───────────────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.4 + 0.05;
        this.life  = 0;
        this.maxLife = Math.random() * 400 + 200;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        const fade = Math.min(this.life / 60, 1, (this.maxLife - this.life) / 60);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${this.alpha * fade})`;
        ctx.fill();
      }
    }

    // create
    for (let i = 0; i < 120; i++) particles.push(new Particle());

    // connect nearby particles
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(168,85,247,${0.06 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ── HERO ENTRANCE ───────────────────────────────────────── */
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroName    = document.querySelector('.hero-name');
  const heroRole    = document.querySelector('.hero-role');
  const heroCtas    = document.querySelector('.hero-ctas');
  const heroStatus  = document.querySelector('.hero-status');
  const heroScroll  = document.querySelector('.hero-scroll-hint');

  function heroIn(el, delay) {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, delay);
  }

  heroIn(heroEyebrow, 200);
  heroIn(heroName,    500);
  heroIn(heroRole,    800);
  heroIn(heroCtas,    1000);
  heroIn(heroStatus,  700);

  if (heroScroll) {
    setTimeout(() => {
      heroScroll.style.transition = 'opacity 1s ease';
      heroScroll.style.opacity    = '1';
    }, 1800);
  }

  /* ── TYPEWRITER ROLE ─────────────────────────────────────── */
  const rolesEl  = document.getElementById('hero-roles');
  const roles_pt = ['Desenvolvedor Full-Stack', 'Engenheiro de Software', 'Arquiteto de APIs'];
  const roles_en = ['Full-Stack Developer', 'Software Engineer', 'API Architect'];
  let roleIdx = 0, charIdx = 0, deleting = false, rolesLang = 'pt';

  function currentRoles() { return rolesLang === 'pt' ? roles_pt : roles_en; }

  function typeRole() {
    if (!rolesEl) return;
    const current = currentRoles()[roleIdx];
    if (!deleting) {
      rolesEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { deleting = true; setTimeout(typeRole, 2200); return; }
    } else {
      rolesEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % currentRoles().length; }
    }
    setTimeout(typeRole, deleting ? 50 : 80);
  }

  setTimeout(typeRole, 1400);

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── NAVBAR SCROLL ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── ACTIVE NAV LINK ─────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ── SMOOTH NAV SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      document.getElementById('mobile-menu').classList.remove('open');
    });
  });

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const menuBtn   = document.getElementById('menu-btn');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn?.addEventListener('click',  () => mobileMenu.classList.add('open'));
  closeMenu?.addEventListener('click', () => mobileMenu.classList.remove('open'));

  /* ── EXPERIENCE TABS ─────────────────────────────────────── */
  const expTabs   = document.querySelectorAll('.exp-tab');
  const expPanels = document.querySelectorAll('.exp-panel');

  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      expTabs.forEach(t  => t.classList.remove('active'));
      expPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.exp-panel[data-panel="${target}"]`)?.classList.add('active');
    });
  });

  /* ── LANGUAGE TOGGLE ─────────────────────────────────────── */
  const translations = {
    pt: {
      navAbout:      'Sobre',
      navExp:        'Experiência',
      navProjects:   'Projetos',
      navSkills:     'Stack',
      navContact:    'Contato',
      heroGreeting:  'Olá, eu sou',
      heroBio:       'Construo soluções digitais escaláveis com foco em <strong>performance</strong> e <strong>experiência do usuário</strong>. Full-Stack com atuação em front, back e infraestrutura.',
      aboutLabel:    'SOBRE MIM',
      aboutTitle:    'Desenvolvedor <span class="dim">movido a</span> café e código',
      aboutText:     'Atuo como <strong>desenvolvedor full-stack</strong> com base sólida construída em formação técnica de excelência em Campinas. Expertise em Algoritmos, Estrutura de Dados, Engenharia de Software e Arquitetura Orientada a Serviços. Em constante evolução cursando Bacharelado em Sistemas de Informação.',
      statYears:     'Anos',
      statYearsLbl:  'de experiência',
      statProjs:     'Projetos',
      statProjsLbl:  'entregues',
      statTechs:     'Tecnologias',
      statTechsLbl:  'no arsenal',
      downloadCV:    'Baixar Currículo',
      expLabel:      'EXPERIÊNCIA',
      expTitle:      'Jornada <span class="dim">profissional</span>',
      projLabel:     'PROJETOS',
      projTitle:     'Trabalhos <span class="dim">selecionados</span>',
      viewGithub:    'Ver todos no GitHub',
      skillsLabel:   'STACK',
      skillsTitle:   'Tecnologias <span class="dim">que uso</span>',
      statsLabel:    'GITHUB',
      statsTitle:    'Atividade <span class="dim">& contribuições</span>',
      contactLabel:  'CONTATO',
      contactTitle1: 'Vamos construir',
      contactTitle2: 'algo',
      contactTitle3: 'incrível',
      contactTitle4: 'juntos',
      contactSub:    'Estou disponível para novos projetos e oportunidades. Me mande uma mensagem.',
      availableText: 'Disponível para projetos freelance e novas oportunidades.',
      footerLeft:    '© 2026 Richard Silva.',
      footerRight:   'Louveira, SP — Brasil',
      tab1:          'Evolucional',
      tab2:          'Freelancer FS',
      tab3:          'Freelancer FE',
      openToWork:    'Aberto a oportunidades',
      location:      'Louveira, SP',
    },
    en: {
      navAbout:      'About',
      navExp:        'Experience',
      navProjects:   'Projects',
      navSkills:     'Stack',
      navContact:    'Contact',
      heroGreeting:  'Hey, I\'m',
      heroBio:       'I build scalable digital solutions focused on <strong>performance</strong> and <strong>user experience</strong>. Full-Stack working on front, back and infrastructure.',
      aboutLabel:    'ABOUT ME',
      aboutTitle:    'Developer <span class="dim">powered by</span> coffee and code',
      aboutText:     'Currently working as a <strong>full-stack developer</strong> with a solid foundation from a renowned technical college in Campinas. Expertise in Algorithms, Data Structures, Software Engineering, and Service-Oriented Architecture. Pursuing a Bachelor\'s in Information Systems.',
      statYears:     'Years',
      statYearsLbl:  'of experience',
      statProjs:     'Projects',
      statProjsLbl:  'delivered',
      statTechs:     'Technologies',
      statTechsLbl:  'in arsenal',
      downloadCV:    'Download Resume',
      expLabel:      'EXPERIENCE',
      expTitle:      'Professional <span class="dim">journey</span>',
      projLabel:     'PROJECTS',
      projTitle:     'Selected <span class="dim">works</span>',
      viewGithub:    'View all on GitHub',
      skillsLabel:   'STACK',
      skillsTitle:   'Technologies <span class="dim">I use</span>',
      statsLabel:    'GITHUB',
      statsTitle:    'Activity <span class="dim">& contributions</span>',
      contactLabel:  'CONTACT',
      contactTitle1: 'Let\'s build',
      contactTitle2: 'something',
      contactTitle3: 'amazing',
      contactTitle4: 'together',
      contactSub:    'Available for new projects and opportunities. Send me a message.',
      availableText: 'Available for freelance projects and new opportunities.',
      footerLeft:    '© 2026 Richard Silva.',
      footerRight:   'Louveira, SP — Brazil',
      tab1:          'Evolucional',
      tab2:          'FS Freelancer',
      tab3:          'FE Freelancer',
      openToWork:    'Open to work',
      location:      'Louveira, SP',
    }
  };

  let currentLang = 'pt';

  function applyLang(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-t]').forEach(el => {
      const key = el.dataset.t;
      if (t[key] !== undefined) {
        if (el.dataset.html) el.innerHTML = t[key];
        else el.textContent = t[key];
      }
    });
    // flag
    const flag = document.getElementById('current-lang-flag');
    if (flag) flag.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
    // typewriter lang
    rolesLang = lang;
    roleIdx = 0; charIdx = 0; deleting = false;
  }

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLang(currentLang);
  });

  /* ── HOVER GLOW ON PROJECT CARDS ─────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

});
