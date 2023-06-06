const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

// Export the Project model
module.exports = Project;
