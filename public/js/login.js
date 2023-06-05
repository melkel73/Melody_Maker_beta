// Get the form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // TODO: Perform validation and authentication
  // You would typically send a request to the server to verify the credentials

  // Example validation
  if (username === 'admin' && password === 'password') {
    // Successful login
    alert('Login successful!');
    // TODO: Redirect to another page or perform other actions
  } else {
    // Failed login
    alert('Invalid username or password.');
  }
});
