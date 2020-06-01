const catchAsync = require("./../utils/catchAsync");
const AvisWorkerService = require("./../services/avisWorkerService");
const facilityService = require("./../services/facilityService");
const AppError = require('./../utils/appError');

const doctor_role = "doctor";

exports.getAllDoctors = catchAsync(async (req, res) => {
  const allDoctors = await AvisWorkerService.getWorkerByRoleInFacility(doctor_role, req.body.facility_code);

  res.status(200).json({
    status: "success",
    data: {
      doctors: allDoctors,
    },
  });
});

exports.getDoctor = catchAsync(async (req, res) => {
  const doctorId = req.params.id;
  const doctor = await AvisWorkerService.getAvisWorkerById(doctorId);

  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});


exports.createDoctor = catchAsync(async (req, res,next) => {
  //mettere controllo campi obbligatori
  
  const facility = await facilityService.getFacilitiesByUserId(req.jwt_user.id);
  req.body.facility_code = facility._id;

  const newDoctor = await AvisWorkerService.createAvisWorker(req.body, doctor_role);
  if(!newDoctor) {return next(new AppError())}
  res.status(201).json({
    status: "success",
    data: {
      doctor: newDoctor,
    },
  });
});


exports.updateDoctor = catchAsync(async (req, res, next) => {

  const doctor =await AvisWorkerService.updateAvisWorker(req.params.id, req.body);

  if(!doctor){ return next(new AppError("No doctor found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      doctor
    }
  });

});

exports.deleteDoctor = catchAsync(async (req, res,next) => {
const doctor = await AvisWorkerService.deleteAvisWorker(req.params.id);
if(!doctor){ return next(new AppError("No doctor found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});
