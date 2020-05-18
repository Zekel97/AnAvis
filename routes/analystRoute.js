const express = require("express");

const analystController = require("./../controllers/analystController");

const router = express.Router();

router
  .route("/")
  .get(analystController.getAllAnalysts)
  .post(analystController.createAnalyst);

router
  .route("/:id")
  .get(analystController.getAnalyst)
  .patch(analystController.updateAnalyst)
  .delete(analystController.deleteAnalyst);



module.exports = router;