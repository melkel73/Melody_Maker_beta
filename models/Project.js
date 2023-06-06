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

// Function to create a new project
const createProject = async (title, description, createdBy) => {
  const query = 'INSERT INTO projects (title, description, createdBy) VALUES (?, ?, ?)';
  const values = [title, description, createdBy];

  try {
    const results = await executeQuery(query, values);
    return results.insertId;
  } catch (error) {
    throw error;
  }
};

// Function to get all projects
const getAllProjects = async () => {
  const query = 'SELECT * FROM projects';

  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProject,
  getAllProjects
};
