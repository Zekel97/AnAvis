const catchAsync = require("./../utils/catchAsync");
const AnalystService = require("./../services/analystService")

exports.getAllAnalysts = catchAsync(async (req, res) => {
  const allAnalysts = await AnalystService.getAllAnalysts();

  res.status(200).json({
    status: "success",
    data: {
      analysts: allAnalysts,
    },
  });
});

exports.getAnalyst = catchAsync(async (req, res) => {
  const analystId = req.params.id;
  const analyst = await AnalystService.getAnalystById(analystId);

  res.status(200).json({
    status: "success",
    data: {
      analyst,
    },
  });
});


exports.createAnalyst = catchAsync(async (req, res) => {
  const newAnalyst = await AnalystService.createAnalyst(req.body);
  res.status(201).json({
    status: "success",
    data: {
      analyst: newAnalyst,
    },
  });
});


exports.updateAnalyst = catchAsync(async (req, res, next) => {

  const analyst = await AnalystService.updateAnalyst(req.params.id, req.body);

  if(!analyst){ return next(new AppError("No analyst found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      analyst
    }
  });

});

exports.deleteAnalyst = catchAsync(async (req, res) => {
const analyst = await AnalystService.deleteAnalyst(req.params.id);
if(!analyst){ return next(new AppError("No analyst found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});
