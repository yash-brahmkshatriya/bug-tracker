const Project = require('../models/Project');
const User = require('../models/User');
const universalCtrl = require('./universalCtrl');
const auth = require('./auth');
const Thread = require('../models/Thread');

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

  Project.findByIdAndUpdate(
    projectId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
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
  if (operation === 'add') this.addDeveloper(req, res);
  else if (operation === 'delete') this.deleteDeveloper(req, res);
  else universalCtrl.unauthorizedError('Invalid Operation')(req, res);
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

exports.getAllProjects = (req, res) => {
  let userId = auth.getUserIdFromToken(req);
  User.findById(userId)
    .then((user) => {
      if (user) {
        switch (user.type) {
          case 'Project-Manager':
            Project.find({ projectManager: userId })
              .then((data) => res.status(200).json(data))
              .catch((err) => universalCtrl.serverDbError(err)(req, res));
            break;
          case 'Developer':
            Project.find({ developers: { $in: userId } })
              .then((data) => res.status(200).json(data))
              .catch((err) => universalCtrl.serverDbError(err)(req, res));
            break;
          case 'Bug-Reporter':
            Thread.find({ bugReporter: userId })
              .then((threads) => {
                let projectIds = threads.map((thread) => thread.projectId);
                projectIds = [...new Set(projectIds)];
                Project.find({ _id: { $in: [projectIds] } })
                  .populate('projectManager')
                  .then((data) => res.status(200).json(data))
                  .catch((err) => universalCtrl.serverDbError(err)(req, res));
              })
              .catch((err) => universalCtrl.serverDbError(err)(req, res));
            break;
          default:
            res.json(200).json({});
        }
      }
    })
    .catch((err) => universalCtrl.serverDbError(err));
};
