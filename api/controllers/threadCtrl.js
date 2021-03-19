const Thread = require("../models/Thread");
const universalCtrl = require("./universalCtrl");
const auth = require("./auth");

exports.createThread = (req, res) => {
  let projectId = req.params.projectId;
  let thread = new Thread({
    ...req.body,
    projectId,
    bugReporter: auth.getUserIdFromToken(req),
  });
  thread
    .save()
    .then((doc) => res.status(200).json(doc))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.getSpecificThread = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findById(threadId)
    .populate("bugReporter")
    .populate("comments.author")
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err));
};

exports.getAllThreadsOfProject = (req, res) => {
  const projectId = req.params.projectId;
  Thread.find({ projectId })
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.postComment = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findById(threadId)
    .then((thread) => {
      if (thread) {
        let { comment } = req.body;
        let author = auth.getUserIdFromToken(req);
        thread.comments.push({ comment, author });
        thread
          .save()
          .populate("comments.author")
          // .then((resp) => resp.status(200).json(resp)) typing error
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err));
      } else res.status(404).end(`Thread with ID ${threadId} not found`);
    })
    .catch((err) => universalCtrl.serverDbError(err));
};

exports.updateComment = (req, res) => {
  const threadId = req.params.threadId;
  const commentId = req.params.commentId;

  Thread.findById(threadId)
    .then((thread) => {
      if (thread) {
        if (thread.comments.id(commentId) != null) {
          let { updatedComment } = req.body.comment;

          if (updatedComment) {
            thread.comments.id(commentId).comment = updatedComment;
          }

          thread
            .save()
            .then((data) => res.status(200).json(data))
            .catch((err) => universalCtrl.serverDbError(err));
        } else {
          res.status(404).end(`Comment with ID ${commentId} not found`);
        }
      } else res.status(404).end(`Thread with ID ${threadId} not found`);
    })
    .catch((err) => universalCtrl.serverDbError(err));
};

exports.updateThread = (req, res) => {
  const threadId = req.params.threadId;
  const { title, description, bugPriority, isClosed } = req.body;
  Thread.findById(threadId)
    .then((thread) => {
      if (thread) {
        // const updatedThread = {...thread, title, description, bugPriority, isClosed}; correct or not
        thread.title = title;
        thread.description = description;
        thread.bugPriority = bugPriority;
        thread.isClosed = isClosed;

        thread
          .save()
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err));
      } else res.status(404).end(`Thread with ID ${threadId} not found`);
    })
    .catch((err) => universalCtrl.serverDbError(err));
};
