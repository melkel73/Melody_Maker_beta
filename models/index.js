const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Set static folder for CSS and JavaScript files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('homepage', { pageTitle: 'Home' });
});

app.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Login' });
});

app.get('/profile', (req, res) => {
  // Fetch user data from the database or session
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johndoe123'
  };

  res.render('profile', { pageTitle: 'Profile', user });
});

// Handle form submission for login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Validate user credentials
  // Perform login logic

  // Redirect to profile page after successful login
  res.redirect('/profile');
});

// Handle logout
app.get('/logout', (req, res) => {
  // Perform logout logic

  // Redirect to homepage after logout
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
