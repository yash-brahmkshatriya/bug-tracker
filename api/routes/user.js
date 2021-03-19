const userRouter = require('express').Router();
const auth = require('../controllers/auth');
const universalCtrl = require('../controllers/universalCtrl');

userRouter
  .route('/googleLogin')
  .post(auth.googleLogin)
  .get(universalCtrl.requestNotAccepted)
  .delete(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted);

userRouter
  .route('/devTest')
  .post(auth.getTestUser)
  .get(universalCtrl.requestNotAccepted)
  .post(universalCtrl.requestNotAccepted)
  .put(universalCtrl.requestNotAccepted);

module.exports = userRouter;
