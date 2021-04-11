const projectRouter = require("express").Router();
const auth = require("../controllers/auth");
const universalCtrl = require("../controllers/universalCtrl");
const projectCtrl = require("../controllers/projectCtrl");
const threadCtrl = require("../controllers/threadCtrl");

projectRouter
  .route("/")
  .get(auth.verifyUser, projectCtrl.getDashBoardDetails)
  .post(auth.verifyUser, projectCtrl.createProject);

projectRouter
  .route("/explore")
  .get(projectCtrl.exploreProjects)
  .post(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId")
  .get(projectCtrl.getProject)
  .put(auth.verifyUser, auth.verifyProjectOwner, projectCtrl.updateProject)
  .delete(auth.verifyUser, auth.verifyProjectOwner, projectCtrl.deleteProject)
  .post(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId/manageDev")
  .post(auth.verifyUser, auth.verifyProjectOwner, projectCtrl.manageDevelopers)
  .get(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId/threads")
  .get(threadCtrl.getAllThreadsOfProject)
  .post(auth.verifyUser, threadCtrl.createThread)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId/threads/:threadId")
  .get(threadCtrl.getSpecificThread)
  .put(auth.verifyUser, auth.verifyThreadOwner, threadCtrl.updateThread)
  .post(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId/threads/:threadId/comments")
  .get(threadCtrl.getComments)
  .post(auth.verifyUser, threadCtrl.postComment)
  .put(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted);

projectRouter
  .route("/:projectId/threads/:threadId/comments/:commentId")
  .put(auth.verifyUser, auth.verifyCommentOwner, threadCtrl.updateComment)
  .get(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted)
  .post(universalCtrl.requestNotAccepted);

module.exports = projectRouter;
