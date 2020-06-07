const express = require("express");

const userController = require("./../controllers/userController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth, userController.getAllUser);

router
  .route("/:id")
  .get(authMiddleware.checkAuth, userController.getUser)
  .patch(authMiddleware.checkAuth, userController.updateUser);

router
  .route("/:id/reset")
  .patch(authMiddleware.checkAuth, userController.resetPassword);
  //.get(authMiddleware.allowOnlyRole("doctor"), userController.getAllUser);

  module.exports = router;