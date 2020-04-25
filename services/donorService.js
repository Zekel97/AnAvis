const catchAsync = require("./../utils/catchAsync");
const Donor = require("./../models/donorModel");

exports.getDonorById = async (id) => {
    const donor = await Donor.findById(id);
    return donor;
  };

exports.getAllDonors = async () => {
    const donor = await Donor.find();
    return donor;
}

exports.createDonor = async (donorData) => {
    const newDonor = await Donor.create(donorData);
    return newDonor;
}
