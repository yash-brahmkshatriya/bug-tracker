const Thread = require('../models/Thread');
const universalCtrl = require('./universalCtrl');
const auth = require('./auth');

exports.createThread = (req, res) => {
  let projectId = req.params.projectId;
  let thread = new Thread({
    ...req.body,
    projectId,
    contributor: auth.getUserIdFromToken(req),
  });

  thread
    .save()
    .then((doc) => Thread.populate(thread, { path: 'contributor projectId' }))
    .then((doc) => res.status(200).json(doc))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.getSpecificThread = (req, res) => {
  const threadId = req.params.threadId;
  let userId = auth.getUserIdFromToken(req);
  Thread.findById(threadId)
    .populate('contributor comments.author projectId')
    .then((thread) => {
      if (thread.projectId.projectManager == userId) {
        Thread.findByIdAndUpdate(
          threadId,
          { $set: { seen: true } },
          { new: true }
        )
          .populate('contributor comments.author projectId')
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else res.status(200).json(thread);
    })
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.getAllThreadsOfProject = (req, res) => {
  const projectId = req.params.projectId;
  Thread.find({ projectId })
    .sort({ createdAt: -1 })
    .populate('contributor projectId')
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.getAllThreadsForContributor = (req, res) => {
  let userId = auth.getUserIdFromToken(req);
  Thread.find({ contributor: userId })
    .populate('contributor')
    .then((data) => res.status(200).json(data))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.postComment = (req, res) => {
  const threadId = req.params.threadId;
  let { comment } = req.body;

  let role = 'Contributor';
  let author = auth.getUserIdFromToken(req);
  Thread.findById(threadId)
    .populate('projectId')
    .then((thread) => {
      if (thread.projectId.developers.includes(author)) {
        role = 'Developer';
      } else if (thread.projectId.projectManager == author) {
        role = 'Project Manager';
      }
      Thread.findByIdAndUpdate(
        threadId,
        {
          $push: { comments: { comment, author, role } },
        },
        { new: true }
      )
        .populate('comments.author')
        .then((data) => res.status(200).json(data.comments))
        .catch((err) => universalCtrl.serverDbError(err)(req, res));
    })
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
    .populate('comments.author')
    .then((data) => res.status(200).json({ success: true }))
    .catch((err) => universalCtrl.serverDbError(err)(req, res));
};

exports.updateThread = (req, res) => {
  const threadId = req.params.threadId;
  let userId = auth.getUserIdFromToken(req);
  let { bugPriority, isClosed, title, description, bugType } = req.body;
  Thread.findById(threadId)
    .populate('projectId')
    .then((thread) => {
      if (
        thread.projectId.projectManager == userId &&
        thread.contributor == userId
      ) {
        Thread.findByIdAndUpdate(threadId, { $set: req.body }, { new: true })
          .populate('contributor comments.author projectId')
          .then((data) => res.status(200).json(data))
          .catch((err) => universalCtrl.serverDbError(err)(req, res));
      } else if (thread.projectId.projectManager == userId) {
        if (title || description) {
          universalCtrl.unauthorizedError('Unauthorized')(req, res);
        } else {
          const updatedThread = thread;
          updatedThread.bugPriority = bugPriority;
          updatedThread.isClosed = isClosed;
          updatedThread.bugType = bugType;
          Thread.findByIdAndUpdate(
            threadId,
            { $set: updatedThread },
            { new: true }
          )
            .populate('contributor comments.author projectId')
            .then((data) => res.status(200).json(data))
            .catch((err) => universalCtrl.serverDbError(err)(req, res));
        }
      } else {
        if (bugPriority || isClosed || bugType) {
          universalCtrl.unauthorizedError('Unauthorized')(req, res);
        } else {
          Thread.findByIdAndUpdate(threadId, { $set: req.body }, { new: true })
            .populate('contributor comments.author projectId')
            .then((data) => res.status(200).json(data))
            .catch((err) => universalCtrl.serverDbError(err)(req, res));
        }
      }
    });
};
