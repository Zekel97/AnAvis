var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DonationSchema = new Schema({
  user_code: {
    type: String,
    required: "User Code",
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },

  donation_date: {
    type: String,
    required: "Data della donazione",
  },

  status: {
    type: String,
    default: "Processing",
    enum: {
      values: ["Processing", "Concluded"],
      message: `Lo status può essere solo Processing e Concluded`,
    },
  },
});

module.exports = mongoose.model("Donation", DonationSchema);
