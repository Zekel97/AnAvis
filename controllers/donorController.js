const catchAsync = require("./../utils/catchAsync");
const Donor = require("./../models/donorModel");
const DonorService = require("./../services/donorService");

exports.getAllDonors = catchAsync(async (req, res) => {
  const allDonors = await DonorService.getAllDonors();

  res.status(200).json({
    status: "success",
    data: {
      donors: allDonors,
    },
  });
});

exports.createDonor = catchAsync(async (req, res) => {
  const newDonor = await DonorService.createDonor(req.body);
  res.status(201).json({
    status: "success",
    data: {
      donor: newDonor,
    },
  });
});
