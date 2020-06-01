const express = require("express");

const authController = require("./../controllers/authController");
const authMiddleware = require("./../middlewares/authMiddleware")

const router = express.Router();

router
    .route("/login")
    .post(authController.login)
  
router
    .route("/me")
    .get(authMiddleware.checkAuth,authController.me);

module.exports = router;