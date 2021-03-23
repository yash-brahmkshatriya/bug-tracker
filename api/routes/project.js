const projectRouter = require('express').Router();
const auth = require('../controllers/auth');
const universalCtrl = require('../controllers/universalCtrl');
const projectCtrl = require('../controllers/projectCtrl');
const threadCtrl = require('../controllers/threadCtrl');

projectRouter
  .route('/')
  .get(auth.verifyUser('any'), projectCtrl.getAllProjects)
  .post(auth.verifyUser('Project-Manager'), projectCtrl.createProject);
// GET ma All projects GET aavse

projectRouter
  .route('/:projectId')
  .get(auth.verifyUser('any'), projectCtrl.getProject)
  .put(auth.verifyUser('Project-Manager'), projectCtrl.updateProject)
  .delete(auth.verifyUser('Project-Manager'), projectCtrl.deleteProject)
  .post(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/manageDev')
  .post(auth.verifyUser('Project-Manager'), projectCtrl.manageDevelopers)
  .get(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/threads')
  .get(auth.verifyUser('any'), threadCtrl.getAllThreadsOfProject)
  .post(auth.verifyUser('Bug-Reporter'), threadCtrl.createThread)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/threads/:threadId')
  .get(auth.verifyUser('any'), threadCtrl.getSpecificThread)
  .put(auth.verifyUser('any'), threadCtrl.updateThread)
  .post(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/threads/:threadId/comments')
  .get(auth.verifyUser('any'), threadCtrl.getComments)
  .post(auth.verifyUser('any'), threadCtrl.postComment)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route('/:projectId/threads/:threadId/comments/:commentId')
  .put(
    auth.verifyUser('any'),
    auth.verifyCommentOwner,
    threadCtrl.updateComment
  )
  .get(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted)
  .post(universalCtrl.requestNotAccepted);

module.exports = projectRouter;
