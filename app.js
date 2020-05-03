const express = require("express");
const donationsRoute = require("./routes/donationRoute.js");
const reservationsRoute = require("./routes/reservationRoute.js");
const doctorsRoute = require("./routes/doctorRoute.js");
const donorsRoute = require("./routes/donorRoute.js");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/reservations", reservationsRoute);
app.use("/api/v1/donations", donationsRoute);
app.use("/api/v1/doctors", doctorsRoute);
app.use("/api/v1/donors", donorsRoute);

module.exports = app;
