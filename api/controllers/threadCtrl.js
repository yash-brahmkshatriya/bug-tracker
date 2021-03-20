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
  // Bug-reporter can update => title, description
  // Project-Manager can update => bugPriority, isClosed
  // update rights can be handle from front end
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

exports.updateCommentAsync = (req, res) => {
  const threadId = req.params.threadId;
  const commentId = req.params.commentId;
  try {
    const thread = Thread.findById(threadId);
    if (!mongoose.Types.ObjectId.isValid(commentId))
      return res.status(404).send(`No Thread with id: ${id} exist`);

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Comment with id: ${id} exist`);

    if (thread.comments.id(commentId) != null) 
      let { updatedComment } = req.body.comment;

    if (updatedComment) {
      // thread.comments.id(commentId).comment = updatedComment;
      const index = thread.comments.findIndex((comment) => comment._id === String(commentId));
      thread.comments[index] = updatedComment;
      await Thread.findByIdAndUpdate(threadId, thread, { new: true });
      res.json(thread); 
    }
  } catch {
    // .catch((err) => universalCtrl.serverDbError(err));
    res.status(404).json({ message: error.message });
  }
      
};

exports.updateThreadAsync = async (req, res) => {
  const threadId = req.params.threadId;
  const { title, description, bugPriority, isClosed } = req.body;
  try {
    const thread = await Thread.findById(threadId);
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Thread with id: ${id} exist`);
  
    // const updatedThread = {...thread, title, description, bugPriority, isClosed}; correct or not
    thread.title = title;
    thread.description = description;
    thread.bugPriority = bugPriority;
    thread.isClosed = isClosed;
  
    await Thread.findByIdAndUpdate(threadId, thread, { new: true });
    res.json(thread);
  } catch {
    // .catch((err) => universalCtrl.serverDbError(err));
    res.status(404).json({ message: error.message });
  }
};
