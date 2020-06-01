const DonationService = require("./../services/donationService");
const catchAsync = require("./../utils/catchAsync");

const moment = require("moment");
moment.locale("it");


exports.getDonation = catchAsync(async(req,res) =>{
  const donationId = req.params.donationId;
  const donation = await DonationService.getDonation(donationId);
  res.status(200).json({
    status:"success",
    data: donation
  });
}); 

exports.getOpenDonations = catchAsync(async (req, res) => {
  const openDonations = await DonationService.getOpenDonationsInFacility(req.body.facility_code);
  res.status(200).json({
    status: "success",
    data: {
      donations: openDonations
    },
  });
});


exports.startDonation = catchAsync(async (req, res) => {
  const reservationId = req.params.reservationId;
  const newDonation = await DonationService.createDonationFromReservationId(reservationId);
  
  res.status(201).json({
    status: "success",
    data: {
      donation: newDonation,
    },
  });
});

exports.uploadReportAndClose = catchAsync(async(req,res) => {
  
  const donationId = req.params.donationId;
  const closedDonation =await DonationService.uploadReportAndClose(donationId, req.file.path);

  res.status(200).json({
    status: "success",
    data: {
      donation: closedDonation,     
    },
  });
});


