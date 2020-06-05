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
    type: String
  },
  blood_group: {
    type: String,
    required: "Gruppo Sanguigneo Donatore",
  },
  facility_code: {
    type: String,
    required: "Codice della Sede alla quale il donatore appartiene",
  },
  user_id:{
    type:String,
    ref: "User",
    required: "E' necessario associare un lavoratore avis ad un'utente."
  },
  role:{ 
    type: [{type: String,}],
    default: ['donor'],
    required: "E' necessario inserire un ruolo per questo donor."},
    
});

module.exports = mongoose.model("Donor", DonorSchema);
