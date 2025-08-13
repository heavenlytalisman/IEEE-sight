// IEEE SIGHT Campus Chapter Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderScroll();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--active');
            navToggle.classList.toggle('nav__toggle--active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('nav__menu--active')) {
                navMenu.classList.remove('nav__menu--active');
                navToggle.classList.remove('nav__toggle--active');
            }
        });
    });

    // Highlight active navigation link
    highlightActiveNavLink();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const ctaButtons = document.querySelectorAll('a[href^="#"]');

    [...navLinks, ...ctaButtons].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(252, 252, 249, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(252, 252, 249, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero__content,
        .section__header,
        .mission__item,
        .impact__content,
        .why-join__item,
        .project__card,
        .team__content,
        .value__item,
        .join__content
    `);

    animatedElements.forEach(el => {
        el.classList.add('animate-fade-up');
        observer.observe(el);
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        const suffix = target.replace(/[\d,]/g, '');
        
        if (numericValue) {
            let current = 0;
            const increment = numericValue / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = numericValue.toLocaleString() + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString() + suffix;
                }
            }, 50);
        }
    });
}

// Initialize counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form handling (if contact form is added)
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission logic here
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            showNotification('Thank you for your interest! We will contact you soon.', 'success');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for scroll effects
const animationStyles = `
.animate-fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-fade-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.nav__link--active {
    color: var(--color-primary) !important;
    position: relative;
}

.nav__link--active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
    border-radius: 1px;
}

@media (max-width: 768px) {
    .nav__menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--color-surface);
        flex-direction: column;
        padding: 20px;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        border-bottom: 1px solid var(--color-border);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .nav__menu--active {
        transform: translateY(0);
        display: flex;
    }
    
    .nav__toggle--active span:first-child {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav__toggle--active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav__toggle--active span:last-child {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

/* Stagger animation delays */
.mission__item:nth-child(1) { animation-delay: 0.1s; }
.mission__item:nth-child(2) { animation-delay: 0.2s; }
.mission__item:nth-child(3) { animation-delay: 0.3s; }
.mission__item:nth-child(4) { animation-delay: 0.4s; }

.why-join__item:nth-child(1) { animation-delay: 0.1s; }
.why-join__item:nth-child(2) { animation-delay: 0.2s; }
.why-join__item:nth-child(3) { animation-delay: 0.3s; }
.why-join__item:nth-child(4) { animation-delay: 0.4s; }

.project__card:nth-child(1) { animation-delay: 0.1s; }
.project__card:nth-child(2) { animation-delay: 0.2s; }
.project__card:nth-child(3) { animation-delay: 0.3s; }

.value__item:nth-child(1) { animation-delay: 0.1s; }
.value__item:nth-child(2) { animation-delay: 0.2s; }
.value__item:nth-child(3) { animation-delay: 0.3s; }
.value__item:nth-child(4) { animation-delay: 0.4s; }
.value__item:nth-child(5) { animation-delay: 0.5s; }
.value__item:nth-child(6) { animation-delay: 0.6s; }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initForms();
});

// Debounce function for scroll events
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

// Optimize scroll event listeners
const debouncedScroll = debounce(function() {
    highlightActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);