const catchAsync = require("./../utils/catchAsync");
const nationalAvisService = require("./../services/nationalAvisService");

exports.getStatistics = catchAsync(async (req, res) => {
   
    const stat =await  nationalAvisService.getStatistics();


    res.status(200).json({
      status: 'success',
      data: stat
    });
      
    });

    exports.updateNationalAvis = async (facilityId, facilityData) => {
        const newAvis = await Facility.findByIdAndUpdate(facilityId, facilityData, {
            new: true,
            runValidators: true
          });
        return newAvis;
    }
    