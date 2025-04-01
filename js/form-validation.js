/**
 * Form Validation JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form validation
    initializeContactForm();
    
    // Initialize newsletter form validation
    initializeNewsletterForm();
});

/**
 * Initialize contact form validation
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const projectTypeSelect = document.getElementById('project-type');
    const timelineSelect = document.getElementById('timeline');
    const budgetSelect = document.getElementById('budget');
    const privacyPolicyCheckbox = document.getElementById('privacy-policy');
    
    // Add input event listeners for real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateField(nameInput, isNotEmpty, 'Please enter your name');
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateField(emailInput, isValidEmail, 'Please enter a valid email address');
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateField(messageInput, isNotEmpty, 'Please enter your message');
        });
    }
    
    if (privacyPolicyCheckbox) {
        privacyPolicyCheckbox.addEventListener('change', () => {
            validateField(privacyPolicyCheckbox, isChecked, 'You must agree to the Privacy Policy');
        });