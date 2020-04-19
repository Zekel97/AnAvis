const catchAsync = require("./../utils/catchAsync");
const Doctor = require("./../models/doctorModel");
const moment = require("moment");
moment.locale("it");

exports.getAllDoctors = catchAsync(async (req, res) => {
  const allDoctors = await Doctor.find();

  res.status(200).json({
    status: "success",
    data: {
      doctors: allDoctors,
    },
  });
});

exports.createDoctor = catchAsync(async (req, res) => {
  const newDoctor = await Doctor.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      doctor: newDoctor,
    },
  });
});
