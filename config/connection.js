const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
  connectionLimit: 10
});

// Export the pool to be used in other files
module.exports = pool;
