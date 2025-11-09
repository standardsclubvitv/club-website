// BIS Standards Club - Enhanced JavaScript
// Optimized for smooth performance and modern features with dynamic page rendering

class BISClubWebsite {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.slideInterval = null;
        this.isMenuOpen = false;
        // Add touch/swipe variables as class properties
        this.startX = 0;
        this.endX = 0;
        // Performance monitoring
        this.performanceMetrics = {
            initStart: performance.now()
        };
        // Page renderer instance
        this.pageRenderer = null;
        
        this.init();
    }

    init() {
        // Load data and initialize renderer
        this.loadDataAndRender().then(() => {
            // Wait for DOM to be fully ready before initializing mobile menu
            setTimeout(() => {
                this.initMobileMenu();
                this.initSmoothScrolling();
                console.log('✅ Mobile menu initialized');
            }, 100);
            
            // Use requestIdleCallback for non-critical initializations
            if (window.requestIdleCallback) {
                window.requestIdleCallback(() => {
                    this.initParticles();
                    this.initSliderIntegration();
                    this.initAnimations();
                    this.logPerformance('Critical features initialized');
                });
                
                window.requestIdleCallback(() => {
                    this.initScrollEffects();
                    this.initHeaderScrollEffect();
                    this.initLazyLoading();
                    this.preloadImages();
                    this.logPerformance('All features initialized');
                });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    this.initParticles();
                    this.initSliderIntegration();
                    this.initScrollEffects();
                    this.initLazyLoading();
                    this.initAnimations();
                    this.initHeaderScrollEffect();
                    this.preloadImages();
                    this.logPerformance('All features initialized (fallback)');
                }, 0);
            }
        });
    }

    // Load data and initialize page renderer
    async loadDataAndRender() {
        try {
            // Check if CLUB_DATA is available (from data.js)
            if (typeof CLUB_DATA !== 'undefined') {
                this.pageRenderer = new PageRenderer(CLUB_DATA);
                this.pageRenderer.init();
                this.logPerformance('Pages rendered from data');
            } else {
                console.warn('CLUB_DATA not found, using existing HTML content');
            }
        } catch (error) {
            console.error('Error loading page data:', error);
            console.log('Falling back to existing HTML content');
        }
    }

    // Performance monitoring utility
    logPerformance(milestone) {
        const currentTime = performance.now();
        const elapsed = currentTime - this.performanceMetrics.initStart;
        console.log(`🚀 ${milestone}: ${elapsed.toFixed(2)}ms`);
    }

    // Cleanup method
    destroy() {
        // Clear intervals
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        
        // Clean up page renderer
        if (this.pageRenderer) {
            this.pageRenderer.destroy();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        
        console.log('🧹 BIS Club Website cleaned up');
    }

    // Particle Background System (Heavily Optimized)
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            // Adaptive particle count based on device capabilities
            const isMobile = window.innerWidth <= 768;
            const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
            const particleCount = isMobile ? (isLowEnd ? 20 : 35) : (isLowEnd ? 50 : 80);
            
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: particleCount,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00d4ff', '#0099cc', '#ffffff']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.5,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: isMobile ? 1 : 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'window',
                    events: {
                        onhover: {
                            enable: !isMobile && !isLowEnd, // Disable on mobile and low-end devices
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: !isMobile, // Disable click on mobile for better performance
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Slider Integration (works with PageRenderer)
    initSliderIntegration() {
        // This method integrates with the PageRenderer's slider
        // The actual slider is now handled by PageRenderer
        if (this.pageRenderer) {
            console.log('🎯 Slider integrated with PageRenderer');
        } else {
            // Fallback for existing HTML slider
            this.initFallbackSlider();
        }
    }

    // Fallback slider for existing HTML content
    initFallbackSlider() {
        this.slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (this.slides.length === 0) return;

        // Initialize slider
        this.showSlide(0);
        
        // Auto-slide functionality
        this.startAutoSlide();
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Touch/swipe support
        this.initTouchSupport();
    }

    showSlide(index) {
        if (!this.slides || this.slides.length === 0) return;
        
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            const currentDot = document.querySelectorAll('.dot')[index];
            if (currentDot) currentDot.classList.add('active');
        }
        
        this.currentSlide = index;
    }

    nextSlide() {
        if (!this.slides || this.slides.length === 0) return;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.restartAutoSlide();
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    restartAutoSlide() {
        this.pauseAutoSlide();
        this.startAutoSlide();
    }

    // Touch/Swipe Support - Fixed version
    initTouchSupport() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        }, { passive: true });

        hero.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });

        hero.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            hero.addEventListener('mouseup', this.handleMouseUp.bind(this));
        });
    }

    handleMouseUp = (e) => {
        const hero = document.querySelector('.hero');
        this.endX = e.clientX;
        this.handleSwipe();
        hero.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleSwipe() {
        const threshold = 50;
        const diff = this.startX - this.endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }

    // Mobile Menu
    initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav ul');
        
        if (!menuBtn) {
            console.error('❌ Mobile menu button not found!');
            return;
        }
        
        if (!nav) {
            console.error('❌ Navigation menu not found!');
            return;
        }

        console.log('✅ Mobile menu elements found:', { menuBtn, nav });

        // Add click handler to menu button with event delegation
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎯 Menu button clicked!');
            this.toggleMobileMenu();
        }, { passive: false });

        // Close menu when clicking on links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🔗 Nav link clicked, closing menu');
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                console.log('👆 Clicked outside menu, closing');
                this.closeMobileMenu();
            }
        });
        
        console.log('✅ Mobile menu listeners attached');
    }

    toggleMobileMenu() {
        const nav = document.querySelector('nav ul');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        const body = document.body;
        
        if (!nav) {
            console.error('❌ Nav not found in toggleMobileMenu');
            return;
        }
        
        this.isMenuOpen = !this.isMenuOpen;
        
        console.log(`🔄 Toggling menu: ${this.isMenuOpen ? 'OPEN' : 'CLOSED'}`);
        
        if (this.isMenuOpen) {
            nav.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            if (menuBtn) {
                menuBtn.className = 'fas fa-times';
            }
            console.log('✅ Menu opened, active class added');
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const nav = document.querySelector('nav ul');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        const body = document.body;
        
        console.log('🔒 Closing mobile menu');
        
        this.isMenuOpen = false;
        if (nav) {
            nav.classList.remove('active');
            console.log('✅ Menu closed, active class removed');
        }
        body.style.overflow = ''; // Restore scrolling
        if (menuBtn) {
            menuBtn.className = 'fas fa-bars';
        }
    }

    // Header Scroll Effect (Optimized with throttle)
    initHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;
        let scrollTimeout;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            const scrollDifference = Math.abs(scrollY - lastScrollY);
            
            // Only update if scroll difference is significant (reduces repaints)
            if (scrollDifference < 5 && scrollY !== 0) {
                ticking = false;
                return;
            }
            
            // Add/remove scrolled class
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll (only on downward scroll)
            if (scrollY > lastScrollY && scrollY > 300) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        // Debounced scroll handler
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
            
            // Clear any existing timeout
            clearTimeout(scrollTimeout);
            
            // Set a timeout to ensure header is visible after scrolling stops
            scrollTimeout = setTimeout(() => {
                header.classList.remove('hidden');
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Enhanced Smooth Scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Get header height for offset calculation
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    
                    // Calculate target position with proper offset
                    const targetPosition = target.offsetTop - headerHeight - 20; // Extra 20px padding
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: Math.max(0, targetPosition), // Ensure we don't scroll above page
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation state
                    this.updateActiveNavLink(targetId);
                }
            });
        });
        
        // Add scroll listener to update active nav link on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateActiveNavOnScroll();
            }, 100);
        }, { passive: true });
    }
    
    // Update active navigation link
    updateActiveNavLink(targetId) {
        // Remove active class from all nav links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        const activeLink = document.querySelector(`nav a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Update active nav link based on scroll position
    updateActiveNavOnScroll() {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const scrollPosition = window.scrollY + headerHeight + 50;
        
        const sections = ['home', 'about-bis', 'about-club', 'team', 'events', 'contact'];
        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && scrollPosition >= section.offsetTop) {
                currentSection = sectionId;
            }
        });
        
        this.updateActiveNavLink(`#${currentSection}`);
    }

    // Scroll Animations (Optimized)
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smooth animations
                    requestAnimationFrame(() => {
                        entry.target.classList.add('fade-in-up');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation with performance consideration
        const animateElements = document.querySelectorAll('.team-member, .event-card, .section-title, .text-content, .image-content');
        
        // Use requestIdleCallback to observe elements when browser is idle
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
                animateElements.forEach(el => observer.observe(el));
            });
        } else {
            animateElements.forEach(el => observer.observe(el));
        }
    }

    // Enhanced Lazy Loading for Images with Performance Optimization
    initLazyLoading() {
        // Handle images with native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"], img:not([loading])');
        
        // Use Intersection Observer for better performance
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle image load
                    const handleImageLoad = () => {
                        // Use requestAnimationFrame for smooth transition
                        requestAnimationFrame(() => {
                            img.classList.add('loaded');
                            img.style.opacity = '1';
                        });
                    };
                    
                    if (img.complete && img.naturalHeight !== 0) {
                        handleImageLoad();
                    } else {
                        img.addEventListener('load', handleImageLoad, { once: true });
                        img.addEventListener('error', () => {
                            console.warn('Failed to load image:', img.src);
                            img.style.opacity = '0.3';
                            img.alt = 'Image failed to load';
                        }, { once: true });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading slightly before entering viewport
            threshold: 0.01
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease-out';
            imageObserver.observe(img);
        });
        
        // Fallback for browsers without native lazy loading support
        if (!('loading' in HTMLImageElement.prototype)) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.style.opacity = '1';
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Handle data-src images (if any exist)
        const dataSrcImages = document.querySelectorAll('img[data-src]');
        if (dataSrcImages.length > 0) {
            const dataSrcObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        dataSrcObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            dataSrcImages.forEach(img => {
                img.classList.add('lazy');
                img.style.opacity = '0';
                dataSrcObserver.observe(img);
            });
        }
        
        // Preload critical images (logo and hero images)
        this.preloadCriticalImages();
    }
    
    // Preload critical images for instant display
    preloadCriticalImages() {
        const criticalImages = [
            'https://standardsclubvitv.github.io/image-api/images/logo_club.png',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Animation System
    initAnimations() {
        // Add CSS classes for animations
        const style = document.createElement('style');
        style.textContent = `
            .fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .lazy {
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .team-member:hover .member-img {
                transform: scale(1.05);
            }
            
            .parallax {
                transform: translateY(var(--scroll));
            }
        `;
        document.head.appendChild(style);

        // Parallax effect
        this.initParallax();
    }

    // Parallax Scrolling (Optimized)
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Image Preloading
    preloadImages() {
        const imageUrls = [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
            'https://images.unsplash.com/photo-1541178735493-479c1a27ed24'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Utility Methods
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
        }
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.initServiceWorker();
        this.addPreloadHints();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Register service worker with proper scope - adjust based on deployment path
            const swPath = window.location.pathname.includes('/club-website/') ? '/club-website/sw.js' : './sw.js';
            const scopePath = window.location.pathname.includes('/club-website/') ? '/club-website/' : './';
            
            navigator.serviceWorker.register(swPath, { scope: scopePath })
                .then(registration => {
                    console.log('✅ Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                    
                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available, show update notification
                                console.log('🔄 New version available! Please refresh.');
                                // Optionally show a toast/notification to user
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('❌ Service Worker registration failed:', error);
                });
            
            // Handle controller change
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('🔄 Service Worker updated, reloading page...');
                window.location.reload();
            });
        } else {
            console.warn('⚠️ Service Workers not supported in this browser');
        }
    }

    addPreloadHints() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BISClubWebsite();
    new PerformanceOptimizer();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Don't create a new instance, just handle resize
    const website = window.BISClub?.website;
    if (website) {
        website.closeMobileMenu();
    }
});

// Backup mobile menu initialization (in case primary fails)
window.addEventListener('load', () => {
    setTimeout(() => {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav ul');
        
        if (menuBtn && nav) {
            // Check if click handler already exists
            const hasListener = menuBtn.onclick !== null;
            
            if (!hasListener) {
                console.log('⚠️ Backup: Initializing mobile menu');
                menuBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nav.classList.toggle('active');
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                    }
                    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
                    console.log('🎯 Backup menu toggled');
                });
                console.log('✅ Backup mobile menu initialized');
            } else {
                console.log('✅ Mobile menu already has handler');
            }
        }
    }, 500);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Script error:', e.error);
});

// Export for external use
window.BISClub = {
    website: null,
    init() {
        this.website = new BISClubWebsite();
        return this.website;
    }
};