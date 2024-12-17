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
const contactRoutes = require('./routes/contactRoutes');
const postRoutes = require('./routes/postRoutes');
const { createItem, getItems, updateItem, deleteItem } = require('./controller/itemController');
const { createSponsor, getSponsors, updateSponsor, deleteSponsor } = require('./controller/sponsorController');
const { createParticipant, getParticipants, updateParticipant, deleteParticipant } = require('./controller/participantController');
const app = express();
const path = require('path');

const multer = require('multer');
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
      // Redirect based on role
      if (user.role === 'admin') {
        return res.status(200).json({ message: 'Login i suksesshëm', redirect: '/dashboard', user });
      } else {
        return res.status(200).json({ message: 'Login i suksesshëm', redirect: '/', user });
      }
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

// CRUD për pjesëmarrësit 
app.post('/participants', isAuthenticated, createParticipant); 
app.get('/participants', isAuthenticated, getParticipants); 
app.put('/participants/:id', isAuthenticated, updateParticipant); 
app.delete('/participants/:id', isAuthenticated, deleteParticipant); 

app.use('/posts', postRoutes);

app.use(cors());

app.use(express.json()); 
app.use('/contact', contactRoutes); 

app.use('/api', router);  // Kjo lidh rrugët e router-it me /api

//Posts
const fs = require('fs'); // Import fs për të kontrolluar dosjen
const uploadsDir = path.join(__dirname, 'uploads'); // Definimi i dosjes uploads

// Kontrollo ekzistencën e dosjes "uploads" dhe krijo nëse mungon
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


// Konfiguro multer për ruajtjen e skedarëve në "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Ruaj skedarët te dosja "uploads"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Emër unik për secilin skedar
  },
});

const upload = multer({ storage }); // Përdor konfigurimin e inicializuar më sipër

// POST route to handle file upload
app.post('/posts', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  console.log('File:', req.file); // Kontrollo nëse skedari është ngarkuar
    console.log('Uploaded file:', req.file);
  console.log('Body:', req.body);

  const image = req.file ? req.file.filename : null;

  Post.create({ title, content, image })
    .then((post) => res.json(post))
    .catch((error) => {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Error saving post' });
    });
});

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
