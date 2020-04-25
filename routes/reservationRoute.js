const express = require("express");

const reservationsController = require("./../controllers/reservationController");
const donationMiddleware = require("./../middlewares/donationMiddleware");
const router = express.Router();

router
  .route("/")
  .get(reservationsController.getDailyReservations)
  .post(donationMiddleware.userCanDonate,reservationsController.createReservation);

router.route("/daily_slots").get(reservationsController.getDailySlots);

router
  .route("/:id")
  .get(reservationsController.getReservation)
  .delete(reservationsController.deleteReservation);

module.exports = router;
