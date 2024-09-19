const mongoose = require("mongoose");
const validator = require("validator");

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
        validator:[validator.isEmail,"Please Enter a valid Email"],
    },
    password:{
        type:String,
        require:[true, "Please Enter Your Passsword"],
        minLength:[8,"Min Length"],
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
    resetPassword:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    }
    
})

module.exports = mongoose.model("User",userSchema)