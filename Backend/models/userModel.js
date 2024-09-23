const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const crypto = require("crypto")
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:[true, "Please Enter Your Name"],
        maxLength:[30,"Can not exceed 30 characters"],
        minLength:[4,"More Than 4 Characture"]
    },
    email:{
        type:String,
        require:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"],
    },
    password:{
        type:String,
        require:[true, "Please Enter Your Passsword"],
        minLength:[8," 8 Min Length"],
        select:false
    },
    avatar:{
        publice_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    }
    
});

// Bcrypt
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        next();
    }
    this.password =await bcrypt.hash(this.password,10);    
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//compare password
userSchema.methods.comparePassword = async function(enterpassword){
    
    return await bcrypt.compare(enterpassword,this.password)
}


//Generating Password Reset token
userSchema.methods.getRestPasswordToken = function (){

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hashing and add to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 *60*1000;

    return resetToken;
}



module.exports = mongoose.model("User",userSchema)