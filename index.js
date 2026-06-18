require("dotenv").config();

const express = require('express');
const passport = require("passport");
const app = express()
const connectdb = require('./config/db')
const configurePassport = require("./config/passport");
const { initializeCloudinary } = require("./config/cloudinary")
const supermanRoute = require("./router/supermanRoute")
const authroute = require('./router/authRouter');
//middleware
app.use(express.json())

configurePassport();
app.use(passport.initialize());

app.use("/api/v1",supermanRoute)
app.use("/auth",authroute)


app.get("/",(req,res)=>{
   res.send("server is working ")
})

app.use((err, req, res, next) => {
    const message = err.message || err.error?.message || "something went wrong"
    res.status(err.http_code || 500).json({ message })
})

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    await initializeCloudinary()
    await connectdb()

    app.listen(PORT,()=>{
        console.log(`server started on port ${PORT}`)
    })
}

startServer()
