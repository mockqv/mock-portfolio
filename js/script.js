// Inicializa ícones Lucide
lucide.createIcons();

// --- Navigation Logic (Smooth Scroll Fix) ---
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// --- Translation Logic ---
const translations = {
    'pt': {
        aboutTitle: 'Sobre',
        navProjects: 'Projetos',
        navSkills: 'Stack',
        navExperience: 'Experiência',
        navContact: 'Contato',
        heroGreeting: 'Olá, sou',
        heroSubtitle: 'Crio soluções digitais escaláveis com foco em performance e experiência do usuário.',
        btnProjects: 'Ver Projetos',
        projectsTitle: 'Projetos Pessoais',
        projectsSubtitle: 'Uma seleção dos meus melhores trabalhos.',
        viewGithub: 'Ver todos no GitHub',
        p1Title: 'TypeScript Bot Discord',
        p1Desc: 'Automação robusta para comunidades com arquitetura OOP modular e escalável.',
        p2Title: 'LinkSnap',
        p2Desc: 'Encurtador de URLs minimalista focado em velocidade e UX simplificada.',
        p3Title: 'MSC - Semantic Commit',
        p3Desc: 'CLI Tool para padronização de commits semânticos, melhorando o fluxo de git.',
        experienceTitle: 'Jornada Profissional',
        job1Title: 'Desenvolvedor Full-Stack',
        job1Desc: 'Desenvolvimento de plataforma web para gestão de propriedades e CRM, implementando dashboards administrativos e integração com APIs externas. Stack: React, Flask, PostgreSQL.',
        job1Duration: 'Maio 2025 - Presente',
        job2Title: 'Desenvolvedor Front-end',
        job2Desc: 'Arquitetura e desenvolvimento de interface responsiva de alta performance focada em SEO e acessibilidade para Portfólio Profissional. Stack: HTML5, Tailwind, JS.',
        job2Duration: 'Setembro 2025',
        skillsTitle: 'Stack Tecnológica',
        aboutTitle: 'Sobre Mim',
        aboutSubtitle: 'Resumo Profissional',
        aboutText: '<p>Atualmente atuo como <strong>desenvolvedor full-stack freelancer</strong>, aplicando uma base sólida construída em formação técnica de excelência em Campinas. Possuo expertise em Algoritmos, Estrutura de Dados, Engenharia de Software e Arquitetura Orientada a Serviços. Estou em constante evolução acadêmica, cursando Bacharelado em Sistemas de Informação.</p>',
        btnDownload: 'Baixar Currículo',
        contactTitle: 'Vamos construir algo',
        contactAmazing: 'incrível',
        contactTogether: 'juntos?',
        contactText: 'Estou disponível para novos projetos e oportunidades freelance. Se você precisa de uma solução full-stack robusta, me mande uma mensagem.',
        remoteAvailable: 'Disponível para Remoto',
    },
    'en': {
        aboutTitle: 'About',
        navProjects: 'Projects',
        navSkills: 'Stack',
        navExperience: 'Experience',
        navContact: 'Contact',
        heroGreeting: 'Hi, I am',
        heroSubtitle: 'Building scalable digital solutions with a focus on performance and user experience.',
        btnProjects: 'View Projects',
        projectsTitle: 'Personal Projects',
        projectsSubtitle: 'A selection of my best work.',
        viewGithub: 'View all on GitHub',
        p1Title: 'TypeScript Discord Bot',
        p1Desc: 'Robust automation for communities with modular and scalable OOP architecture.',
        p2Title: 'LinkSnap',
        p2Desc: 'Minimalist URL shortener focused on speed and simplified UX.',
        p3Title: 'MSC - Semantic Commit',
        p3Desc: 'CLI Tool for standardizing semantic commits, improving git workflow.',
        experienceTitle: 'Professional Journey',
        job1Title: 'Full-Stack Developer',
        job1Desc: 'Development of a web platform for property management and CRM, implementing administrative dashboards and external API integration. Stack: React, Flask, PostgreSQL.',
        job1Duration: 'May 2025 - Present',
        job2Title: 'Front-end Developer',
        job2Desc: 'Architecture and development of a high-performance responsive interface focused on SEO and accessibility. Stack: HTML5, Tailwind, JS.',
        job2Duration: 'September 2025',
        skillsTitle: 'Tech Stack',
        aboutTitle: 'About Me',
        aboutSubtitle: 'Professional Summary',
        aboutText: '<p>Currently working as a <strong>freelance full-stack developer</strong>, applying a solid foundation built in a renowned technical college in Campinas. I have expertise in Algorithms, Data Structures, Software Engineering, and Service-Oriented Architecture. I am constantly evolving academically while pursuing my Bachelor\'s degree in Information Systems.</p>',
        btnDownload: 'Download Resume',
        contactTitle: 'Let\'s build something',
        contactAmazing: 'amazing',
        contactTogether: 'together?',
        contactText: 'I am available for new projects and freelance opportunities. If you need a robust full-stack solution, send me a message.',
        remoteAvailable: 'Remote Available',
    }
};

let currentLang = 'pt';
const langToggleBtn = document.getElementById('lang-toggle');
const flagSpan = document.getElementById('current-lang-flag');

function updateLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (key === 'aboutText') el.innerHTML = t[key];
            else el.textContent = t[key];
        }
    });

    if (lang === 'pt') {
        flagSpan.textContent = '🇧🇷';
    } else {
        flagSpan.textContent = '🇺🇸';
    }
}

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(currentLang);
});

// --- Mobile Menu ---
const menuBtn = document.getElementById('menu-btn');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
closeMenu.addEventListener('click', () => mobileMenu.classList.add('hidden'));
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});