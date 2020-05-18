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

exports.updateDonor = catchAsync(async (req, res, next) => {

  const donor = await DonorService.updateDonor(req.params.id, req.body);

  if(!donor){ return next(new AppError("No todo found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      donor
    }
  });

});

exports.deleteDonor = catchAsync(async (req, res) => {
const donor = await DonorService.deleteDonor(req.params.id);
if(!donor){ return next(new AppError("No donor found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});

exports.getDonor = catchAsync(async (req, res) => {
  const donorId = req.params.id;
  const donor = await DonorService.getDonorById(donorId);

  res.status(200).json({
    status: "success",
    data: {
      donor,
    },
  });
});