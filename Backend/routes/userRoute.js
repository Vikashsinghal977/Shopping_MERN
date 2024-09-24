const express = require("express");
const { 
    registerUser, 
    loginUser,
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserDetails,
    updatePassowrd,
    updateProfile} = require("../controller/userController");
const { authorizRoles, isAuthenticateUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser); 

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout)

// router.route("/userDetails/:id").get(getUserDetails);

router.route("/me").get(isAuthenticateUser,getUserDetails);

router.route("/password/update").put(isAuthenticateUser, updatePassowrd)
 
router.route("/me/update").put(isAuthenticateUser, updateProfile)

module.exports = router;