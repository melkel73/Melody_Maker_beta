const fs = require('fs');

const path = require('path');
const { Melodymover } = require('./models'); // Project name

const seed = async () => {
  try {
    // Referring back to Melody Mover data from the JSON file
    const filePath = path.join(__dirname, 'projectData.json');
    const rawData = fs.readFileSync(filePath);
    const projectData = JSON.parse(rawData);

    // Seed the projects into the database
    await Project.bulkCreate(projectData.projects);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Exit the process after seeding
    process.exit(0);
  }
};

seed();

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

