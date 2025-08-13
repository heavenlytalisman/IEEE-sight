// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarNav = navbarMenu.querySelector('.navbar-nav');
    
    navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        navbarNav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbarMenu.contains(event.target) && !navbarToggle.contains(event.target)) {
            navbarToggle.classList.remove('active');
            navbarNav.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            navbarNav.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Button Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to find buttons by text content
    function findButtonsByText(text) {
        const buttons = document.querySelectorAll('.btn');
        return Array.from(buttons).filter(btn => btn.textContent.trim().includes(text));
    }
    
    // Become a Member / Join Now buttons
    const becomeMemberButtons = [
        ...findButtonsByText('Become a Member'),
        ...findButtonsByText('Join Now')
    ];
    becomeMemberButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://sight.ieee.org/membership/', '_blank');
        });
    });
    
    // Find SIGHT Group / Search Groups buttons
    const findGroupButtons = [
        ...findButtonsByText('Find a SIGHT Group'),
        ...findButtonsByText('Search Groups')
    ];
    findGroupButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://sight.ieee.org/groups/', '_blank');
        });
    });
    
    // Start a SIGHT Group / Learn More buttons (in get involved section)
    const startGroupButtons = [
        ...findButtonsByText('Start a SIGHT Group'),
        ...document.querySelectorAll('.involvement-card .btn').filter(btn => 
            btn.textContent.trim().includes('Learn More'))
    ];
    startGroupButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://sight.ieee.org/start-a-group/', '_blank');
        });
    });
    
    // Apply for Opportunities / View Opportunities buttons
    const opportunityButtons = [
        ...findButtonsByText('Apply for Opportunities'),
        ...findButtonsByText('View Opportunities')
    ];
    opportunityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://sight.ieee.org/opportunities/', '_blank');
        });
    });
    
    // Find Your Local Group button
    const localGroupButtons = findButtonsByText('Find Your Local Group');
    localGroupButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.open('https://sight.ieee.org/groups/', '_blank');
        });
    });
    
    // Add specific handlers for each involvement card button
    const involvementCards = document.querySelectorAll('.involvement-card');
    involvementCards.forEach((card, index) => {
        const button = card.querySelector('.btn');
        if (button) {
            switch(index) {
                case 0: // Become a Member
                    button.addEventListener('click', function() {
                        window.open('https://sight.ieee.org/membership/', '_blank');
                    });
                    break;
                case 1: // Find a SIGHT Group
                    button.addEventListener('click', function() {
                        window.open('https://sight.ieee.org/groups/', '_blank');
                    });
                    break;
                case 2: // Start a SIGHT Group
                    button.addEventListener('click', function() {
                        window.open('https://sight.ieee.org/start-a-group/', '_blank');
                    });
                    break;
                case 3: // Apply for Opportunities
                    button.addEventListener('click', function() {
                        window.open('https://sight.ieee.org/opportunities/', '_blank');
                    });
                    break;
            }
        }
    });
});

// Card Animation on Scroll
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.program-card, .involvement-card, .news-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize animations when page loads
window.addEventListener('load', animateCardsOnScroll);

// Scroll to Top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
window.addEventListener('load', createScrollToTopButton);

// Enhanced accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation support for cards
    const interactiveCards = document.querySelectorAll('.program-card, .involvement-card, .news-card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Announce page sections for screen readers
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        section.setAttribute('role', 'region');
        const heading = section.querySelector('h2, h3');
        if (heading) {
            const headingId = heading.id || `heading-${section.id}`;
            heading.id = headingId;
            section.setAttribute('aria-labelledby', headingId);
        }
    });
});

// Print styles optimization
window.addEventListener('beforeprint', function() {
    // Expand mobile menu for printing
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        navbarNav.style.display = 'flex';
        navbarNav.style.position = 'static';
        navbarNav.style.flexDirection = 'row';
        navbarNav.style.background = 'transparent';
        navbarNav.style.boxShadow = 'none';
    }
});

// Error handling for external links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('http')) {
        e.target.addEventListener('error', function() {
            console.warn('Failed to load external link:', this.href);
        });
    }
});

// Performance optimization: Lazy load images if any are added dynamically
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
window.addEventListener('load', setupLazyLoading);

// Form validation (for any future forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for debouncing scroll events
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

// Apply debouncing to scroll events for better performance
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks for analytics
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Placeholder for service worker registration
        console.log('Service Worker support detected');
    });
}