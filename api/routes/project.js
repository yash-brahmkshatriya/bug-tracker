const projectRouter = require('express').Router();
const auth = require('../controllers/auth');
const universalCtrl = require('../controllers/universalCtrl');
const projectCtrl = require('../controllers/projectCtrl');
const threadCtrl = require('../controllers/threadCtrl');

projectRouter
  .route('/')
  .post(auth.verifyUser('Project-Manager'), projectCtrl.createProject);

projectRouter
  .route('/:projectId')
  .get(auth.verifyUser('any'), projectCtrl.getProject)
  .post(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/threads')
  .get(auth.verifyUser('any'), threadCtrl.getAllThreadsOfProject)
  .post(auth.verifyUser('Bug-Reporter'), threadCtrl.createThread);

module.exports = projectRouter;
