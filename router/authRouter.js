const { register, login, getProfile } = require('../controller/authController')
const express = require("express")
const passport = require("passport");
const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/me", passport.authenticate("jwt", { session: false }), getProfile)

module.exports = router
