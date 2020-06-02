const catchAsync = require("./../utils/catchAsync");
const DonorService = require("./../services/donorService");
const avisWorkerService = require("./../services/avisWorkerService");
  
exports.getAllDonors = catchAsync(async (req, res) => {
  const allDonors = await DonorService.getDonorsByFacility(req.body.facility_code);
  
  res.status(200).json({
    status: "success",
    data: {
      donors: allDonors,
    },
  });
});
  
exports.createDonor = catchAsync(async (req, res) => {
  const employee = await avisWorkerService.getAvisWorkerByUserId(req.jwt_user.id);
  req.body.facility_code = employee.facility_code;
  
  const newDonor = await DonorService.createDonor(req.body);
  res.status(201).json({
    status: "success",
    data: {
      donor: newDonor,
    },
  });
});
  
exports.updateDonor = catchAsync(async (req, res, next) => {
  
  console.log(req.params.id);
  console.log(req.body);
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




















