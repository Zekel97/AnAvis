const Donor = require("./../models/donorModel");
const userService = require("./userService");

exports.getDonorById = async (id) => {
    const donor = await Donor.findById(id);
    return donor;
  };

exports.getDonorsByFacility = async (facilityId) => {
    const donors = await Donor.find({"facility_code": seatId})
    return donors;
}

exports.getAllDonors = async () => {
    const donor = await Donor.find();
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