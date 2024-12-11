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
const Item = require('./models/item');
const User = require('./models/user');
const Post = require('./models/post');
const ContactForm = require('./models/contactform'); 
const{ createContactForm, getContactForms, updateContactFormStatus, deleteContactForm } = require('./controller/contactFormController');
const postRoutes = require('./routes/postRoutes');
const { createItem, getItems, updateItem, deleteItem } = require('./controller/itemController');
const { createSponsor, getSponsors, updateSponsor, deleteSponsor } = require('./controller/sponsorController');
const { createPost, getPosts , updatePost, deletePost } = require('./controller/postController');
const app = express();
const router = express.Router();

const Pjesmarresi = require('./models/Pjesmarresi');

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

// Configure Helmet  extra security headers
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

app.post('/add-participant/:itemId', isAuthenticated, async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id; // Get the logged-in user ID from the session

  try {
    // Check if the conference exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Konferenca nuk u gjet.' });
    }

    // Add participant
    const newParticipant = await Pjesmarresi.create({
      Pjesmarresi: req.user.username,  // Store the username or any other info of the participant
      itemId: itemId,
    });

    res.status(200).json({ message: 'Pjesëmarrësi është shtuar me sukses.', participant: newParticipant });
  } catch (error) {
    console.error('Error adding participant:', error);
    res.status(500).json({ message: 'Ka ndodhur një gabim gjatë shtimit të pjesëmarrësit.' });
  }
});

// Route to get the logged-in user's information
app.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  console.log(req.body)
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash, role: 'user' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/numri_pjesmarresve', (req, res) => {
  const query = 'SELECT COUNT(*) AS numri FROM Pjesmarresi'; // Ndrysho emrin e tabelës dhe fushës sipas nevojës
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json({ numri: result[0].numri });
  });
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

//Contact Form
router.post('/send-message', createContactForm);
router.get('/messages', getContactForms);
router.put('/update-status/:id', updateContactFormStatus);
router.delete('/delete/:id', deleteContactForm);

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
    await sequelize.sync({ force: true });
    app.listen(process.env.PORT, () => {
      console.log(`Serveri po punon neë portin ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Gabim gjatë inicializimit të databazës:', error);
  }
};

initializeDatabase();