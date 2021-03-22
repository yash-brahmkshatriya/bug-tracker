const Project = require('../models/Project');
const User = require('../models/User');
const universalCtrl = require('./universalCtrl');
const auth = require('./auth');

exports.createProject = (req, res) => {
  let { name, description } = req.body;
  let projectManager = auth.getUserIdFromToken(req);
  let project = new Project({ projectManager, name, description });
  project
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
// review this controller
exports.getProject = (req, res) => {
  let projectId = req.params.projectId;
  Project.findById(projectId)
    .populate('developers projectManager')
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateProject = (req, res) => {
  const projectId = req.params.projectId;
  const { name, description, tags } = req.body;

  Project.findByIdAndUpdate(
    projectId,
    {
      $set: { name, description },
      $addToSet: {
        tags: [...tags],
      },
    },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.addDeveloper = (req, res) => {
  const projectId = req.params.projectId;
  const { email } = req.body;
  User.findOne({ email, type: 'Developer' })
    .then((user) => {
      if (user) {
        Project.findByIdAndUpdate(
          projectId,
          {
            $addToSet: { developers: user._id },
          },
          { new: true }
        )
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else {
        res.status(404).end('User with given email ID not found');
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
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else res.status(404).end('User not found');
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

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
