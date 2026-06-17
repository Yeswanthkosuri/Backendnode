const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
       const mongoUri = process.env.MONGODB_URI;

       if (!mongoUri) {
        throw new Error("MONGODB_URI is not set");
       }

       await mongoose.connect(mongoUri)

         console.log("db connected")

    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb;
