const express = require("express");

const analystController = require("./../controllers/analystController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth,authMiddleware.checkFacilityCode, analystController.getAllAnalysts)
  .post(authMiddleware.checkAuth,analystController.createAnalyst);

router
  .route("/:id")
  .get(authMiddleware.checkAuth,analystController.getAnalyst)
  .patch(authMiddleware.checkAuth,analystController.updateAnalyst)
  .delete(authMiddleware.checkAuth,analystController.deleteAnalyst);



module.exports = router;