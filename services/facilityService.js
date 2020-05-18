const catchAsync = require("./../utils/catchAsync");
const Facility = require("./../models/facilityModel");
exports.getFacilityById = async (id) => {
    const facility = await Facility.findById(id);
    return facility;
  };

exports.getAllFacilities = async () => {
    const facility = await Facility.find();
    return facility;
}

exports.createFacility = async (facilityData) => {
    const newFacility = await Facility.create(facilityData);
    return newFacility;
}

exports.updateFacility = async (facilityId, facilityData) => {
    const newFacility = await Facility.findByIdAndUpdate(facilityId, facilityData, {
        new: true,
        runValidators: true
      });
    return newFacility;
}

exports.deleteFacility = async (facilityId) => {
    const facility = await Facility.findByIdAndDelete(facilityId);
    return facility;
}