const express = require("express");

const employeeController = require("./../controllers/employeeController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode,employeeController.getAllEmployees)
  .post(authMiddleware.checkAuth, authMiddleware.checkFacilityCode,employeeController.createEmployee);

router
  .route("/:id")
  .get(authMiddleware.checkAuth,employeeController.getEmployee)
  .patch(authMiddleware.checkAuth,employeeController.updateEmployee)
  .delete(authMiddleware.checkAuth,employeeController.deleteEmployee);



module.exports = router;