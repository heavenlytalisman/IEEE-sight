// Enhanced IEEE SIGHT Chapter Website JavaScript - Complete Final Version
// =======================================================================

// Global Configuration
const CONFIG = {
    animationDuration: 300,
    scrollThreshold: 100,
    apiEndpoint: '/api/',
    enableAnalytics: true,
    enableNotifications: true
};

// Utility Functions
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
    
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },
    
    createElement: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        if (content) element.innerHTML = content;
        return element;
    }
};

// Simplified Loading Screen Manager
class LoadingScreenManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainLogo = document.getElementById('main-logo-loading');
        this.isComplete = false;
        this.init();
    }
    
    init() {
        if (!this.loadingScreen) return;
        
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';
        
        // Handle logo loading
        this.setupLogoLoading();
        
        // Handle actual page load
        this.trackRealProgress();
    }
    
    setupLogoLoading() {
        if (this.mainLogo) {
            // Handle logo load success
            this.mainLogo.addEventListener('load', () => {
                console.log('✅ IEEE SIGHT logo loaded successfully');
            });
            
            // Handle logo load error
            this.mainLogo.addEventListener('error', () => {
                console.warn('⚠️ IEEE SIGHT logo failed to load, using fallback');
            });
            
            // If logo is already loaded (cached)
            if (this.mainLogo.complete && this.mainLogo.naturalWidth > 0) {
                console.log('✅ IEEE SIGHT logo already cached');
            }
        }
    }
    
    trackRealProgress() {
        // Window Load - Complete when everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.completeLoading();
            }, 1500); // Show for at least 1.5 seconds for aesthetic effect
        });
        
        // Fallback: Complete after maximum time
        setTimeout(() => {
            if (!this.isComplete) {
                this.completeLoading();
            }
        }, 8000); // Maximum 8 seconds
    }
    
    completeLoading() {
        if (this.isComplete || !this.loadingScreen) return;
        
        this.isComplete = true;
        
        // Hide loading screen with fade out
        this.loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            
            // Trigger page entrance animations
            this.triggerPageAnimations();
            
            // Clean up
            this.cleanup();
        }, 800);
    }
    
    triggerPageAnimations() {
        // Trigger reveal animations for page content
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
        revealElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 100);
        });
        
        // Log successful load
        console.log('🎉 IEEE SIGHT website loaded with official colors!');
    }
    
    cleanup() {
        // Remove loading screen from DOM to free memory
        setTimeout(() => {
            if (this.loadingScreen && this.loadingScreen.parentNode) {
                this.loadingScreen.parentNode.removeChild(this.loadingScreen);
            }
        }, 1000);
    }
    
    // Public method to manually complete loading (for development)
    forceComplete() {
        this.completeLoading();
    }
}

// Enhanced Navigation Manager
class EnhancedNavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('navLinks');
        this.navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');
        this.init();
    }
    
    init() {
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupActiveNavigation();
        this.setupKeyboardNavigation();
    }
    
    setupMobileNavigation() {
        if (this.hamburger && this.navLinks) {
            this.hamburger.addEventListener('click', () => this.toggleMobileNav());
            this.hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileNav();
                }
            });
        }
    }
    
    toggleMobileNav() {
        const isOpen = this.navLinks.classList.toggle('show');
        this.hamburger.classList.toggle('active');
        this.hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    
    setupSmoothScrolling() {
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    // Update active state
                    this.navLinkItems.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (this.navLinks.classList.contains('show')) {
                        this.toggleMobileNav();
                    }
                }
            });
        });
    }
    
    setupScrollEffects() {
        const debouncedScroll = utils.debounce(() => {
            const scrolled = window.pageYOffset;
        }, 10);
        
        window.addEventListener('scroll', debouncedScroll, { passive: true });
    }
    
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const updateActiveNav = utils.throttle(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.offsetHeight;
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100);
        
        window.addEventListener('scroll', updateActiveNav, { passive: true });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks.classList.contains('show')) {
                this.toggleMobileNav();
            }
        });
    }
}

// Text Background Manager
class TextBackgroundManager {
    constructor() {
        this.container = document.querySelector('.text-background');
        this.texts = [
            'IEEE SIGHT',
            'HUMANITARIAN TECHNOLOGY',
            'SUSTAINABLE DEVELOPMENT',
            'COMMUNITY IMPACT',
            'INNOVATION FOR GOOD',
            'TECHNOLOGY FOR HUMANITY',
            'GLOBAL NETWORK',
            'ENGINEERING SOLUTIONS',
            'SOCIAL GOOD',
            'TECH FOR ALL'
        ];
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.setupResponsiveText();
        this.addDynamicElements();
    }
    
    setupResponsiveText() {
        const updateTextCount = () => {
            const isMobile = window.innerWidth <= 768;
            const maxTexts = isMobile ? 4 : 8;
            
            const existingTexts = this.container.querySelectorAll('.moving-text');
            existingTexts.forEach((text, index) => {
                text.style.display = index < maxTexts ? 'block' : 'none';
            });
        };
        
        window.addEventListener('resize', utils.debounce(updateTextCount, 250));
        updateTextCount();
    }
    
    addDynamicElements() {
        setInterval(() => {
            this.updateRandomText();
        }, 8000);
    }
    
    updateRandomText() {
        const movingTexts = this.container.querySelectorAll('.moving-text:not(.vertical)');
        if (movingTexts.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * movingTexts.length);
        const randomText = this.texts[Math.floor(Math.random() * this.texts.length)];
        
        const targetElement = movingTexts[randomIndex];
        targetElement.style.opacity = '0';
        
        setTimeout(() => {
            targetElement.textContent = randomText;
            targetElement.style.opacity = '';
        }, 500);
    }
}

// Interactive SVG Manager
class InteractiveSVGManager {
    constructor() {
        this.svg = document.getElementById('interactive-graphic');
        this.nodes = [];
        this.init();
    }
    
    init() {
        if (!this.svg) return;
        
        this.nodes = this.svg.querySelectorAll('.node');
        this.setupNodeInteraction();
        this.setupResponsiveVisibility();
    }
    
    setupNodeInteraction() {
        this.svg.addEventListener('mousemove', (e) => {
            const pt = this.svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const cursor = pt.matrixTransform(this.svg.getScreenCTM().inverse());
            
            this.nodes.forEach(node => {
                const dx = cursor.x - node.cx.baseVal.value;
                const dy = cursor.y - node.cy.baseVal.value;
                const distance = Math.hypot(dx, dy);
                
                if (distance < 50) {
                    node.setAttribute('r', 12);
                    node.setAttribute('fill-opacity', 1);
                } else {
                    node.setAttribute('r', 8);
                    node.setAttribute('fill-opacity', 0.8);
                }
            });
        });
        
        this.svg.addEventListener('mouseleave', () => {
            this.nodes.forEach(node => {
                node.setAttribute('r', 8);
                node.setAttribute('fill-opacity', 0.8);
            });
        });
    }
    
    setupResponsiveVisibility() {
        const updateVisibility = () => {
            const isMobile = window.innerWidth <= 768;
            this.svg.style.display = isMobile ? 'none' : 'block';
        };
        
        window.addEventListener('resize', utils.debounce(updateVisibility, 250));
        updateVisibility();
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.setupRevealAnimations();
        this.setupCounterAnimations();
        this.setupTypingAnimation();
    }
    
    setupRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupCounterAnimations() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('[data-count]');
                    counters.forEach(counter => {
                        this.animateCounter(counter, parseInt(counter.dataset.count));
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target >= 100 ? '+' : target >= 5 ? '' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }
    
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const text = typingElement.dataset.text;
            typingElement.textContent = '';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    typingElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    typingElement.classList.add('typing-complete');
                }
            };
            
            setTimeout(typeWriter, 2000);
        }
    }
}

// Tab Management
class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.init();
    }
    
    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => this.switchTab(button.dataset.tab));
        });
    }
    
    switchTab(targetTab) {
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === targetTab);
        });
        
        this.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === targetTab);
        });
    }
}

// Filter Management
class FilterManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.activityCards = document.querySelectorAll('.activity-card');
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterActivities(button.dataset.filter));
        });
    }
    
    filterActivities(filter) {
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.activityCards.forEach(item => {
            const categories = item.dataset.category;
            if (filter === 'all' || (categories && categories.includes(filter))) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, CONFIG.animationDuration);
            }
        });
    }
}

// Form Management
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.setupFormValidation(this.contactForm);
        }
    }
    
    setupFormValidation(form) {
        const fields = form.querySelectorAll('[required]');
        
        fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.name}-error`);
        let isValid = true;
        let errorMessage = '';
        
        if (!value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        } else if (field.type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        field.classList.toggle('error', !isValid);
        
        return isValid;
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
    }
    
    getFieldLabel(field) {
        const form = field.closest('form');
        const label = form.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }
    
    async handleFormSubmission(form) {
        const fields = form.querySelectorAll('[required]');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors before submitting.', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'block';
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'block';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        // Simple notification system using IEEE colors
        const notification = utils.createElement('div', {
            className: `notification notification-${type}`,
            style: `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem;
                background: ${type === 'success' ? '#00843D' : type === 'error' ? '#dc3545' : '#00629B'};
                color: white;
                border-radius: 0.5rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `
        }, `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="margin-left: 1rem; background: none; border: none; color: white; cursor: pointer;">&times;</button>
        `);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        if (!document.querySelector('style[data-notifications]')) {
            style.setAttribute('data-notifications', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// Modal Management
class ModalManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.createModalElements();
        this.setupModalTriggers();
    }
    
    createModalElements() {
        if (!document.getElementById('modal-overlay')) {
            const modalHTML = `
                <div class="modal-overlay" id="modal-overlay" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                ">
                    <div class="modal" id="modal" style="
                        background: white;
                        border-radius: 1rem;
                        max-width: 600px;
                        width: 90%;
                        max-height: 80vh;
                        overflow-y: auto;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    ">
                        <div class="modal-header" style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 1.5rem;
                            border-bottom: 1px solid #e0e6ed;
                        ">
                            <h3 class="modal-title" id="modal-title" style="margin: 0; color: #00629B;"></h3>
                            <button class="modal-close" id="modal-close" style="
                                background: none;
                                border: none;
                                font-size: 1.5rem;
                                cursor: pointer;
                                padding: 0.5rem;
                                border-radius: 0.25rem;
                                transition: background 0.2s;
                            ">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body" style="padding: 1.5rem;"></div>
                        <div class="modal-footer" id="modal-footer" style="padding: 1.5rem; border-top: 1px solid #e0e6ed;"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.modalFooter = document.getElementById('modal-footer');
        this.modalClose = document.getElementById('modal-close');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.hide());
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.hide();
                }
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.style.display === 'flex') {
                this.hide();
            }
        });
    }
    
    setupModalTriggers() {
        // Member card modals
        document.querySelectorAll('.interactive-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.member) {
                    this.showMemberModal(card.dataset.member);
                }
            });
        });
        
        // Activity detail modals
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.activity-card');
                if (card) {
                    this.showActivityModal(card);
                }
            });
        });
    }
    
    show(title, body, footer = '') {
        if (this.modalTitle) this.modalTitle.textContent = title;
        if (this.modalBody) this.modalBody.innerHTML = body;
        if (this.modalFooter) this.modalFooter.innerHTML = footer;
        
        this.modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            if (this.modalClose) this.modalClose.focus();
        }, 100);
    }
    
    hide() {
        if (this.modalOverlay) {
            this.modalOverlay.style.display = 'none';
        }
        document.body.style.overflow = '';
    }
    
    showMemberModal(memberType) {
        const memberData = this.getMemberData(memberType);
        const body = `
            <div class="modal-member">
                <div class="modal-member-info">
                    <h3>${memberData.name}</h3>
                    <p class="position">${memberData.position}</p>
                    <p class="credentials">${memberData.credentials}</p>
                    <p class="bio">${memberData.bio}</p>
                    <div class="contact-options" style="margin-top: 1rem;">
                        <a href="mailto:${memberData.email}" class="btn primary" style="margin-right: 1rem;">Send Email</a>
                        <a href="${memberData.linkedin}" class="btn secondary" target="_blank">LinkedIn</a>
                    </div>
                </div>
            </div>
        `;
        this.show(memberData.name, body);
    }
    
    showActivityModal(card) {
        const title = card.querySelector('h3')?.textContent || 'Activity Details';
        const description = card.querySelector('p')?.textContent || 'No description available.';
        const date = card.querySelector('.activity-date')?.textContent || 'TBD';
        const type = card.querySelector('.activity-type')?.textContent || 'Event';
        
        const body = `
            <div class="modal-activity">
                <div class="activity-meta" style="margin-bottom: 1rem;">
                    <span class="date" style="color: #00629B; font-weight: 500;">${date}</span>
                    <span class="type" style="background: rgba(0, 98, 155, 0.1); color: #00629B; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; margin-left: 1rem;">${type}</span>
                </div>
                <p class="description" style="margin-bottom: 1rem; line-height: 1.6;">${description}</p>
                <div class="activity-actions">
                    <button class="btn primary" style="margin-right: 1rem;">Register Interest</button>
                    <button class="btn secondary">Share Event</button>
                </div>
            </div>
        `;
        this.show(title, body);
    }
    
    getMemberData(memberType) {
        const memberData = {
            chair: {
                name: 'Dr. John Doe',
                position: 'Chapter Chair',
                credentials: 'IEEE Senior Member',
                bio: 'Leading humanitarian technology initiatives with 8+ years of IEEE volunteering experience in sustainable development projects.',
                email: 'chair@ieee-sight.org',
                linkedin: '#'
            },
            'vice-chair': {
                name: 'Jane Smith',
                position: 'Vice Chair',
                credentials: 'IEEE Member',
                bio: 'Specializing in community outreach and sustainable development projects with focus on education technology.',
                email: 'vicechair@ieee-sight.org',
                linkedin: '#'
            },
            secretary: {
                name: 'Mike Johnson',
                position: 'Secretary',
                credentials: 'IEEE Student Member',
                bio: 'Coordinating chapter activities and maintaining member engagement through innovative communication strategies.',
                email: 'secretary@ieee-sight.org',
                linkedin: '#'
            }
        };
        return memberData[memberType] || {};
    }
}


// Performance Monitor
class PerformanceMonitor {
    constructor() {
        if (CONFIG.enableAnalytics) {
            this.init();
        }
    }
    
    init() {
        this.measurePageLoad();
        this.setupErrorTracking();
    }
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('🎯 IEEE SIGHT Performance:', {
                        pageLoadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        firstByte: Math.round(perfData.responseStart - perfData.requestStart)
                    });
                }
            }, 0);
        });
    }
    
    setupErrorTracking() {
        window.addEventListener('error', (event) => {
            console.error('IEEE SIGHT Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno
            });
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('IEEE SIGHT Promise Rejection:', event.reason);
        });
    }
}

// Main Application Class
class IEEESIGHTApp {
    constructor() {
        this.managers = new Map();
        this.init();
    }
    
    async init() {
        try {
            // Initialize loading screen FIRST
            this.initializeManager('loadingScreen', LoadingScreenManager);
            
            // Initialize all other managers
            this.initializeManager('navigation', EnhancedNavigationManager);
            this.initializeManager('textBackground', TextBackgroundManager);
            this.initializeManager('interactiveSVG', InteractiveSVGManager);
            this.initializeManager('animation', AnimationManager);
            this.initializeManager('tab', TabManager);
            this.initializeManager('filter', FilterManager);
            this.initializeManager('form', FormManager);
            this.initializeManager('modal', ModalManager);
            this.initializeManager('backToTop', BackToTopManager);
            this.initializeManager('performance', PerformanceMonitor);
            
            // Setup additional features
            this.setupUtilityFeatures();
            this.updateYear();
            
            console.log('🎉 IEEE SIGHT Chapter website fully loaded with official colors!');
            
        } catch (error) {
            console.error('❌ Failed to initialize IEEE SIGHT App:', error);
            // Force complete loading screen even if there's an error
            const loadingManager = this.getManager('loadingScreen');
            if (loadingManager) {
                loadingManager.forceComplete();
            }
        }
    }
    
    initializeManager(name, ManagerClass) {
        try {
            const manager = new ManagerClass();
            this.managers.set(name, manager);
            console.log(`✅ ${name} manager initialized`);
        } catch (error) {
            console.error(`❌ Failed to initialize ${name} manager:`, error);
        }
    }
    
    getManager(name) {
        return this.managers.get(name);
    }
    
    setupUtilityFeatures() {
        this.setupRippleEffect();
        this.setupLazyLoading();
        this.setupCopyToClipboard();
    }
    
    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.btn')) return;
            
            const button = e.target;
            const ripple = utils.createElement('span', { 
                className: 'ripple',
                style: 'position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple-animation 0.6s linear; pointer-events: none;'
            });
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText += `width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;`;
            
            // Add animation keyframes if not exist
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = '@keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }';
                document.head.appendChild(style);
            }
            
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    setupCopyToClipboard() {
        document.addEventListener('contextmenu', async (e) => {
            const link = e.target.closest('.contact-link[href^="mailto:"], .contact-link[href^="tel:"]');
            if (!link) return;
            
            e.preventDefault();
            const text = link.href.replace(/^(mailto:|tel:)/, '');
            
            try {
                await navigator.clipboard.writeText(text);
                console.log('📋 Copied to clipboard:', text);
                
                // Show temporary feedback
                const originalText = link.textContent;
                link.textContent = 'Copied!';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 1000);
                
            } catch (error) {
                console.warn('Clipboard copy failed:', error);
            }
        });
    }
    
    updateYear() {
        const yearElements = document.querySelectorAll('#year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
}

// Initialize application when DOM is ready
(() => {
    try {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.IEEESIGHTApp = new IEEESIGHTApp();
            });
        } else {
            window.IEEESIGHTApp = new IEEESIGHTApp();
        }
    } catch (error) {
        console.error('Failed to initialize IEEE SIGHT Application:', error);
        document.body.classList.add('js-error');
    }
})();

// Export for testing purposes
window.IEEESIGHTApp = IEEESIGHTApp;
