require("dotenv").config();

const express = require('express');
const app = express()
const connectdb = require('./config/db')
const pokemonRoute = require("./router/pokemonRoute")
const authroute = require('./router/authRouter');
//middleware
app.use(express.json())


connectdb()

app.use("/api/v1",pokemonRoute)
app.use("/auth",authroute)


app.get("/",(req,res)=>{
   res.send("server is working ")
})

app.listen(3002,()=>{
    console.log("server .started")
})
