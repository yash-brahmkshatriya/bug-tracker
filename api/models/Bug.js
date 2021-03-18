const mongoose = require("mongoose");

const Bug = mongoose.Schema({
  type: {
    type: String,
    enum: ["Bug", "Query"],
    default: "Bug",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  bugReporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seen: {
    type: Boolean,
  },
  priority: {
    type: Number,
    enum: ["Critical", "High", "Medium", "Low", "Not applicable"],
    default: "Low",
  },
});

module.exports = mongoose.model("Bug", Bug);
