/**
 * Skills Visualization JavaScript file for Portfolio Website
 * Author: Your Name
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize skills visualization
    initializeSkillsChart();
    
    // Initialize skill bars animation
    initializeSkillBars();
});

/**
 * Initialize skills chart
 */
function initializeSkillsChart() {
    const chartContainer = document.getElementById('skills-chart');
    if (!chartContainer) return;
    
    // Get all skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Collect skill data
    const skillsData = [];
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        const skillPercentage = parseInt(item.querySelector('.skill-percentage').textContent);
        const skillCategory = item.getAttribute('data-category') || 'other';
        
        skillsData.push({
            name: skillName,
            value: skillPercentage,
            category: skillCategory
        });
    });
    
    // Group skills by category
    const categorizedSkills = groupSkillsByCategory(skillsData);
    
    // Create radar chart
    createRadarChart(chartContainer, categorizedSkills);
}

/**
 * Group skills by category
 * @param {Array} skills - Array of skill objects
 * @returns {Object} - Object with skills grouped by category
 */
function groupSkillsByCategory(skills) {
    const categories = {};
    
    skills.forEach(skill => {
        if (!categories[skill.category]) {
            categories[skill.category] = [];
        }
        
        categories[skill.category].push(skill);
    });
    
    return categories;
}

/**
 * Create radar chart
 * @param {HTMLElement} container - The container element for the chart
 * @param {Object} categorizedSkills - Object with skills grouped by category
 */
function createRadarChart(container, categorizedSkills) {
    // Clear container
    container.innerHTML = '';
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    
    // Check if canvas context is available
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not available');
        return;
    }
    
    // Set up chart data
    const categories = Object.keys(categorizedSkills);
    const dataPoints = [];
    const labels = [];
    const colors = [
        'rgba(0, 102, 204, 0.7)',   // Primary color
        'rgba(255, 87, 34, 0.7)',   // Secondary color
        'rgba(41, 182, 246, 0.7)',  // Accent color
        'rgba(76, 175, 80, 0.7)',   // Success color
        'rgba(255, 193, 7, 0.7)'    // Warning color
    ];
    
    // Process each category
    categories.forEach((category, index) => {
        const skills = categorizedSkills[category];
        const categoryData = [];
        
        skills.forEach(skill => {
            labels.push(skill.name);
            categoryData.push(skill.value);
        });
        
        dataPoints.push({
            label: category.charAt(0).toUpperCase() + category.slice(1),
            data: categoryData,
            backgroundColor: colors[index % colors.length]
        });
    });
    
    // Create radar chart visualization
    drawRadarChart(ctx, dataPoints, labels, canvas.width, canvas.height);
}

/**
 * Draw radar chart
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {Array} dataPoints - Array of data point objects
 * @param {Array} labels - Array of label strings
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawRadarChart(ctx, dataPoints, labels, width, height) {
    // Define chart dimensions
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Draw chart background
    ctx.fillStyle = 'rgba(245, 245, 245, 0.5)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw grid circles
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.setLineDash([5, 5]);
    
    for (let i = 1; i <= 4; i++) {
        const circleRadius = radius * (i / 4);
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
    
    // Calculate angles for each label
    const angleStep = (Math.PI * 2) / labels.length;
    
    // Draw axes and labels
    ctx.font = '12px var(--body-font, sans-serif)';
    ctx.fillStyle = 'var(--text-color, #333)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < labels.length; i++) {
        const angle = i * angleStep - Math.PI / 2; // Start from top
        
        // Draw axis
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + Math.cos(angle) * radius,
            centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
        
        // Draw label
        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 20);
        
        ctx.fillText(labels[i], labelX, labelY);
    }
    
    // Draw data points
    dataPoints.forEach(category => {
        const data = category.data;
        const color = category.backgroundColor;
        
        // Draw filled polygon
        ctx.fillStyle = color;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const value = data[i] / 100; // Normalize to 0-1
            const angle = i * angleStep - Math.PI / 2; // Start from top
            
            const pointX = centerX + Math.cos(angle) * radius * value;
            const pointY = centerY + Math.sin(angle) * radius * value;
            
            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Draw polygon outline
        ctx.strokeStyle = color.replace('0.7', '1');
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#fff';
        
        for (let i = 0; i < data.length; i++) {
            const value = data[i] / 100; // Normalize to 0-1
            const angle = i * angleStep - Math.PI / 2; // Start from top
            
            const pointX = centerX + Math.cos(angle) * radius * value;
            const pointY = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(pointX, pointY, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    });
    
    // Draw legend
    const legendX = 20;
    let legendY = 20;
    
    ctx.font = '14px var(--body-font, sans-serif)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    dataPoints.forEach((category, index) => {
        const color = category.backgroundColor;
        
        // Draw color box
        ctx.fillStyle = color;
        ctx.fillRect(legendX, legendY, 15, 15);
        
        // Draw border
        ctx.strokeStyle = color.replace('0.7', '1');
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX, legendY, 15, 15);
        
        // Draw label
        ctx.fillStyle = 'var(--text-color, #333)';
        ctx.fillText(category.label, legendX + 25, legendY + 7);
        
        legendY += 25;
    });
}

/**
 * Initialize skill bars animation
 */
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const progressBar = bar.querySelector('.skill-progress');
        const percentage = progressBar.style.width;
        
        // Initial state
        progressBar.style.width = '0';
        
        // Animate when in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress bar
                    setTimeout(() => {
                        progressBar.style.width = percentage;
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}