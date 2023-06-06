const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const transferRoute = require('./routes/transferRoute');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/transfer', transferRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
