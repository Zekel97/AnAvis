const express = require("express");

const userController = require("./../controllers/userController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser);

  //.get(authMiddleware.allowOnlyRole("doctor"), userController.getAllUser);

  module.exports = router;