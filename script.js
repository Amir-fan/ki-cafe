// ===== KI COFFEE WEBSITE - ENHANCED JAVASCRIPT =====

class KICoffeeWebsite {
    constructor() {
        this.init();
        this.performanceMetrics = {
            startTime: performance.now(),
            interactions: 0,
            scrollDepth: 0
        };
    }

    init() {
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupMenuAnimations();
        this.setupContactForm();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        this.setupAnalytics();
        this.setupAdvancedFeatures();
        this.setupErrorHandling();
    }

    // ===== ENHANCED SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                
                    // Update URL without page jump
                    history.pushState(null, null, anchor.getAttribute('href'));
                    
                    // Track navigation
                    this.trackEvent('navigation', {
                        from: window.location.hash || 'top',
                        to: anchor.getAttribute('href')
                    });
                }
            });
        });
    }

    // ===== ENHANCED INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Add staggered animation for menu items
                    if (entry.target.classList.contains('menu-grid')) {
                        const menuItems = entry.target.querySelectorAll('.menu-item');
                        menuItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '0';
                                item.style.transform = 'translateY(20px)';
                                item.style.transition = 'all 0.6s ease-out';
                                
                                setTimeout(() => {
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateY(0)';
                                }, 50);
                            }, index * 100);
                        });
                    }
                    
                    // Track scroll depth
                    this.trackScrollDepth(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and menu items
        document.querySelectorAll('section, .menu-grid').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== ENHANCED PARALLAX EFFECTS =====
    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.brush-texture::before');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // ===== ENHANCED MENU ANIMATIONS =====
    setupMenuAnimations() {
        // Add hover effects to menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });

            item.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });

            item.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
            });
        });

        // Add hover effects to category headers
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });

            header.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });

            header.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = '0 8px 25px var(--shadow-medium)';
    }

    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    addClickEffect(element) {
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    // ===== ENHANCED CONTACT FORM =====
    setupContactForm() {
        // Instagram link
        const instagramLink = document.querySelector('.contact-link[href="#"]');
        if (instagramLink) {
            instagramLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleContactClick('https://instagram.com/kicoffee_mersin');
            });
        }

        // Phone number
        const phoneElement = document.querySelector('.contact-item:has(.fa-phone) p');
        if (phoneElement) {
            phoneElement.addEventListener('click', () => {
                this.handlePhoneClick('+90 XXX XXX XX XX');
            });
        }

        // Map functionality removed - now using actual Google Maps embed
    }

    handleContactClick(url) {
        this.trackEvent('contact_click', { type: 'instagram' });
        
        // Show loading state
        const link = document.querySelector('.contact-link[href="#"]');
        if (link) {
            link.classList.add('loading');
            setTimeout(() => {
                link.classList.remove('loading');
                window.open(url, '_blank');
                this.showNotification('Opening Instagram profile...', 'success');
            }, 500);
        }
    }

    handlePhoneClick(phoneNumber) {
        this.trackEvent('contact_click', { type: 'phone' });
        
        // Copy to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
            this.showNotification('Phone number copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Could not copy phone number', 'error');
        });
    }

    // handleMapClick method removed - now using actual Google Maps embed

    // ===== ENHANCED PERFORMANCE OPTIMIZATIONS =====
    setupPerformanceOptimizations() {
        this.setupLazyLoading();
        this.debounceScrollEvents();
        this.preloadImages();
        this.setupServiceWorker();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    debounceScrollEvents() {
        let scrollTimeout;
        
        function updateScroll() {
            // Update scroll-based effects
            const scrolled = window.pageYOffset;
            const navbar = document.querySelector('nav');
            
            if (navbar) {
                if (scrolled > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
        }

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateScroll, 10);
        });
    }

    preloadImages() {
        const criticalImages = [
            'images/ki.png',
            'images/latte-250616120601.jpg',
            'images/cappuchino-250616120659.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // ===== ENHANCED ACCESSIBILITY =====
    setupAccessibility() {
        this.setupKeyboardNavigation();
        this.setupFocusIndicators();
        this.setupARIALabels();
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('[x-show="mobileMenuOpen"]');
                if (mobileMenu && mobileMenu.style.display !== 'none') {
                    // Trigger Alpine.js to close menu
                    const event = new CustomEvent('closeMobileMenu');
                    document.dispatchEvent(event);
                }
            }
        });
    }

    setupFocusIndicators() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    setupARIALabels() {
        // Add ARIA labels to interactive elements
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            const title = item.querySelector('h3')?.textContent;
            if (title) {
                item.setAttribute('aria-label', `Menu item: ${title}`);
            }
        });

        const categoryHeaders = document.querySelectorAll('.category-header');
        categoryHeaders.forEach(header => {
            const text = header.querySelector('span')?.textContent;
            if (text) {
                header.setAttribute('aria-label', `Toggle ${text} menu`);
            }
        });
    }

    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.style.setProperty('--transition-slow', 'none');
        }
    }

    // ===== ENHANCED ANALYTICS =====
    setupAnalytics() {
        this.trackMenuInteractions();
        this.trackScrollDepth();
        this.trackTimeOnPage();
        this.trackPerformance();
    }

    trackMenuInteractions() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const title = item.querySelector('h3')?.textContent;
                const price = item.querySelector('.price-badge')?.textContent;
                
                this.trackEvent('menu_item_click', {
                    item: title,
                    price: price,
                    category: this.getCategoryFromItem(item)
                });
            });
        });
    }

    getCategoryFromItem(item) {
        const categoryHeader = item.closest('.mb-8')?.querySelector('.category-header span');
        return categoryHeader?.textContent || 'Unknown';
    }

    trackScrollDepth(target) {
        const section = target.closest('section');
        if (section) {
            const sectionId = section.id;
            const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            this.trackEvent('scroll_depth', {
                section: sectionId,
                percentage: scrollPercentage
            });
        }
    }

    trackTimeOnPage() {
        setInterval(() => {
            const timeOnPage = Math.round((performance.now() - this.performanceMetrics.startTime) / 1000);
            this.trackEvent('time_on_page', { seconds: timeOnPage });
        }, 30000); // Track every 30 seconds
    }

    trackPerformance() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.performanceMetrics.startTime;
            this.trackEvent('page_load_time', { milliseconds: Math.round(loadTime) });
        });
    }

    trackEvent(eventName, data = {}) {
        this.performanceMetrics.interactions++;
        
        // Console logging for development
        console.log(`📊 Event: ${eventName}`, data);
        
        // In a real implementation, this would send to Google Analytics or similar
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    // ===== ENHANCED NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        return colors[type] || '#3B82F6';
    }

    // ===== ADVANCED FEATURES =====
    setupAdvancedFeatures() {
        this.setupImageZoom();
        this.setupMenuSearch();
        this.setupThemeToggle();
        this.setupOfflineSupport();
    }

    setupImageZoom() {
        document.querySelectorAll('.menu-item img').forEach(img => {
            img.addEventListener('click', () => {
                this.showImageModal(img.src, img.alt);
            });
        });
    }

    showImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${src}" alt="${alt}">
                </div>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const overlay = modal.querySelector('.modal-overlay');
        overlay.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;

        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            position: relative;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        `;

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            z-index: 1;
        `;

        const modalImg = modal.querySelector('img');
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            display: block;
        `;

        document.body.appendChild(modal);

        // Close functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    setupMenuSearch() {
        // Add search functionality to menu
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search menu items...';
        searchInput.className = 'menu-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 12px 16px;
            border: 2px solid var(--primary);
            border-radius: 8px;
            margin: 20px auto;
            display: block;
            font-size: 16px;
            background: white;
        `;

        const menuSection = document.querySelector('#menu .container');
        if (menuSection) {
            menuSection.insertBefore(searchInput, menuSection.firstChild);

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filterMenuItems(query);
            });
        }
    }

    filterMenuItems(query) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase();
            const description = item.querySelector('p')?.textContent.toLowerCase();
            
            if (title?.includes(query) || description?.includes(query)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0.3';
            }
        });
    }

    setupThemeToggle() {
        // Add theme toggle functionality
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px var(--shadow-medium);
            transition: var(--transition);
        `;

        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }

    setupOfflineSupport() {
        // Add offline support
        window.addEventListener('online', () => {
            this.showNotification('You are back online!', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are offline. Some features may not work.', 'warning');
        });
    }

    // ===== ERROR HANDLING =====
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.trackEvent('promise_rejection', {
                reason: e.reason
            });
        });
    }

    // ===== UTILITY METHODS =====
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

    throttle(func, limit) {
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
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    new KICoffeeWebsite();
});

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 