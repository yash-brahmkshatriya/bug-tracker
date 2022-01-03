const User = require("../models/User");
const Thread = require("../models/Thread");
const jwt = require("jsonwebtoken");
const universalCtrl = require("./universalCtrl");
const { OAuth2Client } = require("google-auth-library");
const Project = require("../models/Project");

const GC_ID = process.env.GOOGLE_CLIENT_ID;
const jwtSecret = process.env.JWT_SECRET;

const google_client = new OAuth2Client(GC_ID);

exports.googleLogin = (req, res) => {
  const id_token = req.body.response.vc.id_token;
  google_client
    .verifyIdToken({ idToken: id_token, audience: GC_ID })
    .then((response) => {
      const { email_verified, email, name } = response.payload;
      if (email_verified) {
        User.findOne({ email: email }).then((user) => {
          if (user) {
            const { _id, name, email } = user;
            res.status(200).json({
              token: generateToken(user),
              user: { _id, name, email },
            });
          } else {
            let newUser = new User({ email, name });
            newUser
              .save()
              .then((user) => {
                res.status(200).json({
                  token: generateToken(user),
                  user: user,
                });
              })
              .catch((err) =>
                res.status(500).json({
                  message: "Something Went Wrong creating user in DB...",
                })
              );
          }
        });
      } else res.status(403).end("Unauthorized");
    })
    .catch((err) =>
      res.status(500).send("Something Went Wrong finding details in DB...")
    );
};

function generateToken(user) {
  var token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });
  return token;
}

function getBearerTokenFromHeaders(headers) {
  if (headers && headers?.authorization) {
    var header = headers?.authorization.split(" ");
    if (header[0] === "Bearer") return header[1];
  }
  return new Error("No Bearer Token in authorization header");
}

function verifyToken(headers) {
  try {
    var token = getBearerTokenFromHeaders(headers);
    var user_id = jwt.verify(token, jwtSecret);
    return user_id;
  } catch (err) {
    throw err;
  }
}

exports.getUserIdFromToken = (req) => {
  try {
    var user = verifyToken(req.headers);
    return user._id;
  } catch (err) {
    return null;
  }
};

exports.verifyUser = (req, res, next) => {
  try {
    var user_id = verifyToken(req.headers);
    User.findById(user_id)
      .then((user) => {
        if (user) next();
        else throw new Error("User not found");
      })
      .catch((err) => {
        universalCtrl.unauthorizedError(err)(req, res);
      });
  } catch (err) {
    universalCtrl.unauthorizedError(err)(req, res);
  }
};

// verifies owner of thread or project manager of thread
exports.verifyThreadOwner = (req, res, next) => {
  const { threadId } = req.params;
  const userId = this.getUserIdFromToken(req);

  Thread.findById(threadId)
    .populate("projectId")
    .then((thread) => {
      if (
        thread.contributor == userId ||
        thread.projectId.projectManager == userId
      )
        next();
      else universalCtrl.unauthorizedError("Unauthorized")(req, res);
    });
};

exports.verifyProjectOwner = (req, res, next) => {
  const { projectId } = req.params;
  const userId = this.getUserIdFromToken(req);
  Project.findById(projectId).then((project) => {
    if (project.projectManager == userId) next();
    else universalCtrl.unauthorizedError("Unauthorized")(req, res);
  });
};

exports.verifyCommentOwner = (req, res, next) => {
  const { threadId, commentId } = req.params;

  const userId = this.getUserIdFromToken(req);
  Thread.findById(threadId)
    // .populate('comments.author')
    .then((data) => {
      if (data.comments.id(commentId).author == userId) next();
      else universalCtrl.unauthorizedError("Unauthorized")(req, res);
    });
};

exports.getTestUser = (req, res) => {
  let email = req.body.email;
  if (email.endsWith("test.com")) {
    User.findOne({ email })
      .then((user) =>
        res.status(200).json({ user, auth_token: generateToken(user) })
      )
      .catch((err) => res.status(406).end("User not found"));
  } else universalCtrl.unauthorizedError("Unauthorized")(req, res);
};
// exports.getTestUser = (req, res) => {
//   let userType = req.body.userType.toLowerCase();
//   User.findOne({ email: `${userType}@test.com` })
//     .then((user) =>
//       res.status(200).json({ user, auth_token: generateToken(user) })
//     )
//     .catch((err) => res.status(406).end('User not found'));
// };
