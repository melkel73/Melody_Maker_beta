const fs = require('fs');
const Project = require('./models/project'); // Replace with your project model

// Read the projectdata.json file
fs.readFile('projectdata.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading projectdata.json:', err);
    return;
  }

  try {
    const projects = JSON.parse(data);

    // Insert each project into the database
    projects.forEach((projectData) => {
      const project = new Project(projectData);

      project.save((err) => {
        if (err) {
          console.error('Error saving project:', err);
        } else {
          console.log('Project saved:', project.name);
        }
      });
    });
  } catch (error) {
    console.error('Error parsing projectdata.json:', error);
  }
});
