const { detectExtension } = require("nodemailer/lib/mime-funcs/mime-types");
const catchAsyncError =require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");

exports.isAuthenticateUser = catchAsyncError(async (req, res, next) => {

    const {token} = req.cookies;

    if (!token){
        return next(new ErrorHander("Please Login to access this resourse",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();

})