const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

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
        avatar: {
            publice_id: "this is a sample id",
            url: "ProfilepicUrl"
        }
    });

    sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const {
        email,
        password,
    } = req.body;

    // checking if your has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter email and passsowrd", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHander("Invelid email and password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHander("Invelid email and password", 401));
    }

    sendToken(user, 200, res);

})


// LogOut User
exports.logout = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })

})

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("User not found",404));
    }
    //Get ResetPassword token
    const resetToken = user.getRestPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you not requested this email than, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password Recovery`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} Successfully`
        })

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false });
        
        return next(new ErrorHander(error.message, 500))
    }
})

// Resat password
exports.resetPassword = catchAsyncError(async (req,res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    })

    if (!user) {
        return next(new ErrorHander("Reset password token is invelid or has been expired",400));
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match",400));
    }

    user.password = user.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res)

})

//Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHander("User Not Found", 404))
    }

    res.status(200).json({
        success:true,
        user,
    })
})



