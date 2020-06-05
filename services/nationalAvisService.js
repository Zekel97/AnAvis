const avisWorkerService = require("./avisWorkerService");
const donorService = require("./donorService");
const facilityService = require("./facilityService");
const reservationService = require("./reservationService");
const donationService = require("./donationService");
const Facility = require("./../models/facilityModel");


exports.getStatistics = async () => {
    const facility = await facilityService.getAllFacilities();
    const donors = await donorService.getAllDonors();
    const avisWorkers = await avisWorkerService.getAllAvisWorker();
    const reservations = await reservationService.findAllReservations();
    const openDonations = await donationService.getOpenDonations();
    const closedDonations = await donationService.getClosedDonations();

    return {
        "facility":facility.length,
        "donors":donors.length,
        "workers":avisWorkers.length,
        "active_reservation":reservations.length,
        "open_donations": openDonations.length,
        "closed_donations": closedDonations.length
    };
  };
