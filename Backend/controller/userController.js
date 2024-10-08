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

//Get user details based on id
exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHander("User Not Found", 404))
    }

    res.status(200).json({
        success:true,
        user,
    })
})

//Get user details (Admin)
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if (!user){
        return next(new ErrorHander("User Not Found", 404))
    }

    res.status(200).json({
        success:true,
        user,
    })
})

// Update User Password;
exports.updatePassowrd = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHander("old password is Incurrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander(" password is does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save()
     

    sendToken(user,200, res)
})

// Update User Profile;
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email, 
    }

    // we will add cloudinary later 
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true,
        user,
    }) 
})


// Get All users 
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success:true,
        users,
    })
})


// Update user > (Admin);
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name:req.body.name,
        email:req.body.email, 
        role:req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    
    res.status(200).json({
        success:true,
        user,
    }) 
})


// Delete User > (Admin);
exports.DeleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    // we will Remove cloudinary later 

    if (!user){
        return next(new ErrorHander("User not fund", 404))
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        massage:"User deleted succefully"
    })

})