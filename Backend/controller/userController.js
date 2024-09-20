const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

// Register a user

exports.registerUser = catchAsyncError( async(req, res, next) => {
    
    const {
        name,
        email,
        password,
    } = req.body;


    // console.log("The RegisterUser body is:", req.body)
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            publice_id:"this is a sample id",
            url:"ProfilepicUrl"
        }
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success:true,
        token,
    })
});


exports.loginUser = catchAsyncError(async (req, res, next)=>{

    const {
        email,
        password,
    }= req.body;

    // checking if your has given password and email both

    if (!email  || !password){
        return next(new ErrorHander("Please Enter email and passsowrd",400));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorHander("Invelid email and password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched){
        return next(new ErrorHander("Invelid email and password",401));
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token,
    })
})
