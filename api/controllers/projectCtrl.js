const Project = require("../models/Project");
const User = require("../models/User");
const universalCtrl = require("./universalCtrl");
const auth = require("./auth");
const Thread = require("../models/Thread");

exports.createProject = (req, res) => {
  let { name, description } = req.body;
  let projectManager = auth.getUserIdFromToken(req);
  let project = new Project({ projectManager, name, description });
  project
    .save()
    .then((doc) => Project.populate(project, { path: "projectManager" }))
    .then((doc) => res.status(200).json(doc))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
// review this controller
exports.getProject = (req, res) => {
  let projectId = req.params.projectId;
  Project.findById(projectId)
    .populate("developers projectManager")
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.findByIdAndUpdate(
    projectId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((data) => res.status(200).json({ success: true }))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.deleteProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.findByIdAndDelete(projectId)
    .then((done) => res.status(200).json({ success: true }))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.manageDevelopers = (req, res) => {
  const operation = req.query.operation;
  if (operation === "add") this.addDeveloper(req, res);
  else if (operation === "delete") this.deleteDeveloper(req, res);
  else universalCtrl.unauthorizedError("Invalid Operation")(req, res);
};

exports.addDeveloper = (req, res) => {
  const projectId = req.params.projectId;
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        Project.findByIdAndUpdate(
          projectId,
          {
            $addToSet: { developers: user._id },
          },
          { new: true }
        )
          .populate("developers")
          .then((data) => res.status(200).json(data.developers))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else {
        res.status(404).end("User with given email ID not found");
      }
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.deleteDeveloper = (req, res) => {
  const projectId = req.params.projectId;
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        Project.findByIdAndUpdate(
          projectId,
          { $pull: { developers: user._id } },
          { new: true }
        )
          .populate("developers")
          .then((data) => res.status(200).json(data.developers))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else res.status(404).end("User not found");
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

// exports.getAllProjects = (req, res) => {
//   let userId = auth.getUserIdFromToken(req);
//   User.findById(userId)
//     .then((user) => {
//       if (user) {
//         Thread.find({ contributor: userId })
//           .then((threads) => {
//             let projectIds = threads.map((thread) => thread.projectId);
//             projectIds = [...new Set(projectIds)];
//             Project.find({
//               $or: [
//                 { _id: { $in: [projectIds] } },
//                 { projectManager: userId },
//                 { developers: { $in: userId } },
//               ],
//             })
//               .populate('projectManager developers')
//               .then((projects) => res.status(200).json(projects))
//               .catch((err) => universalCtrl.serverDbError(err)(req, res));
//           })
//           .catch((err) => universalCtrl.serverDbError(err)(req, res));
//       } else universalCtrl.unauthorizedError('User not found')(req, res);
//     })
//     .catch((err) => universalCtrl.serverDbError(err)(req, res));
// };

exports.getDashBoardDetails = (req, res) => {
  let userId = auth.getUserIdFromToken(req);
  User.findById(userId)
    .then((user) => {
      if (user) {
        Thread.find({ contributor: userId }, "-comments")
          .populate("projectId contributor")
          .sort({ createdAt: -1 })
          .then((threads) => {
            Project.find({
              $or: [
                { projectManager: userId },
                { developers: { $in: userId } },
              ],
            })
              .populate("projectManager developers")
              .sort({ createdAt: -1 })
              .then((projects) => res.status(200).json({ projects, threads }))
              .catch((err) => universalCtrl.serverDbError(err)(req, res));
          })
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else universalCtrl.unauthorizedError("User not found")(req, res);
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.exploreProjects = (req, res) => {
  let { searchString, options } = req.query;
  if (!options) options = "all";
  if (searchString && searchString.length >= 3) {
    searchString = searchString.toLowerCase();
    const searchRegex = new RegExp(`^.*${searchString}.*`, "i");
    const searchOptions = [];
    if (options === "all" || options === "name") {
      searchOptions.push({ name: searchRegex });
    }
    if (options === "all") {
      searchOptions.push({ description: searchRegex });
    }
    if (options === "all" || options === "tag") {
      searchOptions.push({ tags: { $in: searchRegex } });
    }
    Project.find(
      {
        $or: searchOptions,
      },
      "-developers"
    )
      .populate("projectManager")
      .then((data) => res.status(200).json(data))
      .catch((err) => universalCtrl.serverDbError(err)(req, res));
  } else
    res.status(406).send("Search String must be minimum 3 characters long.");
};
