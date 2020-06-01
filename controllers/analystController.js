const catchAsync = require("./../utils/catchAsync");
const AvisWorkerService = require("./../services/avisWorkerService");
const facilityService = require("./../services/facilityService");
const AppError = require('./../utils/appError');

const analyst_role = 'analyst';



exports.getAllAnalysts = catchAsync(async (req, res) => {
  const allAnalysts = await AvisWorkerService.getWorkerByRoleInFacility(analyst_role,req.body.facility_code);
  res.status(200).json({
    status: "success",
    data: {
      analysts: allAnalysts,
    },
  });
});

exports.getAnalyst = catchAsync(async (req, res) => {
  const analystId = req.params.id;
  const analyst = await AvisWorkerService.getAvisWorkerById(analystId);

  res.status(200).json({
    status: "success",
    data: {
      analyst,
    },
  });
});


exports.createAnalyst = catchAsync(async (req, res) => {

  const facility = await facilityService.getFacilitiesByUserId(req.jwt_user.id);
  req.body.facility_code = facility._id;

  const newAnalyst = await AvisWorkerService.createAvisWorker(req.body, analyst_role);
  res.status(201).json({
    status: "success",
    data: {
      analyst: newAnalyst,
    },
  });
});


exports.updateAnalyst = catchAsync(async (req, res, next) => {

  const analyst = await AvisWorkerService.updateAvisWorker(req.params.id, req.body);

  if(!analyst){ return next(new AppError("No analyst found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      analyst
    }
  });

});

exports.deleteAnalyst = catchAsync(async (req, res, next) => {
const analyst = await AvisWorkerService.deleteAvisWorker(req.params.id);
if(!analyst){ return next(new AppError("No analyst found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});
