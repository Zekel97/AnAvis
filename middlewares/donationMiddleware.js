const donorService = require("./../services/donorService");
const moment = require("moment");
moment.locale("it");

exports.userCanDonate = async (req, res, next) => {
    const user = await donorService.getDonorById(req.headers.user_code);
    
    if(!donorService.donorCanDonate(user)) {
        res.status(401).json({
            status: "error",
            message: "Non sei ancora autorizzato a donare."
    });
    } else {
        next();
    }
    
}