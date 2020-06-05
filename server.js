const mongoose = require("mongoose");
const cron = require("node-cron");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const montly_process = require("./process/everyMonth.js");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

cron.schedule("0 0 1 * *", montly_process.remindDonation);





app.listen(port, () => {
  console.log(`App running on port ${port}...`);

});

