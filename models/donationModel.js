var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DonationSchema = new Schema({
  donor_id: {
    type: String,
    required: "E' necessario inserire uno user code",
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },  
  facility_code: {
    type: String,
    required: "E' necessario inserire il Codice della Sede alla quale il donatore appartiene",
  },

  donation_date: {
    type: String,
    required: "E' necessario inserire la Data della donazione",
  },

  status: {
    type: String,
    default: "Processing",
    enum: {
      values: ["Processing", "Concluded"],
      message: `Lo status può essere solo Processing e Concluded`,
    },
  },
  report_path: {
    type: String
  }
//aggiungere analista associato 
//aggiungere medico associato   (da vedere quanto tempo sprecherebbe)

});

module.exports = mongoose.model("Donation", DonationSchema);
