// Get the profile form element
const profileForm = document.getElementById('profile-form');

// Add an event listener to the form submission
profileForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  
  // TODO: Perform profile update logic
  // You can send a request to the server to update the user's profile information

  // Example profile update
  alert('Your Profile has been Updated! - Melody Mover');
});