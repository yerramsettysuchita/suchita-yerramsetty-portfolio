/**
 * Project Filtering JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize project filters
    initializeProjectFilters();
    
    // Initialize skills filters
    initializeSkillsFilters();
});

/**
 * Initialize project filters
 */
function initializeProjectFilters() {
    const filterContainer = document.querySelector('.projects-filter');
    if (!filterContainer) return;
    
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    
    // Set up click event for each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(projectItems, filterValue);
        });
    });
    
    // Initial filter (show all)
    filterProjects(projectItems, 'all');
}

/**
 * Filter projects based on category
 * @param {NodeList} projects - The project elements to filter
 * @param {string} category - The category to filter by
 */
function filterProjects(projects, category) {
    projects.forEach(project => {
        // Get project categories
        const projectCategories = project.getAttribute('data-category');
        
        // Check if project should be shown
        if (category === 'all' || (projectCategories && projectCategories.includes(category))) {
            // Show project with animation
            showProjectWithAnimation(project);
        } else {
            // Hide project with animation
            hideProjectWithAnimation(project);
        }
    });
}

/**
 * Show project with animation
 * @param {HTMLElement} project - The project element to show
 */
function showProjectWithAnimation(project) {
    // Reset opacity and transform
    project.style.opacity = '0';
    project.style.transform = 'scale(0.8)';
    
    // Make project visible
    project.style.display = 'block';
    
    // Force reflow
    void project.offsetWidth;
    
    // Add animation
    setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'scale(1)';
    }, 50);
}

/**
 * Hide project with animation
 * @param {HTMLElement} project - The project element to hide
 */
function hideProjectWithAnimation(project) {
    // Start animation
    project.style.opacity = '0';
    project.style.transform = 'scale(0.8)';
    
    // Hide project after animation
    setTimeout(() => {
        project.style.display = 'none';
    }, 300);
}

/**
 * Initialize skills filters
 */
function initializeSkillsFilters() {
    const filterContainer = document.querySelector('.skills-categories');
    if (!filterContainer) return;
    
    const filterButtons = filterContainer.querySelectorAll('.category-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Set up click event for each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-category');
            
            // Filter skills
            filterSkills(skillItems, filterValue);
        });
    });
    
    // Initial filter (show all)
    filterSkills(skillItems, 'all');
}

/**
 * Filter skills based on category
 * @param {NodeList} skills - The skill elements to filter
 * @param {string} category - The category to filter by
 */
function filterSkills(skills, category) {
    skills.forEach(skill => {
        // Get skill categories
        const skillCategories = skill.getAttribute('data-category');
        
        // Check if skill should be shown
        if (category === 'all' || (skillCategories && skillCategories.includes(category))) {
            // Show skill with animation
            showSkillWithAnimation(skill);
        } else {
            // Hide skill with animation
            hideSkillWithAnimation(skill);
        }
    });
}

/**
 * Show skill with animation
 * @param {HTMLElement} skill - The skill element to show
 */
function showSkillWithAnimation(skill) {
    // Reset opacity and transform
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    
    // Make skill visible
    skill.style.display = 'block';
    
    // Force reflow
    void skill.offsetWidth;
    
    // Add animation
    setTimeout(() => {
        skill.style.opacity = '1';
        skill.style.transform = 'translateY(0)';
    }, 50);
}

/**
 * Hide skill with animation
 * @param {HTMLElement} skill - The skill element to hide
 */
function hideSkillWithAnimation(skill) {
    // Start animation
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    
    // Hide skill after animation
    setTimeout(() => {
        skill.style.display = 'none';
    }, 300);
}

/**
 * Filter elements by URL parameter
 * This function checks if there's a filter parameter in the URL
 * and applies the corresponding filter
 */
function checkUrlFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        // Check for project filters
        const projectFilterBtn = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
        if (projectFilterBtn) {
            projectFilterBtn.click();
        }
        
        // Check for skill filters
        const skillFilterBtn = document.querySelector(`.category-btn[data-category="${filterParam}"]`);
        if (skillFilterBtn) {
            skillFilterBtn.click();
        }
    }
}

// Check for URL filter parameters on page load
checkUrlFilter();