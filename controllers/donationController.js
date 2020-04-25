const Donation = require("./../models/donationModel");
const Reservation = require("./../models/reservationModel");
const ReservationService = require("./../services/reservationService");
const DonationService = require("./../services/donationService");

const catchAsync = require("./../utils/catchAsync");

const moment = require("moment");
moment.locale("it");

async function createDonationFromPrenotationId(reservationId) {
  await Reservation.findByIdAndDelete(reservationId);
  const newDonation = await Donation.create({
    user_code: reservation.user_code,
    donation_date: reservation.date,
    status: "Processing",
  });
  return newDonation;
}

async function createDonationFromBody(donationData) {
  const newDonation = await Donation.create(donationData);
  return newDonation;
}

exports.getOpenDonations = catchAsync(async (req, res) => {
  const openDonations = await DonationService.getOpenDonations();
  res.status(200).json({
    status: "success",
    data: {
      donations: openDonations
    },
  });
});

exports.createDonation = catchAsync(async (req, res) => {
  const reservationId = req.params.reservationId;

  let newDonation;
  if (reservationId) {
    newDonation = await createDonationFromPrenotationId(reservationId);
  } else {
    newDonation = await createDonationFromBody(req.body);
  }

  console.log("newDonation = " + (await newDonation));

  res.status(201).json({
    status: "success",
    data: {
      donation: newDonation,
    },
  });
});