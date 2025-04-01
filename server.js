const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const compression = require('compression');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Security and performance middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(compression()); // Compress response bodies
app.use(cors({
    origin: ['https://suchitayerramsetty.com', 'http://localhost:3000'], 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Contact Form Submission Schema
const ContactSubmissionSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100 
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subject: { 
        type: String,
        trim: true,
        maxlength: 200 
    },
    message: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 1000 
    },
    projectType: { 
        type: String,
        enum: ['website', 'webapp', 'ecommerce', 'consultation', 'other'],
        default: 'other'
    },
    timeline: { 
        type: String,
        enum: ['urgent', 'short', 'medium', 'long', 'flexible'],
        default: 'flexible'
    },
    budget: { 
        type: String,
        enum: ['small', 'medium', 'large', 'enterprise', 'discuss'],
        default: 'discuss'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const ContactSubmission = mongoose.model('ContactSubmission', ContactSubmissionSchema);

// Newsletter Subscription Schema
const NewsletterSubscriptionSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subscribedAt: { 
        type: Date, 
        default: Date.now 
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const NewsletterSubscription = mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            subject, 
            message, 
            projectType, 
            timeline, 
            budget 
        } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Save contact submission to database
        const contactSubmission = new ContactSubmission({
            name,
            email,
            subject,
            message,
            projectType,
            timeline,
            budget
        });
        await contactSubmission.save();

        // Send email notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.PERSONAL_EMAIL,
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
                <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
                <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Contact form submission error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again later.' 
        });
    }
});

// API Endpoint for Newsletter Subscription
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            });
        }

        // Check if email already exists
        const existingSubscription = await NewsletterSubscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is already subscribed' 
            });
        }

        // Create new subscription
        const newSubscription = new NewsletterSubscription({ email });
        await newSubscription.save();

        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Newsletter Subscription Confirmation',
            html: `
                <h2>Thanks for Subscribing!</h2>
                <p>You've successfully subscribed to Suchita Yerramsetty's newsletter.</p>
                <p>You'll receive updates, tips, and insights directly in your inbox.</p>
                <p>If you didn't subscribe, please ignore this email.</p>
            `
        });

        res.status(200).json({ 
            success: true, 
            message: 'Successfully subscribed to newsletter' 
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again later.' 
        });
    }
});

// Projects API Endpoint
app.get('/api/projects', async (req, res) => {
    try {
        // In a real-world scenario, you might fetch projects from a database
        const projects = [
            {
                id: 1,
                title: 'MedHealth---Advanced-Health-Care-Portal',
                description: 'A fully responsive Portal with patients management, Appointment management, and payment processing.',
                technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React'],
                githubLink: 'https://github.com/yerramsettysuchita/MedHealth---Advanced-Health-Care-Portal',
                liveLink: 'https://project1-demo.com'
            },
            {
                id: 2,
                title: 'Suchita-Foundation-Website',
                description: 'A website serving as a centralized platform to promote education, empowerment, and engagement of women.',
                technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Material-UI'],
                githubLink: 'https://github.com/yerramsettysuchita/Suchita-Foundation-Website',
                liveLink: null
            }
            // Add more projects as needed
        ];

        res.status(200).json({ 
            success: true, 
            projects 
        });
    } catch (error) {
        console.error('Projects fetch error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Unable to fetch projects' 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;