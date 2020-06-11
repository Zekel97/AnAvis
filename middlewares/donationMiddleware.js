const donorService = require("./../services/donorService");

exports.userCanDonate = async (req, res, next) => {
    const user = await donorService.getDonorById(req.body.donor_id);
    
    if(!donorService.donorCanDonate(user)) {
        res.status(401).json({
            status: "error",
            message: "Non sei ancora autorizzato a donare, devono passare 3 mesi dalla tua ultima donazione."
    });
    } else {
        next();
    }
    
}