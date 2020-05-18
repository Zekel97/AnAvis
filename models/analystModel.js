var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnalystSchema = new Schema({
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
});

module.exports = mongoose.model("Analyst", AnalystSchema);
