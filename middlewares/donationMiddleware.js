const donationService = require("./../services/donationService");
const donorService = require("./../services/donorService");
const moment = require("moment");
moment.locale("it");

exports.userCanDonate = async (req, res, next) => {
    const user = await donorService.getDonorById(req.headers.user_code);
    const last_donation = user.last_donation_date;
    if (moment(last_donation).add(3, "M").isAfter(moment())){
        res.status(401).json({
            status: "error",
            message: "Non sei ancora autorizzato a donare."
    })
    }else{
        next();
   }
}