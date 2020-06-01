var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
  accepted_by: {
    type: String,
    required: "Inserire id del dottore che ha accettato la prenotazione",
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
    required: "Data della Prenotazione",
  },
  slot: {
    type: String,
    required: "Slot orario della Prenotazione",
  },
  facility_code: {
    type: String,
    required: "Codice della Sede alla quale il donatore appartiene",
  },
  module_path: {
    type: String,
    required: "E' necessario caricare un modulo per poter proseguire con la prenotazione."
  }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
