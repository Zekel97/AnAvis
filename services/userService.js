const User = require('./../models/userModel');

exports.findUserByMail = (mail) => {
    return await User.find({mail});
}