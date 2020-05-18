const catchAsync = require("./../utils/catchAsync");
const Doctor = require("./../models/doctorModel");
exports.getDoctorById = async (id) => {
    const doctor = await Doctor.findById(id);
    return doctor;
  };

exports.getAllDoctors = async () => {
    const doctor = await Doctor.find();
    return doctor;
}

exports.createDoctor = async (doctorData) => {
    const newDoctor = await Doctor.create(doctorData);
    return newDoctor;
}

exports.updateDoctor = async (doctorId, doctorData) => {
    const newDoctor = await Doctor.findByIdAndUpdate(doctorId, doctorData, {
        new: true,
        runValidators: true
      });
    return newDoctor;
}

exports.deleteDoctor = async (doctorId) => {
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    return doctor;
}