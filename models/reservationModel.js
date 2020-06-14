var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
  accepted_by: {
    type: String,
  },
  donor_id:{
    type: String,
    required: "Inserire l'id del donatore associato",
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  date: {
    type: String,
    required: "E' necessario inserire una data per questa prenotazione",
  },
  slot: {
    type: String,
    required: "E' necessario inserire uno slot per questa prenotazione",
  },
  facility_code: {
    type: String,
    required: "E' necessario inserire il Codice della Sede alla quale la reservation appartiene",
  },
  module_path: {
    type: String,
    required: "E' necessario caricare un modulo per poter proseguire con la prenotazione."
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
