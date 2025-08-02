document.addEventListener("DOMContentLoaded", function () {
  // --- Language Translation ---
  const translations = {
    "en-US": {
      navSkills: "Skills",
      navProjects: "Projects",
      navAbout: "About",
      heroTitle: "Hello, I'm <span>Mock</span>",
      heroSubtitle: "Full-Stack Developer | Turning ideas into digital reality",
      heroContactBtn: "Get in Touch",
      skillsTitle: "My Skills",
      skillsBtn: "View more",
      skillsBtnLess: "View less",
      projectsTitle: "Featured Projects",
      p1Title: "TypeScript Discord Bot",
      p1Desc:
        "A feature-rich Discord bot developed with TypeScript and the Discord.js library. This bot uses MongoDB as its database and was designed based on Object-Oriented Programming (OOP) principles.",
      p2Title: "LinkSnap",
      p2Desc: "A URL shortener.",
      p3Title: "Project 3",
      p3Desc: "Coming Soon...",
      liveBtn: "Live Demo",
      codeBtn: "Code",
      aboutTitle: "About Me",
      aboutSubtitle: "Who am I?",
      aboutP1:
        "I'm a developer passionate about technology and building complete, robust solutions. My experience covers the entire development lifecycle, from conceptualizing and designing interfaces to building scalable back-ends and developing mobile applications.",
      aboutP2:
        "I am always seeking to learn new technologies and improve my skills to deliver efficient, high-quality solutions. Currently, I'm looking for my first opportunity to contribute to a team and grow professionally.",
      footerText:
        '&copy; 2025 Mockqv. Made with <i class="fas fa-heart" style="color: var(--primary-color);"></i> and code.',
    },
    "pt-BR": {
      navSkills: "Habilidades",
      navProjects: "Projetos",
      navAbout: "Sobre",
      heroTitle: "Olá, eu sou <span>Mock</span>",
      heroSubtitle:
        "Desenvolvedor Full-Stack | Transformando ideias em realidade digital",
      heroContactBtn: "Entre em Contato",
      skillsTitle: "Minhas Habilidades",
      skillsBtn: "Ver mais",
      skillsBtnLess: "Ver menos",
      projectsTitle: "Projetos em Destaque",
      p1Title: "TypeScript Bot Discord",
      p1Desc:
        "Um bot do Discord rico em recursos, desenvolvido com TypeScript e a biblioteca Discord.js. Este bot usa o MongoDB como banco de dados e foi projetado com base nos princípios da Programação Orientada a Objetos (POO).",
      p2Title: "LinkSnap",
      p2Desc: "Um encurtador de links.",
      p3Title: "Projeto 3",
      p3Desc: "Em Breve...",
      liveBtn: "Ver ao Vivo",
      codeBtn: "Código",
      aboutTitle: "Sobre Mim",
      aboutSubtitle: "Quem sou eu?",
      aboutP1:
        "Sou um desenvolvedor apaixonado por tecnologia e por criar soluções completas e robustas. Minha experiência abrange todo o ciclo de desenvolvimento, desde a concepção e design de interfaces até a construção de back-ends escaláveis e o desenvolvimento de aplicações mobile.",
      aboutP2:
        "Estou sempre buscando aprender novas tecnologias e aprimorar minhas habilidades para entregar soluções eficientes e de alta qualidade. No momento, estou buscando minha primeira oportunidade para contribuir em uma equipe e crescer profissionalmente.",
      footerText:
        '&copy; 2025 Mockqv. Feito com <i class="fas fa-heart" style="color: var(--primary-color);"></i> e código.',
    },
  };

  const languageButtons = document.querySelectorAll(".lang-btn");

  const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    const langTranslations = translations[lang];

    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate");
      if (langTranslations[key]) {
        // Use innerHTML for elements that contain HTML tags like the footer and title
        if (key === "footerText" || key === "heroTitle") {
          el.innerHTML = langTranslations[key];
        } else {
          el.textContent = langTranslations[key];
        }
      }
    });

    // Update active button
    languageButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem("preferredLanguage", lang);
  };

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.dataset.lang;
      setLanguage(selectedLang);
    });
  });

  // --- On Page Load ---
  const preferredLanguage =
    localStorage.getItem("preferredLanguage") || "pt-BR";
  setLanguage(preferredLanguage);

  // --- Sticky Header ---
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- "View More" for Tech Stack ---
  const toggleButton = document.getElementById("toggle-tech");
  const techContainer = document.getElementById("tech-icons-container");
  const techImage = techContainer.querySelector("img");

  const initialHeight = 60; // Approximate height of one row of icons
  techContainer.style.maxHeight = `${initialHeight}px`;

  toggleButton.addEventListener("click", () => {
    const currentLang = document.documentElement.lang;
    if (techContainer.style.maxHeight === `${initialHeight}px`) {
      techContainer.style.maxHeight = `${techImage.scrollHeight}px`;
      toggleButton.textContent = translations[currentLang].skillsBtnLess;
    } else {
      techContainer.style.maxHeight = `${initialHeight}px`;
      toggleButton.textContent = translations[currentLang].skillsBtn;
    }
  });

  // --- Fade-in Animation on Scroll ---
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
