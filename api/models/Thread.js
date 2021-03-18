const mongoose = require("mongoose");

var comment = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Thread = mongoose.Schema(
  {
    bug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bug",
    },
    comments: [comment],
    isClosed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
<<<<<<< HEAD
module.exports = mongoose.model("Thread", Bug);
=======
module.exports = mongoose.model("Thread", Thread);
>>>>>>> deep
