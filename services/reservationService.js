const Reservation = require("./../models/reservationModel");
const moment = require('moment');

exports.deleteReservation = async (reservationId) => {
  const reservation = await Reservation.findByIdAndDelete(reservationId);
  return reservation;
};

exports.findReservationById = async(reservationId) => {
  const reservation = await Reservation.findById(reservationId);
  return reservation;
}

exports.getReservationsByDonor = async(donorId)=> {
  const reservations = await Reservation.find({"donor_id":donorId});
  return reservations;
}

exports.findAllReservations = async()=>{
  const reservations = await Reservation.find();
  return reservations;
}

exports.findReservationsByDate = async(date) => {
  const reservations = await Reservation.find({date:date});
  return reservations;
}

exports.findReservationsInFacility = async( facility_code) => {
  const reservations = await Reservation.find({"facility_code":facility_code});
  return reservations;
}

exports.findReservationsByDateInFacility = async(date, facility_code) => {
  const reservations = await Reservation.find({"date":date, "facility_code":facility_code});
  return reservations;
}


exports.createReservation = async (reservationData) => {
 return await Reservation.create(reservationData);
}

exports.createManualReservation = async (reservationData) => {
reservationData.slot = "unreserved user";
reservationData.date = moment().format("L");
return await Reservation.create(reservationData);
};

exports.checkAvaiableSlot = (selectedDay, doctors, prenotations) => {
  const day = moment(selectedDay).format("YYYY-MM-DD");
  var dayMap = new Map();

  dayMap.set("date", moment(selectedDay).format("L"));
  dayMap.set("medici_non_disponibili", new Array());
  dayMap.set("giorno", moment(selectedDay).format("dddd"));

  doctors.forEach((doctor) => {
    if (doctor.working_days.includes(moment(selectedDay).format("dddd"))) {
      dayMap = calcolaSlotOrariInUnGiorno(
        dayMap,
        day,
        doctor.start_hour,
        doctor.end_hour
      );
    } else {
      let mediciNonDisponibili = dayMap.get("medici_non_disponibili");
      mediciNonDisponibili.push(doctor.name);
      dayMap.set("medici_non_disponibili", mediciNonDisponibili);
    }
  });
  dayMap = removePrenotations(
    dayMap,
   prenotations,
    moment(selectedDay).format("L")
  );

  let obj = Array.from(new Map([...dayMap.entries()].sort())).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {}
  );
  return obj;
};

function calcolaSlotOrariInUnGiorno(result, giorno, start_hour, end_hour) {
  var start = moment(`${giorno} ${start_hour}`, `YYYY-MM-DD hh:mm`);
  var end = moment(`${giorno} ${end_hour}`, `YYYY-MM-DD hh:mm`);

  var current = moment(start);
  while (current < end) {
    const slot = `${current.format("HH:mm")} - ${current
      .add(15, "minutes")
      .format("HH:mm")}`;
    const value = result.get(slot) === undefined ? 1 : result.get(slot) + 1;
    result.set(slot, value);
  }
  return result;
}

function removePrenotations(dayMap, prenotations, date) {

 prenotations.forEach((prenotation) => {
    if (prenotation.date === date && prenotation.slot !== "unreserved user") {
      var prenotationNumber = dayMap.get(prenotation.slot) - 1;
      if (prenotationNumber === 0) {
        dayMap.delete(prenotation.slot);
      } else {
        dayMap.set(prenotation.slot, prenotationNumber);
      }
    }
  });
  return dayMap;
}
