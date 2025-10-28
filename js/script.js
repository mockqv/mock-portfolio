document.addEventListener("DOMContentLoaded", function () {

  // --- Sticky Header ---
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Translations ---
  const translations = {
    "en-US": {
      navAbout: "about",
      navExperience: "experience",
      navProjects: "projects",
      navSkills: "skills",
      heroTitle: "Full-Stack Developer",
      heroSubtitle: "Transforming ideas into digital reality with clean code and functional design.",
      aboutTitle: "About Me",
      aboutSubtitle: "Professional Summary",
      aboutText: "Currently working as a freelance full-stack developer, applying a solid foundation built in a renowned technical college located in Campinas. There, I studied <strong>Algorithms</strong>, <strong>Data Structures</strong>, <strong>Logic</strong>, <strong>AI</strong>, <strong>Software Engineering</strong>, <strong>Web and Mobile Development</strong>, <strong>Service-Oriented Architecture</strong>, and <strong>best practices</strong>. I continue to improve this knowledge as I pursue my bachelor's degree in Information Systems.",
      experienceTitle: "Work Experience",
      job1Title: "Freelance Software Developer | Self-employed",
      job1Duration: "September 2025 - September 2025",
      job1Desc: "<strong>Professional Portfolio (Front-end):</strong> Creation of a static and fully responsive portfolio website.",
      job2Title: "Freelance Software Developer | Self-employed",
      job2Duration: "May 2025 - Present",
      job2Desc: "<strong>Real Estate System (Full-Stack):</strong> Development of a web application for property management and customer acquisition.",
      projectsTitle: "Personal Projects",
      p1Title: "TypeScript Discord Bot",
      p1Desc: "A feature-rich Discord bot for community automation and management, built with a focus on OOP.",
      p2Title: "LinkSnap",
      p2Desc: "A minimalist web application for shortening long URLs, focused on user experience simplicity and speed.",
      codeBtn: "Code",
      skillsDB: "Database",
      skillsTools: "Tools & Others",
      skillsTitle: "My Skills",
      langLabel: "Language:",
      jobTechLabel: "Technologies:",
    },
    "pt-BR": {
      navAbout: "sobre",
      navExperience: "experiencia",
      navProjects: "projetos",
      navSkills: "habilidades",
      heroTitle: "Desenvolvedor Full-Stack",
      heroSubtitle: "Transformando ideias em realidade digital com código limpo e design funcional.",
      aboutTitle: "Sobre Mim",
      aboutSubtitle: "Resumo Profissional",
      aboutText: "Atualmente atuo como desenvolvedor autônomo freelancer full-stack, aplicando uma base sólida construída em um colégio técnico renomado localizado em Campinas. Lá, estudei <strong>Algoritmos</strong>, <strong>Estrutura de Dados</strong>, <strong>Lógica</strong>, <strong>IA</strong>, <strong>Engenharia de Software</strong>, <strong>Desenvolvimento Web e Mobile</strong>, <strong>Arquitetura Orientada a Serviços</strong> e <strong>boas práticas</strong>. Sigo aprimorando esses conhecimentos enquanto busco meu diploma de bacharelado em Sistema de Informação.",
      experienceTitle: "Experiência Profissional",
      job1Title: "Desenvolvedor de Software Freelancer | Autônomo",
      job1Duration: "Setembro 2025 - Setembro 2025",
      job1Desc: "<strong>Portfólio Profissional (Front-end):</strong> Criação de um site de portfólio estático e totalmente responsivo.",
      job2Title: "Desenvolvedor de Software Freelancer | Autônomo",
      job2Duration: "Maio 2025 - Presente",
      job2Desc: "<strong>Sistema para Imobiliária (Full-Stack):</strong> Desenvolvimento de aplicação web para gerenciamento de imóveis e captação de clientes.",
      projectsTitle: "Projetos Pessoais",
      p1Title: "TypeScript Bot Discord",
      p1Desc: "Um bot do Discord rico em recursos para automação e gestão de comunidades, construído com foco em OOP.",
      p2Title: "LinkSnap",
      p2Desc: "Uma aplicação web minimalista para encurtar URLs longas, focada na simplicidade e rapidez da experiência do usuário.",
      codeBtn: "Código",
      skillsTitle: "Minhas Habilidades",
      skillsLanguages: "Linguagens",
      skillsFrontend: "Frontend",
      skillsBackend: "Backend",
      skillsDB: "Banco de Dados",
      skillsTools: "Ferramentas e Outros",
      langLabel: "Linguagem:",
      jobTechLabel: "Tecnologias:",
    }
  };

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    const langTranslations = translations[lang];

    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (langTranslations[key]) {
        if (key === 'aboutText' || key === 'job1Desc' || key === 'job2Desc') {
            el.innerHTML = langTranslations[key];
        } else {
            el.textContent = langTranslations[key];
        }
      }
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    localStorage.setItem("preferredLanguage", lang);
  };

  document.querySelectorAll(".lang-btn").forEach(button => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
  });

  // --- Language Modal ---
  const langMenuBtn = document.getElementById('lang-menu-toggle');
  const langModal = document.getElementById('lang-modal');

  langMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from immediately closing the modal
      langModal.classList.toggle('visible');
  });

  // Close modal if clicking outside
  window.addEventListener('click', (e) => {
      if (langModal.classList.contains('visible') && !langModal.contains(e.target)) {
          langModal.classList.remove('visible');
      }
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Fade-in Animation on Scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach((section) => {
    observer.observe(section);
  });

  // --- Initial Setup ---
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "pt-BR";
  setLanguage(preferredLanguage);

});
