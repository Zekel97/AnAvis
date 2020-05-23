var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  mail: {
    type: String,
    unique:true,
    required: "E' necessario inserire una mail per creare un nuovo utente.",
  },
  password: {
    type: String,
    required: "E' necessario inserire una password per creare un nuovo utente",
  },
  role: [
    {
      type: String,
      enum: {
        values: [
          "doctor",
          "analyst",
          "employee",
          "facility",
          "donor",
          "admin",
          "avis",
        ],
        message: `Il ruolo dell'utente può essere soltanto 'doctor','analyst','employee','facility','donor','admin','avis'.`,
      },
    },
  ],
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
