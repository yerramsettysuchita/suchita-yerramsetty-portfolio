# Suchita Yerramsetty - Professional Portfolio Website

## 🌟 Overview

A comprehensive and interactive personal portfolio website showcasing professional skills, projects, and experience. Developed as part of the GrowthLink Web Development Internship Assignment (Task 1: Portfolio Website).

## 🚀 Project Internship Details

### GrowthLink Internship Opportunity
- **Duration:** 1 month
- **Mode:** Remote
- **Work Hours:** Part-time, Flexible
- **Stipend:** ₹5000

## ✨ Features

### Frontend
- **Responsive Design**: Fully mobile-friendly across all devices
- **Interactive UI Elements**: Dynamic animations and transitions
- **Dark/Light Mode Toggle**
- Comprehensive sections:
  - Hero section with typewriter effect
  - Detailed About section
  - Education & Certifications timeline
  - Professional Experience showcase
  - Skills visualization
  - Project portfolio with filtering
  - Services offered
  - Blog/Articles section
  - Client testimonials slider
  - Comprehensive contact form
  - FAQ section

### Backend
- Contact Form Submission
- Newsletter Subscription
- Projects API Endpoint
- Email Notifications
- Form Validation
- Security Middleware

## 🛠 Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- FontAwesome
- Google Fonts

### Backend
- Node.js
- Express.js
- MongoDB
- Nodemailer
- Helmet
- Cors
- Mongoose
- dotenv

## 📁 Project Structure

```
portfolio-project/
│
├── frontend/
│   ├── assets/
│   │   ├── images/
│   │   ├── documents/
│   │   └── videos/
│   │
│   ├── css/
│   │   ├── styles.css
│   │   ├── responsive.css
│   │   └── animations.css
│   │
│   └── js/
│       ├── main.js
│       ├── api.js
│       └── various-feature-scripts.js
│
└── backend/
    ├── server.js
    ├── package.json
    ├── .env
    └── node_modules/
```

## 🔧 Setup and Installation

### Frontend
1. Clone the repository
2. Open `index.html` in a browser
3. For local development, use a live server extension

### Backend
1. Navigate to backend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with necessary configurations
4. Start the server:
   ```bash
   npm start
   ```

## 🌈 Customization

- Update personal details in `index.html`
- Modify color scheme in `css/styles.css`
- Adjust backend configurations in `.env`

## 🚀 Deployment

### Frontend
- GitHub Pages
- Netlify
- Vercel

### Backend
- Heroku
- DigitalOcean
- AWS
- MongoDB Atlas for database hosting

2. Frontend Setup
Installation
bashCopy# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
Running Frontend
You have multiple options to run the frontend:

Using Live Server (Recommended for Static Sites)

Install Live Server VS Code extension
Right-click index.html
Select "Open with Live Server"


Python Simple Server
bashCopy# In frontend directory
python -m http.server 3000

Node.js Simple Server
bashCopy# Install http-server globally
npm install -g http-server

# Run the server
http-server .


3. Backend Setup
Configuration

Navigate to backend directory

bashCopycd ../backend

Create .env file with the following contents:

CopyPORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio_db
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
PERSONAL_EMAIL=your_personal_email@gmail.com
Installation
bashCopy# Install dependencies
npm install

# Install development dependencies
npm install -D nodemon
Running Backend
bashCopy# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
4. Environment Variables
Important: Never commit your .env file to version control.
Create a .env.example file with template values:
CopyPORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=example@gmail.com
EMAIL_PASS=your_password
PERSONAL_EMAIL=your_email@example.com
5. Connecting Frontend and Backend

Ensure CORS is configured in backend server.js
Update API endpoints in frontend/js/api.js
javascriptCopyconst API_BASE_URL = 'http://localhost:5000/api';


6. Troubleshooting

Ensure all dependencies are installed
Check console for any error messages
Verify MongoDB connection
Confirm all environment 

## 📝 Internship Task Requirements

This project was developed to meet the following GrowthLink internship task requirements:

### Objective
Create a professional portfolio website serving as an online resume.

### Expected Features
- [x] About Section: Brief personal introduction
- [x] Skills: Technical and non-technical skills showcase
- [x] Projects: Detailed project descriptions and links
- [x] Contact Form: Functional messaging system
- [x] Responsive Design: Mobile-friendly layout

## 🔒 Security Features

- CORS protection
- Rate limiting
- Input validation
- Secure email handling
- Environment variable management

## 🔮 Future Enhancements
- Add blog functionality
- Implement multi-language support
- Enhance project filtering
- Integrate advanced analytics

## 📞 Contact

**Suchita Yerramsetty**
- **Email:** suchitayerramsetty999@gmail.com
- **LinkedIn:** [Profile Link](https://www.linkedin.com/in/yerramsetty-sai-venkata-suchita-suchi1234/)
- **GitHub:** [yerramsettysuchita](https://github.com/yerramsettysuchita)

## 📄 License

This project is licensed under the MIT License.

---

© 2025 Suchita Yerramsetty. All Rights Reserved.
