const mongoose = require('mongoose');
const Thread = require('../models/Thread');
const Project = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
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
    // threads: [Thread],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', Project);
