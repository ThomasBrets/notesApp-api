const mongoose = require("mongoose");

// .env
const dotenv = require("dotenv")
dotenv.config()



// db
const connectionString = process.env.MONGODB_URI;
// console.log("CONECTION", connectionString);



mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect mongoDB", err);
  });

module.exports = mongoose;