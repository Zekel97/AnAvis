const AvisWorker = require("./../models/avisWorkerModel");
const userService = require("./userService");

exports.getAvisWorkerById = async (id) => {
    const avisWorker = await AvisWorker.findById(id);
    return avisWorker;
  };

  exports.createAvisWorker = async (data, role) => {
    data.role = role;
    const newUser = await userService.createUser(data.mail,data.password,data.role);
    if(!newUser){ return null;}

    data.user_id = newUser._id;
    const newAvisWorker = await AvisWorker.create(data);
    return newAvisWorker;
}

exports.getAllWorkerByRole = async (role) => {
    const avisWorkers = await AvisWorker.find({"role":role});
    return avisWorkers;
}

exports.getAllWorkerByFacility = async (facilityId) => {
    const avisWorkers = await AvisWorker.find({"facility_code":facilityId});
    return avisWorkers;
}

exports.updateAvisWorker = async (avisWorkerId, avisWorkerData) => {
    const newAvisWorker = await AvisWorker.findByIdAndUpdate(avisWorkerId, avisWorkerData, {
        new: true,
        runValidators: true
      });
    return newAvisWorker;
}


exports.deleteAvisWorker = async (avisWorkerId) => {
    const avisWorker = await AvisWorker.findById(avisWorkerId);
    await userService.deleteUser(avisWorker.user_id);
    const deletedWorker = await AvisWorker.findByIdAndDelete(avisWorkerId);
    return deletedWorker;
}