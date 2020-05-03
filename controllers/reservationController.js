const Doctors = require("./../models/doctorModel");
const Reservations = require("./../models/reservationModel");
const catchAsync = require("./../utils/catchAsync");
const ReservationService = require("./../services/reservationService");

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
  const allReservations = await Reservations.find({ date });
  res.status(200).json({
    status: "success",
    data: {
      reservations: allReservations,
    },
  });
});

exports.getReservation = catchAsync(async (req, res) => {
  const reservationId = req.params.id;
  const reservation = await Reservations.findById(reservationId);

  res.status(200).json({
    status: "success",
    data: {
      reservation,
    },
  });
});

exports.deleteReservation = catchAsync(async (req, res) => {
  const reservationId = req.params.id;
  await Reservations.findByIdAndDelete(reservationId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getDailySlots = catchAsync(async (req, res) => {
  const date = req.query.date;
  
  const doctors = await Doctors.find();
  const reservations = await Reservations.find({ date: date });
  const dailySlots = ReservationService.calcolaSlotDisponibili(
    date,
    doctors,
    reservations
  );

  res.status(200).json({
    status: "success",
    data: dailySlots,
  });
});
