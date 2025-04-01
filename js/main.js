/**
 * Main JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeHeader();
    initializeTypewriter();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeAnimations();
    initializeFilterButtons();
    initializeFAQAccordion();
    initializeBackToTop();
    initializeFormValidation();
    initializeTestimonialsSlider();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

/**
 * Handle header behavior on scroll
 */
function initializeHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Handle active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
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
    });
}

/**
 * Initialize typewriter effect for the hero section
 */
function initializeTypewriter() {
    const typedText = document.getElementById('typed-text');
    if (!typedText) return;
    
    const phrases = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'JavaScript Expert'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing new phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

/**
 * Handle dark/light theme toggle
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme');
    
    if (!currentTheme) {
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle button icon
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        let switchToTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', switchToTheme);
        localStorage.setItem('theme', switchToTheme);
        
        updateThemeIcon(switchToTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Handle mobile menu toggle
 */
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', event => {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle') && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

/**
 * Initialize animations on scroll
 */
function initializeAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Add staggered animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Initialize filter buttons for projects and skills
 */
function initializeFilterButtons() {
    // Initialize project filters
    initializeFilter('.projects-filter', '.filter-btn', '.project-card');
    
    // Initialize skills filters
    initializeFilter('.skills-categories', '.category-btn', '.skill-item');
    
    function initializeFilter(containerSelector, buttonSelector, itemSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const filterButtons = container.querySelectorAll(buttonSelector);
        const items = document.querySelectorAll(itemSelector);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const filterValue = button.getAttribute('data-filter') || button.getAttribute('data-category');
                
                items.forEach(item => {
                    const itemCategories = item.getAttribute('data-category') || '';
                    
                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize back to top button functionality
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy-policy');
    
    const errorMessages = {
        name: 'Please enter your name',
        email: 'Please enter a valid email address',
        message: 'Please enter your message',
        privacy: 'You must agree to the Privacy Policy'
    };
    
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, errorMessages.name);
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, errorMessages.email);
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, errorMessages.message);
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        // Validate privacy policy
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, errorMessages.privacy);
            isValid = false;
        } else {
            clearError(privacyCheckbox);
        }
        
        if (isValid) {
            // In a real application, you would submit the form data to a server here
            // For demo purposes, we'll just show a success message
            showSubmitSuccess();
            contactForm.reset();
        }
    });
    
    // Input validation on change
    nameInput.addEventListener('input', () => validateField(nameInput, errorMessages.name, value => value.trim() !== ''));
    emailInput.addEventListener('input', () => validateField(emailInput, errorMessages.email, isValidEmail));
    messageInput.addEventListener('input', () => validateField(messageInput, errorMessages.message, value => value.trim() !== ''));
    privacyCheckbox.addEventListener('change', () => validateField(privacyCheckbox, errorMessages.privacy, value => value));
    
    function validateField(field, errorMessage, validationFunction) {
        const value = field.type === 'checkbox' ? field.checked : field.value;
        
        if (!validationFunction(value)) {
            showError(field, errorMessage);
        } else {
            clearError(field);
        }
    }
    
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        formGroup.classList.add('error');
        
        if (field.type !== 'checkbox') {
            field.style.borderColor = 'var(--error-color)';
        }
    }
    
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        formGroup.classList.remove('error');
        
        if (field.type !== 'checkbox') {
            field.style.borderColor = '';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSubmitSuccess() {
        const successMessage = contactForm.querySelector('.success-message');
        successMessage.parentElement.style.display = 'block';
        successMessage.style.display = 'flex';
        
        setTimeout(() => {
            successMessage.parentElement.style.display = 'none';
            successMessage.style.display = 'none';
        }, 5000);
    }
}

/**
 * Initialize testimonials slider
 */
function initializeTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = slider.querySelectorAll('.testimonial-item');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    const indicators = document.querySelectorAll('.nav-indicators .indicator');
    
    let currentIndex = 0;
    
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== currentIndex) {
            testimonial.style.display = 'none';
        }
    });
    
    function showTestimonial(index) {
        // Hide current testimonial
        testimonials[currentIndex].style.display = 'none';
        indicators[currentIndex].classList.remove('active');
        
        // Update current index
        currentIndex = index;
        
        // Show new testimonial
        testimonials[currentIndex].style.display = 'block';
        indicators[currentIndex].classList.add('active');
    }
    
    // Previous button click
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = testimonials.length - 1;
            showTestimonial(index);
        });
    }
    
    // Next button click
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= testimonials.length) index = 0;
            showTestimonial(index);
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-advance the slider every 5 seconds
    setInterval(() => {
        let index = currentIndex + 1;
        if (index >= testimonials.length) index = 0;
        showTestimonial(index);
    }, 5000);
}

/**
 * Initialize project modals
 */
function initializeProjectModals() {
    const projectLinks = document.querySelectorAll('.view-details, .case-study');
    if (!projectLinks.length) return;
    
    projectLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const modalId = link.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Close modal when clicking the close button
                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    });
                }
                
                // Close modal when clicking outside of the content
                modal.addEventListener('click', event => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    });
}

/**
 * Initialize skills visualization chart
 */
function initializeSkillsChart() {
    const chartContainer = document.getElementById('skills-chart');
    if (!chartContainer) return;
    
    // Use Chart.js or other library to create a skills visualization
    // Example implementation would go here
}

// Add any additional functions or initializations below
import { 
    submitContactForm, 
    subscribeNewsletter, 
    fetchProjects 
} from './api.js';

// Modify existing form submission handler
document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        projectType: document.getElementById('project-type').value,
        timeline: document.getElementById('timeline').value,
        budget: document.getElementById('budget').value
    };

    // Submit form via API
    await submitContactForm(formData);
});

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    await subscribeNewsletter(emailInput.value);
});

// Fetch projects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);