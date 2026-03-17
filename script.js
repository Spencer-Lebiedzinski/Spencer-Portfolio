const projects = [
  {
    name: "spencers-agents",
    url: "https://github.com/Spencer-Lebiedzinski/spencers-agents",
    language: "Python",
    category: ["AI"],
    description: "An agents-focused Python project exploring automation workflows and applied AI tooling.",
    tags: ["Agents", "Automation", "Python"],
    visualType: "workflow",
    liveUrl: ""
  },
  {
    name: "Spencer-Portfolio",
    url: "https://github.com/Spencer-Lebiedzinski/Spencer-Portfolio",
    language: "CSS",
    category: ["Web"],
    description: "A personal portfolio site focused on presenting projects, interests, and technical direction in a clean web experience.",
    tags: ["Portfolio", "Web", "Responsive"],
    visualType: "browser",
    liveUrl: ""
  },
  {
    name: "Stock-Prediction-Dashboard",
    url: "https://github.com/Spencer-Lebiedzinski/Stock-Prediction-Dashboard",
    language: "Python",
    category: ["AI", "Web"],
    description: "A finance-oriented dashboard exploring stock prediction, market data visualization, and decision-support workflows.",
    tags: ["Dashboard", "Finance", "Data"],
    visualType: "chart",
    liveUrl: ""
  },
  {
    name: "nba-game-predicter",
    url: "https://github.com/Spencer-Lebiedzinski/nba-game-predicter",
    language: "Python",
    category: ["AI"],
    description: "A sports analytics project centered on NBA outcomes, prediction, and data-driven experimentation.",
    tags: ["Sports", "Prediction", "Analytics"],
    visualType: "scoreboard",
    liveUrl: ""
  },
  {
    name: "mini_malloc",
    url: "https://github.com/Spencer-Lebiedzinski/mini_malloc",
    language: "C",
    category: ["Systems"],
    description: "A custom heap allocator with a free-list, block splitting, coalescing, and debug tooling over a static heap.",
    tags: ["Allocator", "Memory", "C"],
    visualType: "terminal",
    liveUrl: ""
  },
  {
    name: "Ai-Stock-Pitch",
    url: "https://github.com/Spencer-Lebiedzinski/Ai-Stock-Pitch",
    language: "Concept",
    category: ["AI"],
    description: "An AI and finance project focused on turning research and analysis into a clearer stock pitch.",
    tags: ["Stocks", "AI", "Finance"],
    visualType: "briefing",
    liveUrl: ""
  },
  {
    name: "Course-Scheduler-App",
    url: "https://github.com/Spencer-Lebiedzinski/Course-Scheduler-App",
    language: "Java",
    category: ["Desktop"],
    description: "A desktop course scheduling application with a GUI and data-backed workflow for managing class plans.",
    tags: ["Java", "Swing", "Scheduling"],
    visualType: "calendar",
    liveUrl: ""
  },
  {
    name: "Aurora-Journal",
    url: "https://github.com/Spencer-Lebiedzinski/Aurora-Journal",
    language: "HTML",
    category: ["AI", "Web"],
    description: "An AI-driven web app from HackPSU 2025 that analyzes journal entries, tracks emotional trends, and suggests reflections.",
    tags: ["Flask", "Gemini API", "Hackathon"],
    visualType: "journal",
    liveUrl: "https://devpost.com/software/aurora-journal?ref_content=my-projects-tab&ref_feature=my_projects"
  },
  {
    name: "fast.ai-course-projects",
    url: "https://github.com/Spencer-Lebiedzinski/fast.ai-course-projects",
    language: "Coursework",
    category: ["AI"],
    description: "A collection of deep learning exercises and experiments completed through the fast.ai coursework.",
    tags: ["Deep Learning", "Coursework", "Data"],
    visualType: "neural",
    liveUrl: ""
  }
];

const projectsGrid = document.getElementById("projectsGrid");
const filterButtons = document.querySelectorAll(".filter-chip");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const footerYear = document.getElementById("footerYear");

function titleFromSlug(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderProjectVisual(project) {
  return `
    <div class="project-visual project-visual-${project.visualType}" aria-hidden="true">
      <div class="visual-surface">
        <div class="visual-label-row">
          <span>${project.language}</span>
          <span>${project.category[0]}</span>
        </div>
        <div class="visual-content">
          ${renderVisualContent(project.visualType)}
        </div>
      </div>
    </div>
  `;
}

function renderVisualContent(visualType) {
  const visualMap = {
    briefing: `
      <div class="visual-stack">
        <div class="visual-line visual-line-lg"></div>
        <div class="visual-line"></div>
        <div class="visual-pill-row">
          <span></span><span></span><span></span>
        </div>
      </div>
    `,
    browser: `
      <div class="browser-frame">
        <div class="browser-dots"><span></span><span></span><span></span></div>
        <div class="browser-body">
          <div class="browser-sidebar"></div>
          <div class="browser-panels">
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
    `,
    calendar: `
      <div class="calendar-grid">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
    `,
    chart: `
      <div class="chart-bars">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="chart-line">
        <i></i>
      </div>
    `,
    journal: `
      <div class="journal-card">
        <div class="journal-lines">
          <span></span><span></span><span></span>
        </div>
        <div class="journal-orb"></div>
      </div>
    `,
    neural: `
      <div class="neural-grid">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
    `,
    scoreboard: `
      <div class="scoreboard">
        <div>112</div>
        <div>105</div>
        <div class="scoreboard-row"></div>
      </div>
    `,
    terminal: `
      <div class="terminal-lines">
        <span></span><span></span><span></span>
      </div>
    `,
    workflow: `
      <div class="workflow-map">
        <span></span><span></span><span></span>
        <i></i><i></i>
      </div>
    `
  };

  return visualMap[visualType] || visualMap.browser;
}

function renderProjects(filter = "all") {
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") {
      return true;
    }

    return project.category.includes(filter);
  });

  projectsGrid.innerHTML = filteredProjects
    .map((project) => {
      const liveLink = project.liveUrl
        ? `<a class="project-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live link</a>`
        : "";

      return `
        <article class="project-card">
          ${renderProjectVisual(project)}
          <div class="project-topline">
            <p class="eyebrow">${project.category.join(" / ")}</p>
            <span class="project-language">${project.language || "Project"}</span>
          </div>
          <div>
            <h3 class="project-name">${titleFromSlug(project.name)}</h3>
          </div>
          <p class="project-description">${project.description}</p>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
          </div>
          <div class="project-footer">
            <div class="project-actions">
              <a class="project-link" href="${project.url}" target="_blank" rel="noreferrer">GitHub</a>
              ${liveLink}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((chip) => chip.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProjects(button.dataset.filter);
    });
  });
}

function initMobileMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];

  const updateActiveLink = () => {
    let activeSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        activeSection = `#${section.id}`;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === activeSection);
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
}

function initFooterYear() {
  footerYear.textContent = `(c) ${new Date().getFullYear()} all rights reserved`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initFilters();
  initMobileMenu();
  initReveal();
  initActiveNav();
  initFooterYear();
});
