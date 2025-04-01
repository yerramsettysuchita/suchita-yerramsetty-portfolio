/**
 * Dark Mode JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode
    initializeDarkMode();
});

/**
 * Initialize dark mode functionality
 */
function initializeDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use OS preference
    setInitialTheme();
    
    // Listen for toggle click
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for OS preference change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

/**
 * Set initial theme based on saved preference or OS preference
 */
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to OS preference if no saved preference
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    
    setTheme(initialTheme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
}

/**
 * Set the theme to either 'light' or 'dark'
 * @param {string} theme - The theme to set ('light' or 'dark')
 */
function setTheme(theme) {
    // Update data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button icon
    updateToggleIcon(theme);
    
    // Dispatch theme change event
    dispatchThemeChangeEvent(theme);
}

/**
 * Update the theme toggle button icon
 * @param {string} theme - The current theme ('light' or 'dark')
 */
function updateToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    
    // Update icon class
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

/**
 * Dispatch a theme change event for other scripts to listen for
 * @param {string} theme - The new theme ('light' or 'dark')
 */
function dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themeChange', { detail: { theme } });
    document.dispatchEvent(event);
}

/**
 * Apply theme-specific styles to dynamic elements
 * This function should be called when adding elements dynamically
 * @param {HTMLElement} element - The element to apply theme styles to
 */
function applyThemeStyles(element) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    // Add theme-specific class
    element.classList.add(`theme-${currentTheme}`);
    
    // Apply theme-specific styles based on current theme
    if (currentTheme === 'dark') {
        // Apply dark theme styles
        element.style.setProperty('--bg-color', 'var(--dark-color)');
        element.style.setProperty('--text-color', 'var(--white)');
    } else {
        // Apply light theme styles
        element.style.setProperty('--bg-color', 'var(--white)');
        element.style.setProperty('--text-color', 'var(--dark-color)');
    }
}

/**
 * Update theme for charts and visualizations
 * @param {string} theme - The current theme ('light' or 'dark')
 */
function updateChartsTheme(theme) {
    // Get all chart canvases
    const chartCanvases = document.querySelectorAll('canvas');
    
    // Skip if no charts exist
    if (!chartCanvases.length) return;
    
    // Define theme colors
    const darkThemeColors = {
        backgroundColor: 'rgba(30, 30, 30, 0.5)',
        gridColor: 'rgba(255, 255, 255, 0.1)',
        textColor: '#EEEEEE'
    };
    
    const lightThemeColors = {
        backgroundColor: 'rgba(245, 245, 245, 0.5)',
        gridColor: 'rgba(0, 0, 0, 0.1)',
        textColor: '#333333'
    };
    
    // Choose colors based on theme
    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;
    
    // Trigger redraw of charts with new colors
    // Note: The actual implementation depends on the charting library used
    // This is a simplified example
    document.dispatchEvent(new CustomEvent('redrawCharts', { detail: { colors } }));
}

// Listen for theme changes to update charts
document.addEventListener('themeChange', (e) => {
    updateChartsTheme(e.detail.theme);
});

// Detect OS preferred color scheme change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    }
});