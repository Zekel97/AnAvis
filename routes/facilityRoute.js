const express = require("express");

const facilityController = require("./../controllers/facilityController");
const authMiddleware = require("./../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth,facilityController.getAllFacilities)
  .post(authMiddleware.checkAuth,facilityController.createFacility);

router
  .route("/:id")
  .get(authMiddleware.checkAuth,facilityController.getFacility)
  .patch(authMiddleware.checkAuth,facilityController.updateFacility)
  .delete(authMiddleware.checkAuth,facilityController.deleteFacility);


router
  .route("/:id/reservations")
  .get(authMiddleware.checkAuth, facilityController.getReservationsOfFacility)

//date -> yyyy-mm-dd
router 
  .route("/:id/reservations/:date")  
  .get(authMiddleware.checkAuth, facilityController.getReservationsOfFacilityInDate)

router
  .route("/:id/require_blood")
  .post(authMiddleware.checkAuth,facilityController.requireBlood);

module.exports = router;
