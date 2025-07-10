// ===== MAIN JAVASCRIPT FILE =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeScrollEffects();
    initializeTerminalAnimations();
    initializeBackToTop();
    initializeSkillBars();
    initializeSmoothScrolling();
    initializeGlitchEffects();
    initializeMatrixEffects();
});

// ===== LOADING SCREEN =====
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingScreen.remove();
                // Start terminal animations after loading is complete
                startTerminalSequence();
            }, 500);
        }, 1500); // Show loading for at least 1.5 seconds
    });
}

// ===== TERMINAL ANIMATIONS =====
function initializeTerminalAnimations() {
    // This will be called after loading screen disappears
}

function startTerminalSequence() {
    const commands = [
        { id: 'typing-name', delay: 1000 },
        { id: 'typing-role', delay: 3000 },
        { id: 'typing-desc', delay: 5000 }
    ];
    
    commands.forEach(cmd => {
        setTimeout(() => {
            typeCommand(cmd.id);
        }, cmd.delay);
    });
    
    // Start name glitch effect after typing
    setTimeout(() => {
        startNameGlitch();
    }, 2000);
}

function typeCommand(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const originalText = element.textContent;
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 100 + Math.random() * 100); // Variable typing speed
        } else {
            element.classList.remove('typing');
            // Add cursor blink briefly
            element.insertAdjacentHTML('afterend', '<span class="temp-cursor">█</span>');
            setTimeout(() => {
                const cursor = document.querySelector('.temp-cursor');
                if (cursor) cursor.remove();
            }, 1000);
        }
    }
    
    // Add typing sound effect simulation
    setTimeout(type, 500);
}

function startNameGlitch() {
    const nameElements = document.querySelectorAll('.name-glitch');
    nameElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active-glitch');
        }, index * 500);
    });
}

// ===== GLITCH EFFECTS =====
function initializeGlitchEffects() {
    // Random glitch effect on text elements
    const glitchableElements = document.querySelectorAll('.nav-link, .section-title');
    
    glitchableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('glitch-hover');
            setTimeout(() => {
                this.classList.remove('glitch-hover');
            }, 300);
        });
    });
    
    // Periodic random glitches
    setInterval(() => {
        const randomElement = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];
        if (randomElement) {
            randomElement.classList.add('random-glitch');
            setTimeout(() => {
                randomElement.classList.remove('random-glitch');
            }, 200);
        }
    }, 10000); // Every 10 seconds
}

// ===== MATRIX EFFECTS =====
function initializeMatrixEffects() {
    // Add matrix rain effect to background
    const matrixGrid = document.querySelector('.matrix-grid');
    if (matrixGrid) {
        // Create matrix characters
        const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?01';
        
        function addMatrixChar() {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.position = 'absolute';
            char.style.left = Math.random() * 100 + '%';
            char.style.top = '-20px';
            char.style.color = 'rgba(0, 255, 65, 0.7)';
            char.style.fontSize = '0.8rem';
            char.style.fontFamily = 'var(--font-primary)';
            char.style.animation = 'matrixFall 3s linear';
            char.style.pointerEvents = 'none';
            
            matrixGrid.appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 3000);
        }
        
        // Add matrix chars periodically
        setInterval(addMatrixChar, 500);
    }
}

// Add matrix fall animation to CSS
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrixFall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
    
    .glitch-hover {
        animation: quickGlitch 0.3s ease-in-out;
    }
    
    .random-glitch {
        animation: quickGlitch 0.2s ease-in-out;
    }
    
    @keyframes quickGlitch {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(-2px, 1px); }
        40% { transform: translate(2px, -1px); }
        60% { transform: translate(-1px, 2px); }
        80% { transform: translate(1px, -2px); }
    }
    
    .typing::after {
        content: '█';
        animation: blink 1s infinite;
        color: var(--neon-green);
    }
`;
document.head.appendChild(matrixStyle);

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all scroll reveal elements
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });

    // Add scroll reveal class to elements that should animate on scroll
    const elementsToReveal = [
        '.about-item',
        '.skill-card',
        '.social-card',
        '.section-header'
    ];

    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('scroll-reveal');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Terminal cursor blinking
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        cursor.style.animation = 'blink 1s infinite';
    });

    // Glitch elements floating
    const glitchElements = document.querySelectorAll('.glitch-element');
    glitchElements.forEach((element, index) => {
        element.addEventListener('animationend', function() {
            // Restart animation with new text
            const texts = ['[BREACH_DETECTED]', '[SYSTEM_COMPROMISED]', '[ACCESS_GRANTED]', '[FIREWALL_DOWN]', '[SCANNING...]'];
            this.textContent = texts[Math.floor(Math.random() * texts.length)];
        });
    });
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.style.getPropertyValue('--level');
                
                // Reset width to 0 and animate to target width
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = level;
                }, 100);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ===== PERFORMANCE OPTIMIZATION =====
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

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Focus management for skip links
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                targetElement.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    });
}

// ===== SOCIAL MEDIA INTEGRATION =====
function initializeSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link, .social-card');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('Social link clicked:', this.href);
        });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// ===== SCROLL POSITION RESTORATION =====
window.addEventListener('beforeunload', function() {
    localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem('scrollPosition');
    }
});

// ===== LAZY LOADING FOR IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    // Handle any resize-specific logic here
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// ===== PREFETCH RESOURCES =====
function prefetchResources() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializeSocialMedia();
    initializeLazyLoading();
    initializeContactForm();
    
    // Prefetch resources after a delay
    setTimeout(prefetchResources, 2000);
});

// ===== CONSOLE SIGNATURE =====
console.log(
    '%c✨ Carlo De Gregorio Portfolio ✨',
    'color: #8B5CF6; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cBuilt with passion for vaporwave aesthetics and modern web technologies.',
    'color: #A855F7; font-size: 12px;'
);
console.log(
    '%cFind me on GitHub: https://github.com/Carloj005',
    'color: #00FFFF; font-size: 12px;'
);