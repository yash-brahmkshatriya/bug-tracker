const mongoose = require('mongoose');

const User = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Reporter',
  },
});

module.exports = mongoose.model('Users', User);
