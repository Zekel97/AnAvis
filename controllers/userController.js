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

