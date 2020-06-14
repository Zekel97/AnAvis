const catchAsync = require("./../utils/catchAsync");
const userService = require("./../services/userService");
const AppError = require("./../utils/appError");
const donorService = require("./../services/donorService");
const avisWorkerService = require("./../services/avisWorkerService");
const facilityService = require("./../services/facilityService");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = catchAsync(async (req, res, next) => {
    const user = await userService.findUserByMail(req.body.mail);
    if(!user)   next(new AppError("User not found", 404));

    const passwordIsValid =  bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)   next(new AppError("Password not valid", 401));

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWY_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
        
    return res.status(200).json({ auth: true, token: token });
});

exports.me = catchAsync(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) { next(new AppError(`You need to provide a token`, 401));}

    
    jwt.verify(token, process.env.JWY_SECRET_KEY,async function(err, decoded) {
      if (err)   next(new AppError("Failed to authenticate token", 401));;
      
      if(decoded.role[0]==="employee" || decoded.role[0]==="doctor" || decoded.role[0]=== "analyst") {res.status(200).json(await avisWorkerService.getAvisWorkerByUserId(decoded.id))}
      else if(decoded.role[0]==="donor"){  res.status(200).json(await donorService.getDonorByUserId(decoded.id))}
      else if(decoded.role[0]==="facility"||  decoded.role[0]==="avis") {res.status(200).json(await facilityService.getFacilitiesByUserId(decoded.id))}
      else if(decoded.role[0]==="admin") {res.status(200).json(await userService.getUser(decoded.id));}
      else{  next(new AppError("No User found", 404)); }
    });
});
        