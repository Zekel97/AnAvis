const userService = require("./userService");
const donorService = require("./donorService");
const Facility = require("./../models/facilityModel");


exports.getFacilityById = async (id) => {
    const facility = await Facility.findById(id);
    return facility;
  };

  
  exports.getFacilitiesByUserId = async (id) => {
    const facility = await Facility.findOne({"user_id":id});
    return facility;
}

exports.getAllFacilities = async () => {
    const facility = await Facility.find();
    return facility;
}

exports.createFacility = async (facilityData) => {

    facilityData.role = "facility";
    const newUser = await userService.createUser(facilityData.mail,facilityData.password,facilityData.role);
    if(!newUser){ return null;}

    facilityData.user_id = newUser._id;
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
    const facility = await Facility.findById(facilityId);
    await userService.deleteUser(facility.user_id);
    const deletedFacility = await Facility.findByIdAndDelete(facilityId);
    return deletedFacility;
}

exports.requireBloodByFacilities= async (facilityId, bloodType) => {

 const donors = await donorService.getDonorsByFacilityAndBloodType(facilityId, bloodType);
 const avaiableDonors = donors.filter(donorService.donorCanDonate);
 return avaiableDonors;
};