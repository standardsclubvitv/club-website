// BIS Standards Club - Enhanced JavaScript
// Optimized for smooth performance and modern features

class BISClubWebsite {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.slideInterval = null;
        this.isMenuOpen = false;
        // Add touch/swipe variables as class properties
        this.startX = 0;
        this.endX = 0;
        this.init();
    }

    init() {
        this.initParticles();
        this.initSlider();
        this.initMobileMenu();
        this.initScrollEffects();
        this.initSmoothScrolling();
        this.initLazyLoading();
        this.initAnimations();
        this.initHeaderScrollEffect();
        this.preloadImages();
    }

    // Particle Background System
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
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
                        speed: 2,
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
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
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

    // Hero Slider System
    initSlider() {
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

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
            heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        this.initTouchSupport();
    }

    showSlide(index) {
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
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
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
        
        if (!menuBtn || !nav) return;

        menuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const nav = document.querySelector('nav ul');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.padding = '2rem';
            nav.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            if (menuBtn) menuBtn.className = 'fas fa-times';
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const nav = document.querySelector('nav ul');
        const menuBtn = document.querySelector('.mobile-menu-btn i');
        
        this.isMenuOpen = false;
        if (nav) {
            nav.style.display = window.innerWidth > 768 ? 'flex' : 'none';
            nav.style.flexDirection = window.innerWidth > 768 ? 'row' : 'column';
            nav.style.position = 'static';
            nav.style.background = 'none';
            nav.style.padding = '0';
            nav.style.borderTop = 'none';
        }
        if (menuBtn) menuBtn.className = 'fas fa-bars';
    }

    // Header Scroll Effect
    initHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.backdropFilter = 'blur(25px)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = 'none';
            }

            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll Animations
    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.team-member, .event-card, .section-title, .text-content, .image-content');
        animateElements.forEach(el => observer.observe(el));
    }

    // Lazy Loading for Images
    initLazyLoading() {
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

    // Parallax Scrolling
    initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.setProperty('--scroll', `${rate}px`);
            });
        }, { passive: true });
    }

    // Image Preloading
    preloadImages() {
        const imageUrls = [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
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
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
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