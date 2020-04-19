const express = require("express");

const donationController = require("./../controllers/donationController");

const router = express.Router();

router.route("/:reservationId?").post(donationController.createDonation);

module.exports = router;
