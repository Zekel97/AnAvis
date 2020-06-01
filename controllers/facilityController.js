const catchAsync = require("./../utils/catchAsync");
const FacilityService = require("./../services/facilityService")
exports.getFacility = catchAsync(async (req, res) => {
  const falcilityId = req.params.id;
  const facility = await FacilityService.getFacilityById(falcilityId);

  res.status(200).json({
    status: "success",
    data: {
      facility,
    },
  });
});


exports.getAllFacilities = catchAsync(async (req, res) => {
  const allFacilities = await FacilityService.getAllFacilities();

  res.status(200).json({
    status: "success",
    data: {
      facilities: allFacilities,
    },
  });
});

exports.createFacility = catchAsync(async (req, res) => {
  const newFacility = await FacilityService.createFacility(req.body);
  res.status(201).json({
    status: "success",
    data: {
      facility: newFacility,
    },
  });
});


exports.updateFacility = catchAsync(async (req, res, next) => {

  const facility = await FacilityService.updateFacility(req.params.id, req.body);

  if(!facility){ return next(new AppError("No facility found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      facility
    }
  });

});

exports.deleteFacility = catchAsync(async (req, res) => {
const facility = await FacilityService.deleteFacility(req.params.id);
if(!facility){ return next(new AppError("No facility found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});

exports.requireBlood = catchAsync(async (req, res) => {
  const donors = await FacilityService.requireBloodByFacilities(req.params.id, req.body.blood_type);
  
  res.status(200).json({
    status: 'success',
    data: { 
      donors_contacted: donors.length
    }
  });
  
  });