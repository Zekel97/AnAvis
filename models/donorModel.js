var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: {
    type: String,
    required: "Nome Utente",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  last_donation_date: {
    type: String,
    required: "Data della Prossima Donazione disponibile",
  },
  blood_group: {
    type: String,
    required: "Gruppo Sanguigneo Donatore",
  },
  facility_code: {
    type: String,
    required: "Codice della Sede alla quale il donatore appartiene",
  },
});

module.exports = mongoose.model("Donor", DonorSchema);
