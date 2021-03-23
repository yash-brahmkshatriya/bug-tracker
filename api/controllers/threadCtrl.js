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
  auth.getUserTypeFromToken(req).then((user) => {
    if (user.type === 'Project-Manager') {
      Thread.findByIdAndUpdate(
        threadId,
        { $set: { seen: true } },
        { new: true }
      )
        .populate('bugReporter comments.author')
        .then((data) => res.status(200).json(data))
        .catch((err) => universalCtrl.serverDbError(err));
    } else {
      Thread.findById(threadId)
        .populate('bugReporter')
        .populate('comments.author')
        .then((data) => res.status(200).json(data))
        .catch((err) => universalCtrl.serverDbError(err));
    }
  });
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
    .populate('comments.author')
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.getComments = (req, res) => {
  const threadId = req.params.threadId;
  Thread.findById(threadId, 'comments')
    .populate('comments.author')
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateComment = (req, res) => {
  const threadId = req.params.threadId;
  const commentId = req.params.commentId;
  let { comment } = req.body;
  Thread.updateOne(
    { _id: threadId },
    { $set: { 'comments.$[element].comment': comment } },
    { arrayFilters: [{ 'element._id': commentId }], new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateThread = (req, res) => {
  const threadId = req.params.threadId;
  let { title, description, bugPriority, isClosed } = req.body;
  auth.getUserTypeFromToken(req).then((user) => {
    if (user.type === 'Project-Manager') {
      if (title || description) {
        universalCtrl.unauthorizedError('Unauthorized')(req, res);
      } else {
        Thread.findByIdAndUpdate(threadId, { $set: req.body }, { new: true })
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      }
    } else if (user.type == 'Bug-Reporter') {
      if (bugPriority || isClosed) {
        universalCtrl.unauthorizedError('Unauthorized')(req, res);
      } else {
        Thread.findByIdAndUpdate(threadId, { $set: req.body }, { new: true })
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      }
    } else universalCtrl.unauthorizedError('Unauthorized')(req, res);
  });
};
