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
