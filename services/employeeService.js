const catchAsync = require("./../utils/catchAsync");
const Employee = require("./../models/employeeModel");
exports.getEmployeeById = async (id) => {
    const employee = await Employee.findById(id);
    return employee;
  };

exports.getAllEmployees = async () => {
    const employee = await Employee.find();
    return employee;
}

exports.createEmployee = async (employeeData) => {
    const newEmployee = await Employee.create(employeeData);
    return newEmployee;
}

exports.updateEmployee = async (employeeId, employeeData) => {
    const newEmployee = await Employee.findByIdAndUpdate(employeeId, employeeData, {
        new: true,
        runValidators: true
      });
    return newEmployee;
}

exports.deleteEmployee = async (employeeId) => {
    const employee = await Employee.findByIdAndDelete(employeeId);
    return employee;
}