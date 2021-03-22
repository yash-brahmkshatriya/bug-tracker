const Thread = require('../models/Thread');
const universalCtrl = require('./universalCtrl');
const auth = require('./auth');

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
    .populate('bugReporter')
    .populate('comments.author')
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
  let { comment } = req.body;
  let author = auth.getUserIdFromToken(req);
  Thread.findByIdAndUpdate(
    threadId,
    {
      $push: { comments: { comment, author } },
    },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateComment = (req, res) => {
  const threadId = req.params.threadId;
  const commentId = req.params.commentId;
  let { comment } = req.body;
  Thread.updateOne(
    { _id: threadId },
    { $set: { 'comments.$[idx].comment': comment } },
    { arrayFilters: [{ 'element._id': commentId }], new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateThreadByManager = (req, res) => {
  const threadId = req.params.threadId;
  const { bugPriority, isClosed } = req.body;
  Thread.findByIdAndUpdate(threadId, { $set: { bugPriority, isClosed } })
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateThreadByReporter = (req, res) => {
  const threadId = req.params.threadId;
  const { title, description } = req.body;
  Thread.findByIdAndUpdate(threadId, { $set: { title, description } })
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};
