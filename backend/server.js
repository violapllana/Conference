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
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');
const participantRoutes = require('./routes/participantRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
<<<<<<< HEAD
const sponsorRoutes = require('./routes/sponsorRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
=======
const { createItem, getItems, updateItem, deleteItem } = require('./controller/itemController');
const { createSponsor, getSponsors, updateSponsor, deleteSponsor } = require('./controller/sponsorController');
const { createParticipant, getParticipants, updateParticipant, deleteParticipant } = require('./controller/participantController');
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
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


app.use(cors());

<<<<<<< HEAD
app.use(express.json()); 

app.use('/contact', contactRoutes); 
=======
// CRUD për pjesëmarrësit 
app.post('/participants', isAuthenticated, createParticipant); 
app.get('/participants', isAuthenticated, getParticipants); 
app.put('/participants/:id', isAuthenticated, updateParticipant); 
app.delete('/participants/:id', isAuthenticated, deleteParticipant); 
>>>>>>> 2c1a62a28611a6b6d60b819dca99eb111728f568
app.use('/posts', postRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/conferences', conferenceRoutes);



app.use('/api', router); 

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
