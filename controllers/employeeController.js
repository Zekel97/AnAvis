const catchAsync = require("./../utils/catchAsync");
const AvisWorkerService = require("./../services/avisWorkerService");
const AppError = require('./../utils/appError');

const employee_role = 'employee';


exports.getAllEmployees = catchAsync(async (req, res) => {
  const allEmployees = await AvisWorkerService.getAllWorkerByRole(employee_role);

  res.status(200).json({
    status: "success",
    data: {
      employees: allEmployees,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res) => {
  const newEmployee = await AvisWorkerService.createAvisWorker(req.body, employee_role);
  res.status(201).json({
    status: "success",
    data: {
      employee: newEmployee,
    },
  });
});


exports.updateEmployee = catchAsync(async (req, res, next) => {

  const employee = await AvisWorkerService.updateAvisWorker(req.params.id, req.body);

  if(!employee){ return next(new AppError("No employee found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      employee
    }
  });

});

exports.deleteEmployee = catchAsync(async (req, res) => {
const employee = await AvisWorkerService.deleteAvisWorker(req.params.id);
if(!employee){ return next(new AppError("No employee found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});

exports.getEmployee = catchAsync(async (req, res) => {
  const employeeId = req.params.id;
  const employee = await AvisWorkerService.getAvisWorkerById(employeeId);

  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});