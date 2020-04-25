const donationService = require("./../services/donationService");
const donorService = require("./../services/donorService");
const moment = require("moment");
moment.locale("it");

exports.userCanDonate = async (req, res, next) => {
    const user = await donorService.getDonorById(req.headers.user_code);
    console.log(req);
    const last_donation = user.last_donation_date;
    if (moment(last_donation).add(3, "M").isAfter(moment())){
        console.log("Ultima donazione: ",moment(last_donation).add(3, "M"));
        res.status(401).json({
            status: "error",
            message: "Non sei ancora autorizzato a donare."
    })
    }else{
        next();
   }
}