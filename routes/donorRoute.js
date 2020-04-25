const express = require("express");

const donorController = require("./../controllers/donorController");

const router = express.Router();

router
  .route("/")
  .get(donorController.getAllDonors)
  .post(donorController.createDonor);

module.exports = router;