const jwt = require('jsonwebtoken');

const avisWorkerService = require('./../services/avisWorkerService');
const donorService = require('./../services/donorService');
const facilityService = require('./../services/facilityService');

/**
 * Controlla se sei autenticato e mi mette i dati utente in req.jwt_user
 * 
 */
exports.checkAuth = function (req,res,next){
  const token = req.headers['x-access-token'];
  if (!token)  res.status(401).send({ auth: false, message: 'No token provided.' });
    
   jwt.verify(token, process.env.JWY_SECRET_KEY, async function(err, decoded) {
  
    if (err) {res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
    else {  req.jwt_user = decoded; next();   }
});




}


/**
 * Continua solo se il ruolo combacia
 * 
 * Sostituire req.jwt_user.role.includes(role); con role.includes(req.jwt_user.role) e tutti i role passarli come esempio ['doctor'] 
 */
exports.allowOnlyRole = function (role) { 
    
    return (req, res, next) => {
        const userCanView = req.jwt_user.role.includes(role);
        if(!userCanView) res.status(401).send({message:"You are not allowed to see this data"})
        else {next();}
    }
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

 if(!user.facility_code) {res.status(401).send({ auth: false, message: 'You are not authorized'})}else{
 
  req.body.facility_code = user.facility_code;
  next();}

}