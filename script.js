// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.updateThemeIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeIcon() {
    const icon = this.themeToggle.querySelector('i');
    if (this.currentTheme === 'light') {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupScrollEffects();
  }

  setupMobileMenu() {
    this.navToggle.addEventListener('click', () => {
      this.navToggle.classList.toggle('active');
      this.navMenu.classList.toggle('active');
    });

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
      }
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupActiveNavigation() {
    const updateActiveNavLink = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.navLinks.forEach(link => link.classList.remove('active'));
          if (navLink) {
            navLink.classList.add('active');
          }
        }
      });
    };

    window.addEventListener('scroll', this.debounce(updateActiveNavLink, 10));
  }

  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
  }

  debounce(func, wait) {
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
}

// Hero Section Effects
class HeroEffects {
  constructor() {
    this.typewriterElement = document.getElementById('typewriter');
    this.scrollIndicator = document.querySelector('.scroll-indicator');
    this.texts = ['Adobe Illustrator Expert', 'Photoshop Master', 'Brand Designer', 'Creative Professional'];
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.setupTypewriter();
    this.setupScrollIndicator();
    this.setupParallaxEffect();
  }

  setupTypewriter() {
    const typeWriter = () => {
      const currentText = this.texts[this.currentTextIndex];
      
      if (this.isDeleting) {
        this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
      } else {
        this.typewriterElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
      }

      let typeSpeed = this.isDeleting ? 100 : 150;

      if (!this.isDeleting && this.currentCharIndex === currentText.length) {
        typeSpeed = 2000;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        typeSpeed = 500;
      }

      setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();
  }

  setupScrollIndicator() {
    if (this.scrollIndicator) {
      this.scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const shapes = document.querySelectorAll('.floating-shape');
      
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// Skills Animation
class SkillsAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.skillsSection = document.getElementById('skills');
    this.animated = false;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.animateSkillBars());
  }

  animateSkillBars() {
    if (this.animated) return;

    const skillsSectionTop = this.skillsSection.offsetTop;
    const skillsSectionHeight = this.skillsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > skillsSectionTop + skillsSectionHeight / 3) {
      this.skillBars.forEach((bar, index) => {
        setTimeout(() => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        }, index * 200);
      });
      this.animated = true;
    }
  }
}

// Project Filtering
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => this.filterProjects(e.target));
    });
  }

  filterProjects(button) {
    const filter = button.getAttribute('data-filter');
    
    // Update active filter button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter projects with animation
    this.projectCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        setTimeout(() => {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 100);
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.formSuccess = document.getElementById('formSuccess');
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Simple form validation
    const formData = new FormData(this.contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
      this.showError('Please fill in all required fields.');
      return;
    }
    
    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    this.showSuccess();
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showSuccess() {
    this.contactForm.style.display = 'none';
    this.formSuccess.classList.add('show');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.contactForm.style.display = 'block';
      this.formSuccess.classList.remove('show');
      this.contactForm.reset();
    }, 3000);
  }

  showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.form-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.style.cssText = `
        background: #fef2f2;
        color: #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #fecaca;
      `;
      this.contactForm.insertBefore(errorDiv, this.contactForm.firstChild);
    }
    
    errorDiv.textContent = message;
    
    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Scroll to Top
class ScrollToTop {
  constructor() {
    this.scrollTopButton = document.getElementById('scrollTop');
    this.init();
  }

  init() {
    if (this.scrollTopButton) {
      this.scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          this.scrollTopButton.classList.add('visible');
        } else {
          this.scrollTopButton.classList.remove('visible');
        }
      });
    }
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, this.observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .skill-card, .project-card, .contact-info, .social-links, .availability');
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupPreloadResources();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

//   setupImageOptimization() {
//     const images = document.querySelectorAll('img');
    
//     images.forEach(img => {
//       img.addEventListener('load', function() {
//         this.style.opacity = '1';
//       });
      
//       img.style.opacity = '0';
//       img.style.transition = 'opacity 0.3s ease';
//     });
//   }

//   setupPreloadResources() {
//     const criticalImages = [
//       'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
//       'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg'
//     ];
    
//     criticalImages.forEach(src => {
//       const link = document.createElement('link');
//       link.rel = 'preload';
//       link.as = 'image';
//       link.href = src;
//       document.head.appendChild(link);
//     });
//   }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('click', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupFocusManagement() {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-blue)';
        this.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = 'none';
      });
    });
  }

  setupScreenReaderSupport() {
    // Add ARIA labels for better screen reader support
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    }

    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
      navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
  }
}

// Initialize Application
class App {
  constructor() {
    this.components = [];
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize all components
    this.components = [
      new ThemeManager(),
      new NavigationManager(),
      new HeroEffects(),
      new SkillsAnimation(),
      new ProjectFilter(),
      new ContactForm(),
      new ScrollToTop(),
      new AnimationObserver(),
      new PerformanceOptimizer(),
      new AccessibilityEnhancer()
    ];

    // Setup error handling
    window.addEventListener('error', (e) => {
      console.error('Application error:', e.error);
    });

    // Mark app as loaded
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }
}

// Start the application
new App();

// Additional utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  isElementInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  smoothScrollTo: (element, duration = 1000) => {
    const targetPosition = element.offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
};

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { utils };
}