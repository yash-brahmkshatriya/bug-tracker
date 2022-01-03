const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const port = process.env.PORT || 8000;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/BugTracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log("Connected to database");
  })
  .catch((error) => handleError(error));

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./api/routes/user"));
app.use("/api/project", require("./api/routes/project"));

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
