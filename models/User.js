const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Function to execute SQL queries
const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.query(query, values, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

// Function to create a new user
const createUser = async (name, email, password) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const values = [name, email, password];

  try {
    const results = await executeQuery(query, values);
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

// Function to get a user by email
const getUserByEmail = async (email)