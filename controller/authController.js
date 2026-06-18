const User = require('../models/Auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
try{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "name, email and password are required",
        });
    }

    const extistinguser = await User.findOne({
        email
    })
    if(extistinguser){
       return res.status(400).json({
        message:"user already registered"
       })
    }
const hashpswrd = await  bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashpswrd
    })

    res.status(201).json({
    message: "register done......",
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
    }
 })

}catch(err){
    res.status(500).json({
        message: err.message,
    })
}
}

exports.login = async (req,res)=>{
try{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    const user = await User.findOne({
        email
    })

    if(!user){
return res.status(400).json({
        message:"user not found "
       })
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    )

    if(!isMatch){
  return res.status(400).json({
    message:"invalid pswrd"
  })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET || "mykeypswrd",
        {
            expiresIn: "7d"
        }
    )

    res.json({
         message: "login done...",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })

}catch(err){
    res.status(500).json({
        message: err.message,
    })
}
}

exports.getProfile = async (req, res) => {
    res.status(200).json({
        message: "profile details",
        user: req.user,
    });
}
