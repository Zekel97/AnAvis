const express = require("express");

const userController = require("./../controllers/userController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth, authMiddleware.allowOnlyRole("facility"),userController.getAllUser);

  //.get(authMiddleware.allowOnlyRole("doctor"), userController.getAllUser);

  module.exports = router;