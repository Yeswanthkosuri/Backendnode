const express = require("express")
const passport = require("passport")
const {
    addSuperman,
    getAllSupermans,
    getSupermanById,
    updateSuperman,
    deleteSuperman,
} = require("../controller/supermanController")

const router = express.Router()

const requireAuth = passport.authenticate("jwt", { session: false })

router.post("/add/superman", requireAuth, addSuperman)
router.get("/get/supermans", getAllSupermans)
router.get("/get/supermans/:id", getSupermanById)
router.put("/update/supermans/:id", requireAuth, updateSuperman)
router.delete("/del/supermans/:id", requireAuth, deleteSuperman)

module.exports = router
