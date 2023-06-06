// Function to check if a user is authenticated
const isAuthenticated = (req) => {
  return req.session.logged_in === true;
};

// Function to format date in a user-friendly way
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

module.exports = { isAuthenticated, formatDate };

