const bcrypt = require("bcryptjs");

const catchAsync = require("./../utils/catchAsync");
const UserService = require("./../services/userService");


exports.getAllUser = catchAsync(async (req, res) => {
    
    const users = await UserService.getAllUser();
  
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  });

  exports.updateUser = catchAsync(async (req, res, next) => {

    const user = await UserService.updateUser(req.params.id, req.body);
  
    if(!user){ return next(new AppError("No user found with that ID",404))}
  
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  
  });

  exports.resetPassword = catchAsync(async (req, res, next) => {
    //generate a random password, for now the new password will be new_password

    const newPassword = bcrypt.hashSync("new_password",8);
    const user = await UserService.updateUser(req.params.id, {"password": newPassword});
    
    if(!user){ return next(new AppError("No user found with that ID",404))}
    //send mail to user.mail
    
    res.status(200).json({
      status: "success",
      data: {
        user
      }
    });
  
  });
