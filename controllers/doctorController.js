const catchAsync = require("./../utils/catchAsync");
const DoctorService = require("./../services/doctorService")

const moment = require("moment");
moment.locale("it");

exports.getAllDoctors = catchAsync(async (req, res) => {
  const allDoctors = await DoctorService.getAllDoctors();

  res.status(200).json({
    status: "success",
    data: {
      doctors: allDoctors,
    },
  });
});

exports.getDoctor = catchAsync(async (req, res) => {
  const doctorId = req.params.id;
  const doctor = await DoctorService.getDoctorById(doctorId);

  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});


exports.createDoctor = catchAsync(async (req, res) => {
  const newDoctor = await DoctorService.createDoctor(req.body);
  res.status(201).json({
    status: "success",
    data: {
      doctor: newDoctor,
    },
  });
});


exports.updateDoctor = catchAsync(async (req, res, next) => {

  const doctor = await DoctorService.updateDoctor(req.params.id, req.body);

  if(!doctor){ return next(new AppError("No doctor found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      doctor
    }
  });

});

exports.deleteDoctor = catchAsync(async (req, res) => {
const doctor = await DoctorService.deleteDoctor(req.params.id);
if(!doctor){ return next(new AppError("No doctor found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});
