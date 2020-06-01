const express = require("express");

const donorController = require("./../controllers/donorController");
const authMiddleware = require("./../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
    .get(authMiddleware.checkAuth, authMiddleware.checkFacilityCode,donorController.getAllDonors)
    .post(authMiddleware.checkAuth, authMiddleware.allowOnlyRole("employee"),donorController.createDonor);
  
router
    .route("/:id")
    .get(authMiddleware.checkAuth,donorController.getDonor)
    .patch(authMiddleware.checkAuth,donorController.updateDonor)
    .delete(authMiddleware.checkAuth,donorController.deleteDonor);

module.exports = router;