const express = require("express");

const nationalAvisController = require("./../controllers/nationalAvisController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/stat")
  .get(authMiddleware.checkAuth, nationalAvisController.getStatistics);
 

module.exports = router;
