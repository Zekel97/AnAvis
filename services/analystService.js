const catchAsync = require("./../utils/catchAsync");
const Analyst = require("./../models/analystModel");

exports.getAnalystById = async (id) => {
    const analyst = await Analyst.findById(id);
    return analyst;
  };

exports.getAllAnalysts = async () => {
    const analyst = await Analyst.find();
    return analyst;
}

exports.createAnalyst = async (analystData) => {
    const newAnalyst = await Analyst.create(analystData);
    return newAnalyst;
}

exports.updateAnalyst = async (analystId, analystData) => {
    const newAnalyst = await Analyst.findByIdAndUpdate(analystId, analystData, {
        new: true,
        runValidators: true
      });
    return newAnalyst;
}

exports.deleteAnalyst = async (analystId) => {
    const analyst = await Analyst.findByIdAndDelete(analystId);
    return analyst;
}