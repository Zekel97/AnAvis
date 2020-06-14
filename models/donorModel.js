var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DonorSchema = new Schema({
  name: {
    type: String,
    required: "E' necessario inserire un nome per questo donatore",
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
    enum: ["0+","0-","A+","A-","B+","B-","AB+","AB-"],
    required: "E' necessario inserire un gruppo sanguigno per il donatore",
  },
  facility_code: {
    type: String,
    required: "E' necessario inserire il codice della Sede alla quale il donatore appartiene",
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
