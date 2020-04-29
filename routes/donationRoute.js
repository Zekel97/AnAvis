const express = require("express");

const donationController = require("./../controllers/donationController");
const uploadMiddleware = require("./../middlewares/uploadMiddleware");

const router = express.Router();

router.route("/")
    .get(donationController.getOpenDonations);

router.route("/:reservationId")
    .post(donationController.startDonation);

router.route("/:donationId")
    .get(donationController.getDonation)
    .patch(uploadMiddleware.uploadSingleFile('report'), donationController.uploadReportAndClose);
   
module.exports = router;
