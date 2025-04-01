/**
 * Animations JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize hero section animations
    initializeHeroAnimations();
    
    // Initialize hover animations
    initializeHoverAnimations();
    
    // Initialize timeline animations
    initializeTimelineAnimations();
});

/**
 * Initialize scroll animations for elements
 */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add active class to elements in viewport
    function checkVisibility() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Get the animation class
                const classes = Array.from(element.classList);
                const animationClass = classes.find(className => className.startsWith('animate-'));
                
                if (animationClass) {
                    // Apply the animation
                    element.style.animationPlayState = 'running';
                }
            }
        });
    }
    
    // Set initial state for all animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.animationPlayState = 'paused';
    });
    
    // Check on page load
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

/**
 * Initialize hero section animations
 */
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    const heroElements = [
        { element: heroContent.querySelector('h1'), delay: 0 },
        { element: heroContent.querySelector('.typewriter'), delay: 200 },
        { element: heroContent.querySelector('.hero-description'), delay: 400 },
        { element: heroContent.querySelector('.hero-cta'), delay: 600 },
        { element: heroContent.querySelector('.social-links'), delay: 800 },
        { element: heroContent.querySelector('.availability-status'), delay: 1000 }
    ];
    
    // Animate hero elements sequentially
    heroElements.forEach(item => {
        if (item.element) {
            setTimeout(() => {
                item.element.classList.add('animate-fade-in-up');
                item.element.style.opacity = '1';
            }, item.delay);
        }
    });
    
    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('animate-fade-in-right');
            heroImage.style.opacity = '1';
        }, 300);
    }
}

/**
 * Initialize hover animations
 */
function initializeHoverAnimations() {
    // Add pulse animation to cards on hover
    const cards = document.querySelectorAll('.philosophy-card, .project-card, .service-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate-pulse');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate-pulse');
        });
    });
}

/**
 * Initialize timeline animations
 */
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        
        // Add staggered animation delay
        item.style.animationDelay = `${index * 200}ms`;
        
        // Add animation class
        item.classList.add('animate-fade-in-left');
    });
    
    // Check if timeline items are in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate timeline items when they come into view
    function animateTimelineItems() {
        timelineItems.forEach(item => {
            if (isInViewport(item) && item.style.opacity === '0') {
                item.style.opacity = '1';
            }
        });
    }
    
    // Check on page load and scroll
    animateTimelineItems();
    window.addEventListener('scroll', animateTimelineItems);
}

/**
 * Add a new animation to an element
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationClass - The animation class to add
 * @param {number} duration - Animation duration in milliseconds
 * @param {function} callback - Callback function to execute after animation completes
 */
function animateElement(element, animationClass, duration, callback) {
    // Remove any existing animations
    element.classList.remove('animate-fade-in', 'animate-fade-out', 'animate-fade-in-up', 
                            'animate-fade-in-down', 'animate-fade-in-left', 'animate-fade-in-right',
                            'animate-slide-up', 'animate-slide-down', 'animate-slide-left', 
                            'animate-slide-right', 'animate-scale-up', 'animate-scale-down',
                            'animate-bounce', 'animate-pulse', 'animate-rotate');
    
    // Force reflow
    void element.offsetWidth;
    
    // Add the new animation class
    element.classList.add(animationClass);
    
    // Set animation duration if provided
    if (duration) {
        element.style.animationDuration = `${duration}ms`;
    }
    
    // Execute callback after animation completes
    if (callback) {
        setTimeout(callback, duration || 1000);
    }
}