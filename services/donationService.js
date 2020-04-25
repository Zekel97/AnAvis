const moment = require("moment");
moment.locale("it");

const Donation = require("./../models/donationModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOpenDonations = async () => {
  const openDonations = await Donation.find();
  return openDonations;
};