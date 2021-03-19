const mongoose = require('mongoose');

const Project = mongoose.Schema({
  developers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model('Project', Project);
