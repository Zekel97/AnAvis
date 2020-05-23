const AvisWorker = require("./../models/avisWorkerModel");

exports.getAvisWorkerById = async (id) => {
    const avisWorker = await AvisWorker.findById(id);
    return avisWorker;
  };

  exports.createAvisWorker = async (data, role) => {
    data.role = role;
    const newAvisWorker = await AvisWorker.create(data);
    return newAvisWorker;
}

exports.getAllWorkerByRole = async (role) => {
    const avisWorkers = await AvisWorker.find({"role":role});
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
    const avisWorker = await AvisWorker.findByIdAndDelete(avisWorkerId);
    return avisWorker;
}