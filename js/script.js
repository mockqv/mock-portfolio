document.addEventListener("DOMContentLoaded", function () {

    // --- Translations ---
    const translations = {
        "en-US": {
            navAbout: "About",
            navExperience: "Experience",
            navProjects: "Projects",
            navSkills: "Stack",
            langLabel: "Language:",
            heroTitle: "Full-Stack Developer",
            heroSubtitle: "Building scalable digital solutions with a focus on performance and user experience.",
            aboutTitle: "About Me",
            aboutSubtitle: "Professional Summary",
            aboutText: "Currently working as a freelance full-stack developer, applying a solid foundation built in a renowned technical college in Campinas. I have expertise in <strong>Algorithms</strong>, <strong>Data Structures</strong>, <strong>Software Engineering</strong>, and <strong>Service-Oriented Architecture</strong>. I am constantly evolving academically while pursuing my Bachelor's degree in Information Systems.",
            experienceTitle: "Experience",
            job1Title: "Front-end Developer",
            job1Desc: "<strong>Professional Portfolio:</strong> Architecture and development of a high-performance responsive interface focused on SEO and accessibility.",
            job1Duration: "September 2025",
            job2Title: "Full-Stack Developer",
            job2Desc: "<strong>Real Estate System:</strong> Development of a web platform for property management and CRM, implementing administrative dashboards and external API integration.",
            job2Duration: "May 2025 - Present",
            projectsTitle: "Personal Projects",
            p1Title: "TypeScript Discord Bot",
            p1Desc: "Robust automation for communities with modular and scalable OOP architecture.",
            p2Title: "LinkSnap",
            p2Desc: "Minimalist URL shortener focused on speed and simplified UX.",
            skillsTitle: "Tech Stack"
        },
        "pt-BR": {
            navAbout: "Sobre",
            navExperience: "Experiência",
            navProjects: "Projetos",
            navSkills: "Stack",
            langLabel: "Idioma:",
            heroTitle: "Desenvolvedor Full-Stack",
            heroSubtitle: "Crio soluções digitais escaláveis com foco em performance e experiência do usuário.",
            aboutTitle: "Sobre Mim",
            aboutSubtitle: "Resumo Profissional",
            aboutText: "Atualmente atuo como desenvolvedor full-stack freelancer, aplicando uma base sólida construída em formação técnica de excelência em Campinas. Possuo expertise em <strong>Algoritmos</strong>, <strong>Estrutura de Dados</strong>, <strong>Engenharia de Software</strong> e <strong>Arquitetura Orientada a Serviços</strong>. Estou em constante evolução acadêmica, cursando Bacharelado em Sistemas de Informação.",
            experienceTitle: "Experiência",
            job1Title: "Desenvolvedor Front-end",
            job1Desc: "<strong>Portfólio Profissional:</strong> Arquitetura e desenvolvimento de interface responsiva de alta performance focada em SEO e acessibilidade.",
            job1Duration: "Setembro 2025",
            job2Title: "Desenvolvedor Full-Stack",
            job2Desc: "<strong>Sistema Imobiliário:</strong> Desenvolvimento de plataforma web para gestão de propriedades e CRM, implementando dashboards administrativos e integração com APIs externas.",
            job2Duration: "Maio 2025 - Presente",
            projectsTitle: "Projetos pessoais",
            p1Title: "TypeScript Bot Discord",
            p1Desc: "Automação robusta para comunidades com arquitetura OOP modular e escalável.",
            p2Title: "LinkSnap",
            p2Desc: "Encurtador de URLs minimalista focado em velocidade e UX simplificada.",
            skillsTitle: "Stack Tecnológica"
        }
    };

    const setLanguage = (lang) => {
        localStorage.setItem("preferredLanguage", lang);
        const langTranslations = translations[lang];
        if (!langTranslations) return;

        document.querySelectorAll("[data-translate]").forEach((el) => {
            const key = el.getAttribute("data-translate");
            if (langTranslations[key]) {
                if (key.includes('Text') || key.includes('Desc')) {
                    el.innerHTML = langTranslations[key];
                } else {
                    el.textContent = langTranslations[key];
                }
            }
        });
    };

    document.querySelectorAll(".lang-btn").forEach(button => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.lang);
            document.getElementById('lang-modal').classList.remove('visible');
        });
    });

    // --- Modal Toggle ---
    const langMenuBtn = document.getElementById('lang-menu-toggle');
    const langModal = document.getElementById('lang-modal');

    if (langMenuBtn && langModal) {
        langMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langModal.classList.toggle('visible');
        });

        window.addEventListener('click', (e) => {
            if (langModal.classList.contains('visible') && !langModal.contains(e.target) && e.target !== langMenuBtn) {
                langModal.classList.remove('visible');
            }
        });
    }

    // --- Scroll Active Link ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-list a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
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

    // --- Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
    });

    // --- Init ---
    const savedLang = localStorage.getItem("preferredLanguage") || "pt-BR";
    setLanguage(savedLang);
});