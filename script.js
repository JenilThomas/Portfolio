/* ==========================================================================
   DYNAMIC PORTFOLIO & CV INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initThemeHandler();
  initMobileMenu();
  initTypewriter();
  initParticleBackground();
  initScrollAnimations();
  initTimelineToggle();
  initPortfolioFilterAndModal();
  initContactForm();
});

/* ==========================================================================
   1. CUSTOM INTERACTIVE CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !dot) return;

  // Track position
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot moves instantly
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });
  
  // Custom cursor smooth lag animation loop
  function animateCursor() {
    // Linear interpolation
    const ease = 0.15;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Interactive element hover detections
  const hoverElements = document.querySelectorAll('a, button, .project-card, .timeline-toggle-btn, .social-icon, .social-circle, .form-group input, .form-group textarea');
  
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    elem.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
  
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
  });
}

/* ==========================================================================
   2. DARK & LIGHT THEME HANDLER
   ========================================================================== */
function initThemeHandler() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const toggleIcon = toggleBtn.querySelector('i');
  const htmlDoc = document.documentElement;
  
  // Retrieve saved preference or check system default
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlDoc.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
  
  function setTheme(theme) {
    htmlDoc.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    if (theme === 'dark') {
      toggleIcon.className = 'fa-solid fa-sun';
      toggleBtn.style.color = '#ffb703';
    } else {
      toggleIcon.className = 'fa-solid fa-moon';
      toggleBtn.style.color = 'var(--text-primary)';
    }
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = menuToggle?.querySelector('i');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    
    if (menuIcon) {
      menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
    }
  });
  
  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (menuIcon) {
        menuIcon.className = 'fa-solid fa-bars-staggered';
      }
    });
  });
}

/* ==========================================================================
   4. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;
  
  const skillWords = [
    "Multimedia Designer",
    "UI/UX Motion Designer",
    "AI Integration Developer",
    "Branding Architect",
    "Vibe Coding Designer"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeEffect() {
    const currentWord = skillWords[wordIndex];
    
    if (isDeleting) {
      // Remove character
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Add character
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      // Full word written, pause
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      // Word completely deleted, move to next
      isDeleting = false;
      wordIndex = (wordIndex + 1) % skillWords.length;
      typingSpeed = 500; // Brief pause before typing next
    }
    
    setTimeout(typeEffect, typingSpeed);
  }
  
  // Start typewriter loops
  typeEffect();
}

/* ==========================================================================
   5. HIGH PERFORMANCE PARTICLE CANVAS BACKGROUND
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let numberOfParticles = 80;
  
  // Handle resize
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initParticles();
  });
  
  // Mouse position listener
  let mouse = {
    x: null,
    y: null,
    radius: 120
  };
  
  const heroSection = document.getElementById('home');
  heroSection?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  heroSection?.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Particle constructor
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Screen bounds checks
      if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
      
      // Mouse interaction force (slight push away)
      if (mouse.x !== null && mouse.y !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let angle = Math.atan2(dy, dx);
          
          this.x += Math.cos(angle) * force * 2;
          this.y += Math.sin(angle) * force * 2;
        }
      }
    }
    
    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(0, 245, 212, 0.4)' : 'rgba(123, 44, 191, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    numberOfParticles = Math.min(80, Math.floor((width * height) / 10000));
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  
  function connectParticles() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? 'rgba(157, 78, 221, 0.08)' : 'rgba(0, 180, 216, 0.08)';
    const maxDistance = 110;
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < maxDistance) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - (distance / maxDistance);
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
      
      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particlesArray[a].x - mouse.x;
        let dy = particlesArray[a].y - mouse.y;
        let distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          ctx.strokeStyle = isDark ? `rgba(0, 245, 212, ${0.15 * (1 - distance/mouse.radius)})` : `rgba(123, 44, 191, ${0.15 * (1 - distance/mouse.radius)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }
  
  initParticles();
  animateParticles();
}

/* ==========================================================================
   6. SCROLL REVEALS & ACTIVE NAVIGATION SECTIONS
   ========================================================================== */
function initScrollAnimations() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Shrink navigation header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Intersection Observer for Active Nav link highlighting & stats counters
  const scrollOptions = {
    root: null,
    threshold: 0.25,
    rootMargin: "0px"
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Set active nav link
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        
        // Add scroll animation reveal class
        entry.target.classList.add('revealed');
        
        // Trigger specific animations per section
        if (sectionId === 'about') {
          triggerSkillAnimations();
          triggerStatsCounters();
        }
      }
    });
  }, scrollOptions);
  
  sections.forEach(section => {
    scrollObserver.observe(section);
  });
  
  // Specific observer for generic elements with scroll-reveal class
  const elementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        elementsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    elementsObserver.observe(el);
  });
  
  // Print / Save CV button trigger
  const cvBtn = document.getElementById('download-cv');
  cvBtn?.addEventListener('click', () => {
    window.print();
  });
}

function triggerSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress;
  });
}

function triggerStatsCounters() {
  const statsNumbers = document.querySelectorAll('.stat-number');
  statsNumbers.forEach(num => {
    if (num.getAttribute('data-counted') === 'true') return;
    
    num.setAttribute('data-counted', 'true');
    const target = parseInt(num.getAttribute('data-target'));
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = Math.max(10, Math.floor(duration / target));
    
    const counterInterval = setInterval(() => {
      current++;
      num.textContent = current;
      if (current >= target) {
        clearInterval(counterInterval);
        num.textContent = target;
      }
    }, intervalTime);
  });
}

/* ==========================================================================
   7. INTERACTIVE JOURNEY CV TIMELINE SWITCHER
   ========================================================================== */
function initTimelineToggle() {
  const toggleExp = document.getElementById('toggle-experience');
  const toggleEdu = document.getElementById('toggle-education');
  const expTimeline = document.getElementById('experience-timeline');
  const eduTimeline = document.getElementById('education-timeline');
  
  if (!toggleExp || !toggleEdu || !expTimeline || !eduTimeline) return;
  
  toggleExp.addEventListener('click', () => {
    if (toggleExp.classList.contains('active')) return;
    
    toggleEdu.classList.remove('active');
    toggleExp.classList.add('active');
    
    eduTimeline.classList.remove('active');
    expTimeline.classList.add('active');
  });
  
  toggleEdu.addEventListener('click', () => {
    if (toggleEdu.classList.contains('active')) return;
    
    toggleExp.classList.remove('active');
    toggleEdu.classList.add('active');
    
    expTimeline.classList.remove('active');
    eduTimeline.classList.add('active');
  });
}

/* ==========================================================================
   8. PORTFOLIO FILTER & RICH DETAILS LIGHTBOX MODAL
   ========================================================================== */
const projectDatabase = {
  'nova-dashboard': {
    title: "Nova SaaS Analytics Dashboard",
    category: "Full-Stack Development",
    tag: "Development",
    date: "2025",
    client: "NovaTech Labs",
    img: "assets/project_web.png",
    description: "Nova Dashboard is a premier, enterprise-level SaaS metrics visualizer, rendering hundreds of real-time telemetry pipelines smoothly on custom canvases. Designed with security and strict performance standards, featuring GraphQL micro-frontends, responsive chart dashboards, multi-tenant databases, and seamless Docker orchestrations.",
    tech: ["React.js", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Docker", "AWS"],
    demo: "#",
    repo: "#"
  },
  'aura-wallet': {
    title: "Aura Fintech Mobile Application",
    category: "UI/UX & Mobile Design",
    tag: "UI/UX & Design",
    date: "2025",
    client: "Zenith Tech Systems",
    img: "assets/project_mobile.png",
    description: "Aura Wallet re-imagines modern digital banking. Centered on interactive dark layouts, the fintech design showcases premium transaction modules, gradient glassmorphic cards, secure NFC configurations, and robust biometrics interfaces. Researched and prototyped natively within Figma with user-verified testing pipelines.",
    tech: ["Figma", "Adobe Illustrator", "Motion Design", "Design Systems", "Prototyping"],
    demo: "#",
    repo: "#"
  },
  'cognimind-ai': {
    title: "CogniMind Neural Analytics Platform",
    category: "AI Solutions",
    tag: "AI Solutions",
    date: "2024",
    client: "AI Venture Hubs",
    img: null, // Triggers premium CSS layout fallback in script modal
    description: "CogniMind leverages fine-tuned transformers to perform real-time natural language sentiment clustering for enterprise client databases. Features sleek dashboard reporting, dynamic customer intent maps, automated FastAPI endpoints, and modular python architecture.",
    tech: ["Python", "FastAPI", "PyTorch", "Hugging Face", "MongoDB", "Tailwind CSS"],
    demo: "#",
    repo: "#"
  },
  'veloce-ecom': {
    title: "Veloce Premium E-commerce Storefront",
    category: "Full-Stack Development",
    tag: "Development",
    date: "2024",
    client: "Veloce Retailers Ltd",
    img: null,
    description: "Veloce Storefront is an ultra-fast headless commerce interface built on Next.js. Engineered with absolute Core Web Vitals targets, it integrates Redis caching tiers, Stripe checkouts, modular CSS-modules, inventory syncing, and automated SEO schema maps.",
    tech: ["Next.js", "Redis", "Stripe API", "CSS Modules", "SQL", "SEO Optimization"],
    demo: "#",
    repo: "#"
  }
};

function initPortfolioFilterAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Filtering Mechanism
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter btn class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          // CSS entry transitions triggers
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // matches hide animation duration
        }
      });
    });
  });
  
  // Modal Controller Setup
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-project-img');
  const modalPlaceholder = document.getElementById('modal-project-grad-placeholder');
  const modalTag = document.getElementById('modal-project-tag');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDate = document.getElementById('modal-project-date');
  const modalClient = document.getElementById('modal-project-client');
  const modalDesc = document.getElementById('modal-project-description');
  const modalTech = document.getElementById('modal-project-tech');
  const modalDemo = document.getElementById('modal-project-demo-link');
  const modalRepo = document.getElementById('modal-project-repo-link');
  
  const detailButtons = document.querySelectorAll('.project-view-details');
  
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const projectData = projectDatabase[projectId];
      
      if (!projectData) return;
      
      // Populate details dynamically
      modalTitle.textContent = projectData.title;
      modalTag.textContent = projectData.tag;
      modalDate.textContent = projectData.date;
      modalClient.textContent = projectData.client;
      modalDesc.textContent = projectData.description;
      modalDemo.href = projectData.demo;
      modalRepo.href = projectData.repo;
      
      // Clear and populate tech stack badges
      modalTech.innerHTML = '';
      projectData.tech.forEach(techItem => {
        const span = document.createElement('span');
        span.textContent = techItem;
        modalTech.appendChild(span);
      });
      
      // Setup image preview or fallback custom gradient
      if (projectData.img) {
        modalPlaceholder.style.display = 'none';
        modalImg.src = projectData.img;
        modalImg.style.display = 'block';
      } else {
        modalImg.style.display = 'none';
        modalPlaceholder.style.display = 'flex';
        
        // Dynamic fallback class matching categories
        if (projectId === 'cognimind-ai') {
          modalPlaceholder.className = 'modal-project-gradient-placeholder project-custom-gradient-bg g-ai';
        } else {
          modalPlaceholder.className = 'modal-project-gradient-placeholder project-custom-gradient-bg g-ecom';
        }
      }
      
      // Open Modal
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock base scroll
    });
  });
  
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore base scroll
  }
  
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE CONTACT FORM WITH DYNAMIC VALIDATION & SUCCESS DASHBOARD
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successCard = document.getElementById('form-success-card');
  const dismissBtn = document.getElementById('success-dismiss-btn');
  const submitBtn = document.getElementById('form-submit-btn');
  
  if (!form || !successCard) return;
  
  const inputs = form.querySelectorAll('input, textarea');
  
  // Real-time dynamic change listeners
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateField(input);
    });
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
        
        // Shake animation triggering on error
        const group = input.parentElement;
        group.classList.add('shake');
        setTimeout(() => group.classList.remove('shake'), 400);
      }
    });
    
    if (isFormValid) {
      // Simulate submission actions
      form.classList.add('sending');
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Save form name locally for personalized success dashboard
        const userName = document.getElementById('form-name').value;
        localStorage.setItem('portfolio-lead-name', userName);
        
        // Reset form and show success
        form.classList.remove('sending');
        submitBtn.disabled = false;
        successCard.querySelector('p').textContent = `Thank you, ${userName}! Your message was successfully recorded. I will get back to you within 24 hours.`;
        
        successCard.classList.add('show');
        form.reset();
        
        // Reset floating label styles manually
        inputs.forEach(input => {
          input.classList.remove('not-empty');
        });
      }, 1500);
    }
  });
  
  dismissBtn?.addEventListener('click', () => {
    successCard.classList.remove('show');
  });
  
  function validateField(input) {
    const value = input.value.trim();
    const group = input.parentElement;
    let isValid = true;
    
    // Reset status
    group.classList.remove('error');
    
    if (value === '') {
      isValid = false;
    } else if (input.type === 'email') {
      // Email Regex check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        isValid = false;
      }
    }
    
    if (!isValid) {
      group.classList.add('error');
    }
    
    return isValid;
  }
}
