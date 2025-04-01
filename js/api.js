// API utility functions for frontend
const API_BASE_URL = 'http://localhost:5000/api';

// Contact Form Submission
async function submitContactForm(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
            // Show success message
            document.querySelector('.success-message').style.display = 'block';
            document.querySelector('.error-message').style.display = 'none';
        } else {
            // Show error message
            document.querySelector('.error-message').textContent = result.message;
            document.querySelector('.error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Contact form submission error:', error);
        document.querySelector('.error-message').textContent = 'An unexpected error occurred.';
        document.querySelector('.error-message').style.display = 'block';
    }
}

// Newsletter Subscription
async function subscribeNewsletter(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        
        if (result.success) {
            alert('Successfully subscribed to newsletter!');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert('An error occurred while subscribing.');
    }
}

// Fetch Projects
async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        
        if (data.success) {
            // Update projects section dynamically
            const projectsGrid = document.querySelector('.projects-grid');
            projectsGrid.innerHTML = ''; // Clear existing projects
            
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="path/to/project/image/${project.id}.png" alt="${project.title}">
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            <a href="${project.githubLink}" target="_blank">View Code</a>
                            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank">Live Demo</a>` : ''}
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(projectCard);
            });
        }
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
}

// Export functions to be used in other scripts
export { 
    submitContactForm, 
    subscribeNewsletter, 
    fetchProjects 
};