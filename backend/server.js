require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const User = require('./models/user');
const ContactForm = require('./models/contactform'); 
const { createFeedback, getFeedbacks, updateFeedback, deleteFeedback } = require('./controller/feedbackController');
const { createContactForm, getContactForms, updateContactFormStatus, deleteContactForm } = require('./controller/contactFormController');
const postRoutes = require('./routes/postRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const { createItem, getItems, updateItem, deleteItem } = require('./controller/itemController');
const { createSponsor, getSponsors, updateSponsor, deleteSponsor } = require('./controller/sponsorController');
const app = express();
const router = express.Router();  // Krijohet instanca e router-it

// Configure session middleware with secure settings
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configure Helmet extra security headers
app.use(helmet());

// Configure rate limiting for DDoS protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Configure body parser and CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));
app.use(bodyParser.json());

// Logging middleware to debug session and user
app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});

// Configure passport for local authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Përdoruesi nuk u gjet.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Fjalëkalimi është i gabuar.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware to ensure the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies['ubtsecured'];
  if (!token) {
    return res.status(401).json({ error: 'Kërkohet autentifikimi.' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token i pavlefshëm.' });
    }
    req.user = user;
    next();
  });
};

// Auth route for login
app.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Login i dështuar. Provoni përsëri.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'supersecret', {
        expiresIn: '24h'
      });
      res.cookie('ubtsecured', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      });
      res.status(200).json({ message: 'Login i suksesshëm', user });
    });
  })(req, res, next);
});

// Route to get the logged-in user's information
app.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash, role: 'user' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  res.clearCookie('ubtsecured', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'U çkyçët me sukses.' });
  });
});

// CRUD routes for items
app.post('/items', isAuthenticated, createItem);
app.get('/items', isAuthenticated, getItems);
app.put('/items/:id', isAuthenticated, updateItem);
app.delete('/items/:id', isAuthenticated, deleteItem);

// CRUD për sponsorët
app.post('/sponsors', isAuthenticated, createSponsor);
app.get('/sponsors', isAuthenticated, getSponsors);
app.put('/sponsors/:id', isAuthenticated, updateSponsor);
app.delete('/sponsors/:id', isAuthenticated, deleteSponsor);

app.use('/posts', postRoutes);


// Importo funksionet për feedback (duhet të krijosh këto funksione më vonë)
app.use('/feedback', isAuthenticated, feedbackRoutes);
app.use(cors({
  origin: process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));


// Rrugët për feedback
app.post('/feedback', isAuthenticated, createFeedback); // Krijo feedback
app.get('/feedback', isAuthenticated, getFeedbacks);    // Merr të gjitha feedback-et
app.put('/feedback/:id', isAuthenticated, updateFeedback); // Përditëso feedback
app.delete('/feedback/:id', isAuthenticated, deleteFeedback); // Fshi feedback



// Contact Form routes
router.post('/send-message', createContactForm);
router.get('/messages', getContactForms);
router.put('/update-status/:id', updateContactFormStatus);
router.delete('/delete/:id', deleteContactForm);

app.use('/api', router);  // Kjo lidh rrugët e router-it me /api

app.post('/api/send-message', async (req, res) => {
  const { emri, email, mesazhi } = req.body;

  if (!emri || !email || !mesazhi) {
    return res.status(400).json({ message: 'Të gjitha fushat janë të detyrueshme.' });
  }

  try {
    const newMessage = await ContactForm.create({ emri, email, mesazhi });
    res.status(201).json({ message: 'Mesazhi u dërgua me sukses!', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gabim në server.' });
  }
});

// Initialize server and ensure database and table creation
const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Serveri po punon në portin ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Gabim gjatë inicializimit të databazës:', error);
  }
};

initializeDatabase();
