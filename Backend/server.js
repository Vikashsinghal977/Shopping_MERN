const app = require("./app");

const dotenv = require("dotenv");

const connectDatabase = require("./databases/database");

// Handling Uncaught Exception
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Handling Uncaught Exception`);

    process.exit(1);
});

// config
dotenv.config({path:"Backend/config/config.env"});

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// unhandled promiss Rejction
process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to uhandled promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
})