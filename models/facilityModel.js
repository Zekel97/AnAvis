var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FacilitySchema = new Schema({
  name: {
    type: String,
    required: "Codice Utente",
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Facility", FacilitySchema);
