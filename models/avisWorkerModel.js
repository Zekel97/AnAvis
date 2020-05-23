var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AvisWorkerSchema = new Schema({
  name: {
    type: String,
    required: "Codice Utente",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  start_hour: {
    type: String,
    required: "Orario di Inizio di lavoro",
  },
  end_hour: {
    type: String,
    required: "Orario di Fine Lavoro",
  },
  working_days: [
    {
      type: String,
      enum: {
        values: [
          "lunedì",
          "martedì",
          "mercoledì",
          "giovedì",
          "venerdì",
          "sabato",
          "domenica",
        ],
        message: `I giorni di lavoro possono essere solamente: 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'`,
      },
    },
  ],
  role: [
    {
      type: String,
      required:"Ruolo obbligatorio, in: 'doctor','analyst','employee'",
      enum: {
        values: [
          "doctor",
          "analyst",
          "employee"
        ],
        message: `Il ruolo dell'utente può essere soltanto 'doctor','analyst','employee','facility','donor','admin','avis'.`,
      },
    },
  ],
});

module.exports = mongoose.model("AvisWorker", AvisWorkerSchema);
