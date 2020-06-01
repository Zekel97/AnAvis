/**
 * Aggiustare descrizione di role, qui solo quelli relativi all'avis worker, su user quelli relativi allo user invece.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AvisWorkerSchema = new Schema({
  name: {
    type: String,
    required: "Inserire un nome per il lavoratore avis",
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
  facility_code: {
    type: String,
    required: "Codice della Sede alla quale il donatore appartiene",
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
  user_id:{
    type:String,
    unique: true,
    required: "E' necessario associare un lavoratore avis ad un'utente."
  },
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
