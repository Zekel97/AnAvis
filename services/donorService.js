const Donor = require("./../models/donorModel");
const userService = require("./userService");


const moment = require("moment");
moment.locale("it");

exports.getDonorById = async (id) => {
    const donor = await Donor.findById(id);
    return donor;
  };

  exports.getDonorByUserId = async (id) => {
    const donor = await Donor.findOne({"user_id":id});
    return donor;
  };

exports.getDonorsByFacility = async (facilityId) => {
    const donors = await Donor.find({"facility_code": facilityId})
    return donors;
}

exports.getAllDonors = async () => {
    const donor = await Donor.find();
    return donor;
}

exports.getAllPopulatedDonors = async () => {
  const donor = await Donor.find().populate("user_id");
  return donor;
}

exports.createDonor = async (donorData) => {

    //Mettere tutti i controlli affinchè crei correttamente il donor

    donorData.role = "donor";
    const newUser = await userService.createUser(donorData.mail,donorData.password,donorData.role);
    if(!newUser){ return null;}

    donorData.user_id = newUser._id;
    const newDonor = await Donor.create(donorData);
    return newDonor;
}

exports.updateDonor = async (donorId, donorData) => {
    const newDonor = await Donor.findByIdAndUpdate(donorId, donorData, {
        new: true,
        runValidators: true
      });
    return newDonor;
}

exports.deleteDonor = async (donorId) => {
    const donor = await Donor.findById(donorId);
    await userService.deleteUser(donor.user_id);
    const deletedDonor = await Donor.findByIdAndDelete(donorId);
    return deletedDonor;
}


exports.getDonorsByFacilityAndBloodType = async (facility, bloodType)=>{
  const donors = await Donor.find({"facility_code": facility, "blood_group": bloodType})
  return donors;
}

exports.donorCanDonate = (donor) => {
  const last_donation = donor.last_donation_date;
  if(!last_donation) return true;
  return !(moment(last_donation).add(3, "M").isAfter(moment()));
}


