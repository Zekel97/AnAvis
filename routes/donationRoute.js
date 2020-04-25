const express = require("express");

const donationController = require("./../controllers/donationController");

const router = express.Router();

router.route("/").get(donationController.getOpenDonations);
router.route("/:reservationId?").post(donationController.createDonation);


module.exports = router;
