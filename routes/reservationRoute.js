const express = require("express");

const reservationsController = require("./../controllers/reservationController");

const donationMiddleware = require("./../middlewares/donationMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");
const uploadMiddleware = require("./../middlewares/uploadMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode, reservationsController.getDailyReservations)
  .post(uploadMiddleware.uploadSingleFile('module'), authMiddleware.checkAuth, authMiddleware.checkFacilityCode,donationMiddleware.userCanDonate, reservationsController.createReservation);

router.route("/daily_slots")
  .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode,reservationsController.getDailySlots);

router
  .route("/:id")
  .get(authMiddleware.checkAuth,reservationsController.getReservation)
  .delete(authMiddleware.checkAuth,reservationsController.deleteReservation);

module.exports = router;
