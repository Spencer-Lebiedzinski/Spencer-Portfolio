/**
 * PORTFOLIO INTERACTIVE FEATURES
 * - Smooth scrolling
 * - Dark mode toggle
 * - Scroll reveal animations
 * - Navigation active state tracking
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');

// ============================================
// THEME TOGGLE FUNCTIONALITY
// Allows users to switch between light and dark modes
// Persists preference in localStorage
// ============================================
function initThemeToggle() {
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Apply theme to document and update button
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// Handle navigation link clicks with smooth scrolling
// ============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Smooth scroll with offset for fixed navbar
      const offsetTop = targetSection.offsetTop - 60;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Optional: Close menu if open (for mobile)
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// Fade in project cards as they come into view
// Add smooth animation to elements
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.project-card, .skill-tag, .about-text'
  );

  // IntersectionObserver options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element enters viewport
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial state and observe
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
    observer.observe(el);
  });
}

// ============================================
// ACTIVE NAVIGATION LINK TRACKING
// Highlight the current section in navigation
// ============================================
function initActiveNavTracking() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update active link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// ADD STYLES FOR ACTIVE NAVIGATION STATE
// Inject CSS for active nav link styling
// ============================================
function addActiveNavStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--color-primary);
    }
    
    .nav-link.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// PROJECT CARD INTERACTION
// Add click/tap feedback and hover effects
// ============================================
function initProjectCardInteractions() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '1';
    });

    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '0';
    });

    // Log project click for analytics (optional)
    const projectLink = card.querySelector('.project-link');
    if (projectLink) {
      projectLink.addEventListener('click', (e) => {
        console.log(`Navigating to project: ${card.querySelector('.project-title').textContent}`);
      });
    }
  });
}

// ============================================
// INITIALIZATION
// Run all setup functions when DOM is ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded and initialized');
  
  initThemeToggle();
  initScrollReveal();
  initActiveNavTracking();
  addActiveNavStyles();
  initProjectCardInteractions();
});

// ============================================
// UTILITY FUNCTIONS FOR FUTURE FEATURES
// ============================================

/**
 * Utility: Debounce function for scroll events
 * Helps improve performance by limiting function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Add class to element with smooth transition
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class to add
 */
function addClassSmooth(element, className) {
  element.classList.add(className);
}

/**
 * Utility: Check if element is in viewport
 * Useful for custom animations or lazy loading
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if visible in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
