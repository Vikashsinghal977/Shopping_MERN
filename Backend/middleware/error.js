const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Sever Error";


    // Wrong MongoDB id error
    if (err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400);
    }

    // MongoDB duplicate error
    if (err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)

    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400)

    }

    // JWT Expire Error
    if (err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expire, try again`;
        err = new ErrorHandler(message, 400)

    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })

}