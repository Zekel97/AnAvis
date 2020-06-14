const jwt = require('jsonwebtoken');

const avisWorkerService = require('./../services/avisWorkerService');
const donorService = require('./../services/donorService');
const facilityService = require('./../services/facilityService');
const AppError = require ("./../utils/appError");
/**
 * Controlla se sei autenticato e mi mette i dati utente in req.jwt_user
 * 
 */
exports.checkAuth = function (req,res,next){
    const token = req.headers['x-access-token'];
  if (!token)  next(new AppError("You need to provide a token", 401));
    
   jwt.verify(token, process.env.JWY_SECRET_KEY, async function(err, decoded) {
    
    if (err) {new AppError("Failed to authenticate token", 403);}
    else {  req.jwt_user = decoded; next();   }
});

}


/**
 * Prende facility_code da analyst, donor, employee e doctor e lo mette nel body.
 * 
 */


exports.checkFacilityCode =  async(req, res, next) => {

  
let user;
if (['doctor', 'analyst', 'employee'].includes(req.jwt_user.role[0])) {user = await avisWorkerService.getAvisWorkerByUserId(req.jwt_user.id); }
else if(['donor'].includes(req.jwt_user.role[0])) { user = await donorService.getDonorByUserId(req.jwt_user.id);}
else if(['facility'].includes(req.jwt_user.role[0])){user = await facilityService.getFacilitiesByUserId(req.jwt_user.id); user.facility_code = user._id;}

 if(!user.facility_code) {  next(new AppError("You are not authorized to see this data, call your facility", 401));}else{
 
  req.body.facility_code = user.facility_code;
  next();}

}