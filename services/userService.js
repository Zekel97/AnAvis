var bcrypt = require('bcryptjs');

const catchAsync = require("./../utils/catchAsync");

const User = require('./../models/userModel');

exports.findUserByMail = async (mail) => {
    const user = await User.find({mail})
    return user[0];
}

exports.getAllUser =async () => {
    return await User.find();
}

exports.createUser = async (mail, password, role) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    //mettere password random e criptarla, poi loggare la plain pass
    const user = await User.create({mail,password:hashedPassword,role});
    user.plain_password=password;
    return user;
};

exports.deleteUser = async(userId) => {
    const user =await User.findByIdAndDelete(userId);
    return user;
}

exports.getUser = async(userId) => {
    const user =await User.findById(userId);
    return user;
}


exports.updateUser = async(userId, userData) => {
    const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
        runValidators: true
      });
    return user;
}