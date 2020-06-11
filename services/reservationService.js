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

exports.calcolaSlotDisponibili = (giornoScelto, medici, prenotazioni) => {
  const giorno = moment(giornoScelto).format("YYYY-MM-DD");
  var mappaDiUnGiorno = new Map();

  mappaDiUnGiorno.set("date", moment(giornoScelto).format("L"));
  mappaDiUnGiorno.set("medici_non_disponibili", new Array());
  mappaDiUnGiorno.set("giorno", moment(giornoScelto).format("dddd"));

  medici.forEach((medico) => {
    if (medico.working_days.includes(moment(giornoScelto).format("dddd"))) {
      mappaDiUnGiorno = calcolaSlotOrariInUnGiorno(
        mappaDiUnGiorno,
        giorno,
        medico.start_hour,
        medico.end_hour
      );
    } else {
      let mediciNonDisponibili = mappaDiUnGiorno.get("medici_non_disponibili");
      mediciNonDisponibili.push(medico.name);
      mappaDiUnGiorno.set("medici_non_disponibili", mediciNonDisponibili);
    }
  });
  mappaDiUnGiorno = rimuoviPrenotazioni(
    mappaDiUnGiorno,
    prenotazioni,
    moment(giornoScelto).format("L")
  );

  let obj = Array.from(new Map([...mappaDiUnGiorno.entries()].sort())).reduce(
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

function rimuoviPrenotazioni(mappaDiUnGiorno, prenotazioni, date) {

  prenotazioni.forEach((prenotazione) => {
    if (prenotazione.date === date && prenotazione.slot !== "unreserved user") {
      var numeroPrenotazioni = mappaDiUnGiorno.get(prenotazione.slot) - 1;
      if (numeroPrenotazioni === 0) {
        mappaDiUnGiorno.delete(prenotazione.slot);
      } else {
        mappaDiUnGiorno.set(prenotazione.slot, numeroPrenotazioni);
      }
    }
  });
  return mappaDiUnGiorno;
}
