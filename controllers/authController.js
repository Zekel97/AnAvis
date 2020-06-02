const catchAsync = require("./../utils/catchAsync");
const userService = require("./../services/userService");

const donorService = require("./../services/donorService");
const avisWorkerService = require("./../services/avisWorkerService");
const facilityService = require("./../services/facilityService");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = catchAsync(async (req, res, next) => {

    const user = await userService.findUserByMail(req.body.mail);
    if(!user) return res.status(404).json({auth:false, message:"User not found"});

    const passwordIsValid =  bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWY_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
        
        res.status(200).send({ auth: true, token: token });
});

exports.me = catchAsync(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWY_SECRET_KEY,async function(err, decoded) {
      //if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      let user;
      if(decoded.role[0]==="employee" || "doctor" || "analyst") {user = await avisWorkerService.getAvisWorkerByUserId(decoded.id);}
      if(decoded.role[0]==="donor") {user = await donorService.getDonorByUserId(decoded.id);}
      if(decoded.role[0]==="facility") {user = await facilityService.getFacilitiesByUserId(decoded.id);}
      
      if(!user) {return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });}
      else {
      res.status(200).json(user);}
    });
});
        