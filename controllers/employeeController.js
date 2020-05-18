const catchAsync = require("./../utils/catchAsync");
const EmployeeService = require("./../services/employeeService")
const moment = require("moment");
moment.locale("it");

exports.getAllEmployees = catchAsync(async (req, res) => {
  const allEmployees = await EmployeeService.getAllEmployees();

  res.status(200).json({
    status: "success",
    data: {
      employees: allEmployees,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res) => {
  const newEmployee = await EmployeeService.createEmployee(req.body);
  res.status(201).json({
    status: "success",
    data: {
      employee: newEmployee,
    },
  });
});


exports.updateEmployee = catchAsync(async (req, res, next) => {

  const employee = await EmployeeService.updateEmployee(req.params.id, req.body);

  if(!employee){ return next(new AppError("No employee found with that ID",404))}

  res.status(200).json({
    status: "success",
    data: {
      employee
    }
  });

});

exports.deleteEmployee = catchAsync(async (req, res) => {
const employee = await EmployeeService.deleteEmployee(req.params.id);
if(!employee){ return next(new AppError("No employee found with that ID",404))}
   
res.status(204).json({
  status: 'success',
  data: null
});

});

exports.getEmployee = catchAsync(async (req, res) => {
  const employeeId = req.params.id;
  const employee = await EmployeeService.getEmployeeById(employeeId);

  res.status(200).json({
    status: "success",
    data: {
      employee,
    },
  });
});