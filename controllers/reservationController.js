const catchAsync = require("./../utils/catchAsync");
const ReservationService = require("./../services/reservationService");
const AvisWorkerService = require("./../services/avisWorkerService");

const moment = require("moment");
moment.locale("it");

exports.createReservation = catchAsync(async (req, res) => {
req.body.module_path = req.file.path;
const newReservation =( req.body.slot )? await ReservationService.createReservation(req.body) :await ReservationService.createManualReservation(req.body);

  res.status(201).json({
    status: "success",
    data: {
      reservation: newReservation,
    },
  });
});




exports.getDailyReservations = catchAsync(async (req, res) => {
  const date = req.body.searched_date
    ? req.body.searched_date
    : moment().format("L");

  const allReservations = await ReservationService.findReservationsByDateInFacility(date, req.body.facility_code);

  res.status(200).json({
    status: "success",
    data: {
      reservations: allReservations,
    },
  });
});

exports.getReservation = catchAsync(async (req, res) => {
  const reservationId = req.params.id;
  const reservation = await ReservationService.findReservationById(reservationId);

  res.status(200).json({
    status: "success",
    data: {
      reservation,
    },
  });
});

exports.deleteReservation = catchAsync(async (req, res) => {
  const reservationId = req.params.id;
  await ReservationService.deleteReservation(reservationId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getDailySlots = catchAsync(async (req, res) => {
  const date = (req.query.date!=null)?req.query.date:moment().format("YYYY-MM-DD");
  const doctors = await AvisWorkerService.getAllWorkerByRole('doctor');
  const reservations = await ReservationService.findReservationsByDateInFacility(moment(date, "YYYY-MM-DD").format("L"), req.body.facility_code);
  const dailySlots = ReservationService.checkAvaiableSlot(
    date,
    doctors,
    reservations
  );

  res.status(200).json({
    status: "success",
    data: dailySlots,
  });
});
