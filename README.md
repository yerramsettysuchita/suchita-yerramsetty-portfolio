# 💼 Suchita Yerramsetty – Professional Portfolio Website

## 🌟 Overview  
A dynamic and responsive **personal portfolio website** showcasing professional experiences, projects, skills, and achievements. Created as part of **GrowthLink’s Web Development Internship** (Task 1).

---

## 🚀 Internship Details: GrowthLink Web Development  
- **Mode:** Remote  
- **Duration:** 1 Month  
- **Stipend:** ₹5000  
- **Work Hours:** Flexible, Part-Time  
- **Task:** Build and deploy a full-stack personal portfolio website  

---

## ✨ Key Features

### 🎨 Frontend
- Responsive layout across all screen sizes  
- **Light/Dark mode toggle**  
- Smooth animations and transitions  
- Hero section with **typewriter effect**  
- Organized sections:  
  - About  
  - Education & Certifications  
  - Work Experience  
  - Skills visualization  
  - Projects portfolio with filter  
  - Services offered  
  - Blog & Articles  
  - Client testimonials  
  - Contact form  
  - FAQ section  

### 🛠 Backend
- Contact form submission and **email notifications**  
- Newsletter subscription functionality  
- Projects API endpoint  
- Validation and security middleware  
- MongoDB integration for storing data  

---

## 📁 Project Structure

```
portfolio-project/
├── frontend/
│   ├── assets/        # Images, docs, videos
│   ├── css/           # styles.css, responsive.css, animations.css
│   └── js/            # main.js, api.js, feature scripts
└── backend/
    ├── server.js      # Express backend server
    ├── .env           # Environment configuration
    └── package.json   # Dependencies
```

---

## ⚙️ Installation & Setup

### 🔹 Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Open index.html using Live Server or:
python -m http.server 3000   # Python Server
http-server .                # Node.js Simple Server
```

### 🔹 Backend Setup
```bash
# Navigate to backend
cd ../backend

# Create .env file
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio_db
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PERSONAL_EMAIL=your_personal_email@gmail.com

# Install dependencies
npm install

# Run in development mode
npm run dev

# Or run in production mode
npm start
```

---

## 🔐 Environment Variables (`.env`)
Create a `.env` file or `.env.example`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=example@gmail.com
EMAIL_PASS=your_password
PERSONAL_EMAIL=your_email@example.com
```

---

## 🔗 Frontend-Backend Integration
Ensure backend has CORS enabled.  
In `frontend/js/api.js`, update base URL:
```js
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🌐 Deployment

### 🔸 Frontend
- GitHub Pages  
- Netlify  
- Vercel  

### 🔸 Backend
- Heroku  
- Render  
- DigitalOcean  
- MongoDB Atlas for database hosting  

---

## 🛠 Troubleshooting Tips
- Ensure MongoDB URI is valid  
- CORS setup in Express for local API calls  
- Backend should run **before frontend** for API features  
- Don't forget to use **nodemon** in development  

---

## 📬 Contact

For questions, feedback, or hiring:
- **Email:** suchitayerramsetty999@gmail.com    
- **GitHub:** https://www.github.com/yerramsettysuchita

---
