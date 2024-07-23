const mongoose = require("mongoose");

const connecctDatabase = ( ) => {

    mongoose.connect("mongo://localhost:27017/Ecommerce").then((data)=>{
        console.log(`mongoDB connected with server ${data}`)
    }).catch((err)=>{
        console.log("Not connect");
    })

}

module.exports = connecctDatabase;