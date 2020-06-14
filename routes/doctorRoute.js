const express = require("express");

const doctorController = require("./../controllers/doctorController");

const authMiddleware = require("./../middlewares/authMiddleware");


const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode,doctorController.getAllDoctors)
  .post(authMiddleware.checkAuth, doctorController.createDoctor);

router
  .route("/:id")
  .get(authMiddleware.checkAuth,doctorController.getDoctor)
  .patch(authMiddleware.checkAuth,doctorController.updateDoctor)
  .delete(authMiddleware.checkAuth,doctorController.deleteDoctor);



module.exports = router;