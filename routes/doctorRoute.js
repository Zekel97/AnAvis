const express = require("express");

const doctorController = require("./../controllers/doctorController");

const router = express.Router();

router
  .route("/")
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);

module.exports = router;
