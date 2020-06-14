var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FacilitySchema = new Schema({
  name: {
    type: String,
    required: "E' necessario inserire un nome per la sede",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  user_id:{
    type:String,
    unique: true,
    required: "E' necessario associare una facilities ad un'utente."
  },
  role:{ 
    type: [{type: String,}],
    default: ['facility'],
    required: "E' necessario inserire un ruolo per questa sede."},
    
});

module.exports = mongoose.model("Facility", FacilitySchema);
