const Project = require("../models/Project");
const Thread = require("../models/Thread");
const User = require("../models/User");
const universalCtrl = require("./universalCtrl");
const auth = require("./auth");
const { startSession } = require("mongoose");

exports.createProject = (req, res) => {
  let projectManager = auth.getUserIdFromToken(req);
  let project = new Project({ projectManager });
  project
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
// review this controller
exports.getProject = (req, res) => {
  let projectId = req.params.projectId;
  Project.findById(projectId)
    .populate("developers projectManager")
    .then((data) => {
      Thread.find({ projectId })
        .populate("bugReporter")
        .then((threadArr) => {
          data.threads = threadArr;
          res.status(200).json(data);
        });
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
// how to populate threads if ref is not given
exports.getProject = (req, res) => {
  let projectId = req.params.projectId;
  Project.findById(projectId)
    .populate("developers projectManager threads")
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateProject = (req, res) => {
  const projectId = req.params.projectId;
  const { name, description, tags } = req.body;
  Project.findById(projectId)
    .then((project) => {
      project.name = name ? name : project.name;
      project.description = description;
      project.tags = tags;
      project
        .save()
        .then((data) => res.status(202).json(data))
        .catch((err) => universalCtrl.serverDbError(err)(req, res));
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
// addDeveloper
// deleteDeveloper
// addTags
// deleteTags

// exports.getAllProjects = (req, res) => {
//   let userId = auth.getUserIdFromToken(req);
//   User.findById(userId)
//     .then((user) => {
//       if (user) {
//         switch (user.type) {
//           case 'Project-Manager':
//             Project.find({ projectManager: userId })
//               .then((data) => res.status(200).json(data))
//               .catch((err) => universalCtrl.serverDbError(err));
//             break;
//           case 'Developers':
//             Project.find({ developers: { $in: [userId] } })
//               .then((data) => res.status(200).json(data))
//               .catch((err) => universalCtrl.serverDbError(err));
//             break;
//           default:
//             res.json(200).json({});
//         }
//       }
//     })
//     .catch((err) => universalCtrl.serverDbError(err));
// };
