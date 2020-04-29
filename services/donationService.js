const moment = require("moment");
moment.locale("it");

const Donation = require("./../models/donationModel");
const catchAsync = require("./../utils/catchAsync");

const ReservationService = require("./../services/reservationService");

exports.getOpenDonations = async () => {
  const openDonations = await Donation.find({status:"Processing"});
  return openDonations;
};

exports.getDonation = async (donationId) => {
  const donation = await Donation.findById(donationId);
  return donation;
};

exports.uploadReportAndClose = async (donationId, report_path) => {
  update = {report_path: report_path, status: "Concluded"};
  const closedDonation = Donation.findByIdAndUpdate(donationId, update, {
    new: true,
    runValidators: true
  });
  return closedDonation;
};

exports.createDonationFromReservationId = async (reservationId) => {
  const reservation = await ReservationService.deleteReservation(reservationId);
  const newDonation = await Donation.create({
    user_code: reservation.user_code,
    donation_date: reservation.date,
    status: "Processing", 
  });
  return newDonation;
}

