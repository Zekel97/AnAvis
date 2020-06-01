const express = require("express");

const donationController = require("./../controllers/donationController");
const uploadMiddleware = require("./../middlewares/uploadMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router.route("/")
    .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode, donationController.getOpenDonations);

router.route("/:reservationId")
    .post(authMiddleware.checkAuth, donationController.startDonation);

router.route("/:donationId")
    .get(authMiddleware.checkAuth,donationController.getDonation)
    .patch(authMiddleware.checkAuth,uploadMiddleware.uploadSingleFile('report'), donationController.uploadReportAndClose);
   
module.exports = router;
