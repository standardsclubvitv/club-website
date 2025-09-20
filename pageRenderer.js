// BIS Standards Club - Page Renderer
// Dynamic page content generation system

class PageRenderer {
    constructor(data) {
        this.data = data;
        this.currentSlide = 0;
        this.slideInterval = null;
    }

    // Initialize and render all pages
    init() {
        this.renderHeader();
        this.renderHeroSection();
        this.renderAboutBIS();
        this.renderAboutClub();
        this.renderTeamSection();
        this.renderEventsSection();
        this.renderContactSection();
        this.renderFooter();
        
        // Initialize functionality after rendering
        this.initSlider();
        this.initEventListeners();
        
        console.log('🎨 All pages rendered successfully');
    }

    // Render Header Navigation
    renderHeader() {
        const header = document.querySelector('header .container');
        if (!header) return;

        header.innerHTML = `
            <div class="logo">
                <img src="https://standardsclubvitv.github.io/image-api/images/logo_club.png"
                    alt="BIS Standards Club Logo">
                <div>
                    <h1>BIS Standards Club</h1>
                    <p>VIT Vellore</p>
                </div>
            </div>
            <nav>
                <ul>
                    ${this.data.navigation.map(item => 
                        `<li><a href="${item.href}">${item.label}</a></li>`
                    ).join('')}
                </ul>
                <div class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </div>
            </nav>
        `;
    }

    // Render Hero Section with Slider
    renderHeroSection() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;

        heroSection.innerHTML = `
            <div class="hero-slider">
                ${this.data.heroSlides.map((slide, index) => `
                    <div class="slide ${index === 0 ? 'active' : ''}"
                        style="background-image: linear-gradient(rgba(0, 83, 156, 0.7), rgba(0, 83, 156, 0.7)), url('${slide.backgroundImage}');">
                        <div class="slide-content">
                            <h2>${slide.title}</h2>
                            <p>${slide.subtitle}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="slider-nav">
                ${this.data.heroSlides.map((_, index) => 
                    `<span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>`
                ).join('')}
            </div>
        `;
    }

    // Render About BIS Section
    renderAboutBIS() {
        const section = document.getElementById('about-bis');
        if (!section) return;

        const aboutBIS = this.data.aboutBIS;
        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">${aboutBIS.title}</h2>
                <div class="content-wrapper">
                    <div class="text-content">
                        ${aboutBIS.content.map((paragraph, index) => {
                            if (index === 1) {
                                return `
                                    <p>${paragraph}</p>
                                    <ul>
                                        ${aboutBIS.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                    </ul>
                                `;
                            }
                            return `<p>${paragraph}</p>`;
                        }).join('')}
                    </div>
                    <div class="image-content">
                        <img src="${aboutBIS.image}" alt="BIS Logo" loading="lazy">
                    </div>
                </div>
            </div>
        `;
    }

    // Render About Club Section
    renderAboutClub() {
        const section = document.getElementById('about-club');
        if (!section) return;

        const aboutClub = this.data.aboutClub;
        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">${aboutClub.title}</h2>
                <div class="content-wrapper">
                    <div class="image-content">
                        <img src="${aboutClub.image}" alt="Club Members" loading="lazy">
                    </div>
                    <div class="text-content">
                        ${aboutClub.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                        <p>Our objectives include:</p>
                        <ul>
                            ${aboutClub.objectives.map(objective => `<li>${objective}</li>`).join('')}
                        </ul>
                        ${aboutClub.content.slice(1).map(paragraph => `<p>${paragraph}</p>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Render Team Section
    renderTeamSection() {
        const section = document.getElementById('team');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Our Team</h2>
                <div class="team-grid">
                    ${this.data.team.map(member => `
                        <div class="team-member">
                            <div class="member-img">
                                <img src="${member.image}" alt="${member.name}" loading="lazy">
                                <div class="social-links">
                                    <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                            <h3>${member.name}</h3>
                            <p class="position">${member.position}</p>
                            <p class="bio">${member.bio}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Render Events Section
    renderEventsSection() {
        const section = document.getElementById('events');
        if (!section) return;

        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Past Events</h2>
                <div class="events-grid">
                    ${this.data.events.map(event => `
                        <div class="event-card">
                            <div class="event-img">
                                <img src="${event.image}" alt="${event.title}" loading="lazy">
                            </div>
                            <div class="event-content">
                                <h3>${event.title}</h3>
                                <p class="event-date">${event.date}</p>
                                <p class="event-desc">${event.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Render Contact Section
    renderContactSection() {
        const section = document.getElementById('contact');
        if (!section) return;

        const config = this.data.config;
        section.innerHTML = `
            <div class="container">
                <h2 class="section-title">Contact Us</h2>
                <div class="contact-content">
                    <div class="contact-info">
                        <h3>Get In Touch</h3>
                        <p>Have questions about our club or upcoming events? Reach out to us!</p>
                        <div class="contact-details">
                            <p><i class="fas fa-map-marker-alt"></i> ${config.contact.location}</p>
                            <p><i class="fas fa-envelope"></i> ${config.contact.email}</p>
                        </div>
                        <div class="social-media">
                            <h3>Follow Us</h3>
                            <div class="social-icons">
                                <a href="${config.social.instagram}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="${config.social.linkedin}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="${config.social.youtube}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render Footer
    renderFooter() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const config = this.data.config;
        const footerData = this.data.footer;
        
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-logo">
                        <img src="https://standardsclubvitv.github.io/image-api/images/logo_club.png"
                            alt="BIS Standards Club Logo">
                        <div>
                            <h3>BIS Standards Club</h3>
                            <p>VIT Vellore</p>
                        </div>
                    </div>
                    <div class="footer-quote">
                        <p>"${footerData.quote}"</p>
                        <p>- ${footerData.author}</p>
                    </div>
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            ${this.data.navigation.map(item => 
                                `<li><a href="${item.href}">${item.label}</a></li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 BIS Standards Club, VIT Vellore. All Rights Reserved.</p>
                </div>
            </div>
        `;
    }

    // Initialize Slider Functionality
    initSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) return;

        // Auto slide functionality
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
        }
    }

    // Slider Navigation Methods
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.data.heroSlides.length;
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
        
        // Reset auto-slide timer
        clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    updateSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = this.startX - this.endX;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                this.nextSlide();
            } else {
                this.currentSlide = this.currentSlide === 0 ? 
                    this.data.heroSlides.length - 1 : this.currentSlide - 1;
                this.updateSlider();
            }
        }
    }

    // Initialize Event Listeners
    initEventListeners() {
        // Update document title
        document.title = this.data.config.siteName;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = `Official website of BIS Standards Club at VIT Vellore - ${this.data.config.tagline}`;
        }

        console.log('🔗 Event listeners initialized');
    }

    // Cleanup method
    destroy() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Export for use in main application
if (typeof window !== 'undefined') {
    window.PageRenderer = PageRenderer;
}