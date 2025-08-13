// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initScrollAnimations();
    initCounterAnimations();
    initParallaxEffects();
    initHoverEffects();
    initTextAnimations();
    initIntersectionObserver();
});

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Enhanced mobile menu with animations
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans.style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
}

// Enhanced smooth scrolling with easing
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Custom smooth scroll with easing
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced scroll effects with hide/show navigation
function initScrollEffects() {
    const header = document.querySelector('.main-nav');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Enhanced scrolling animations with multiple text elements
function initScrollAnimations() {
    const scrollingSections = document.querySelectorAll('.scrolling-bg');
    
    scrollingSections.forEach((section, index) => {
        const scrollingText = section.querySelector('.scrolling-text');
        if (scrollingText) {
            const originalText = scrollingText.textContent.trim();
            // Create seamless infinite scroll effect
            const repeatedText = Array(10).fill(originalText).join(' ');
            scrollingText.textContent = repeatedText;
            
            // Add random animation delays for variety
            scrollingText.style.animationDelay = `${index * 0.5}s`;
            scrollingText.style.animationDuration = `${20 + index * 2}s`;
        }
    });
}

// Enhanced counter animations with easing
function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
                
                // Add bounce animation
                entry.target.style.animation = 'bounceIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, '')) || 0;
    const prefix = text.match(/^\+/) ? '+' : '';
    const suffix = text.match(/H$/) ? 'H' : '';
    
    if (number > 0) {
        let current = 0;
        const increment = number / 60; // Smoother animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = prefix + number + suffix;
                clearInterval(timer);
                // Add completion pulse effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = prefix + Math.floor(current) + suffix;
            }
        }, 20);
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax for scrolling backgrounds
        const scrollingBgs = document.querySelectorAll('.scrolling-bg');
        scrollingBgs.forEach((bg, index) => {
            bg.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
        });
        
        // Parallax for hero elements
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
    
    // Stats section hover effects
    const statsSections = document.querySelectorAll('.stats-section');
    statsSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Text animations on scroll
function initTextAnimations() {
    const animatedTexts = document.querySelectorAll('.mission-title, .section-title, .stats-title');
    
    animatedTexts.forEach(text => {
        // Split text into individual letters for animation
        const letters = text.textContent.split('');
        text.textContent = '';
        
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s`;
            text.appendChild(span);
        });
    });
}

// Enhanced intersection observer for all animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate text letters
                const textSpans = entry.target.querySelectorAll('span');
                textSpans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
                
                // Animate challenge items with delay
                const challengeItems = entry.target.querySelectorAll('.challenge-item');
                challengeItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements
    const elementsToAnimate = document.querySelectorAll('section, .mission-title, .stats-title, .section-title, .challenge-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const maxTrail = 20;
    
    document.addEventListener('mousemove', function(e) {
        trail.unshift({ x: e.clientX, y: e.clientY });
        
        if (trail.length > maxTrail) {
            trail.pop();
        }
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.style.position = 'fixed';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.width = '4px';
            trailElement.style.height = '4px';
            trailElement.style.backgroundColor = `rgba(0, 0, 0, ${(maxTrail - index) / maxTrail * 0.2})`;
            trailElement.style.borderRadius = '50%';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9998';
            trailElement.style.transition = 'all 0.1s ease';
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.remove();
            }, 200);
        });
    });
}

// Initialize mouse trail (optional - can be commented out if too distracting)
// initMouseTrail();

// Page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Add loading states
function showLoading(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.position = 'absolute';
    spinner.style.top = '50%';
    spinner.style.left = '50%';
    spinner.style.transform = 'translate(-50%, -50%)';
    element.style.position = 'relative';
    element.appendChild(spinner);
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    const spinner = element.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Performance optimization
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

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);
