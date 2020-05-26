const express = require("express");

const authRoute = require("./routes/authRoute.js");
const donationsRoute = require("./routes/donationRoute.js");
const reservationsRoute = require("./routes/reservationRoute.js");
const doctorsRoute = require("./routes/doctorRoute.js");
const donorsRoute = require("./routes/donorRoute.js");
const analystsRoute = require("./routes/analystRoute.js");
const employeesRoute = require("./routes/employeeRoute.js");
const facilitiesRoute = require("./routes/facilityRoute.js");
const usersRoute = require("./routes/userRoute.js");

const cors = require("cors");


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/reservations", reservationsRoute);
app.use("/api/v1/donations", donationsRoute);
app.use("/api/v1/doctors", doctorsRoute);
app.use("/api/v1/donors", donorsRoute);
app.use("/api/v1/analysts", analystsRoute);
app.use("/api/v1/facilities", facilitiesRoute);
app.use("/api/v1/employees", employeesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);


//Don't find route, return 404
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

//ERROR HANDLING
app.use(globalErrorHandler);


module.exports = app;
