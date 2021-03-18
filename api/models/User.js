const mongoose = require("mongoose");

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
    enum: ["Project-Manager", "Bug-Reporter", "Reveloper"],
    default: "Bug-Reporter",
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("User", User);
=======
module.exports = mongoose.model("User", User);
>>>>>>> deep
