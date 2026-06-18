const mongoose = require("mongoose")
const Superman = require("../models/Superman")
const { getSupermanByNameOrId } = require("../services/supermanApi")
const { getCloudinaryImageUrl } = require("../config/cloudinary")

exports.addSuperman = async (req, res) => {
    try {
        const heroKey = req.body.heroId || req.body.name

        if (!heroKey) {
            return res.status(400).json({
                message: "send heroId or name to add superman",
            })
        }

        const superman = await getSupermanByNameOrId(heroKey)
        const cloudinaryImage = getCloudinaryImageUrl()

        await Superman.deleteOne({ heroId: superman.heroId })

        const savedSuperman = await Superman.create({
            ...superman,
            originalImage: superman.image,
            image: cloudinaryImage || superman.image,
            nickname: req.body.nickname,
        })

        res.status(201).json({
            message: "superman added from superhero api",
            superman: savedSuperman,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.getAllSupermans = async (req, res) => {
    try {
        const search = String(req.query.search || "").trim().toLowerCase()
        const query = search
            ? {
                  $or: [
                      { name: { $regex: search, $options: "i" } },
                      { fullName: { $regex: search, $options: "i" } },
                      { publisher: { $regex: search, $options: "i" } },
                  ],
              }
            : {}
        const supermans = await Superman.find(query).sort({ heroId: 1 })

        res.status(200).json({
            message: search ? "live superman search results" : "saved superman details",
            supermans,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.getSupermanById = async (req, res) => {
    try {
        const id = req.params.id
        const superman = mongoose.Types.ObjectId.isValid(id)
            ? await Superman.findById(id)
            : await Superman.findOne({
                  $or: [
                      { heroId: Number(id) || -1 },
                      { name: new RegExp(`^${id}$`, "i") },
                  ],
              })

        if (!superman) {
            return res.status(404).json({
                message: "superman not found",
            })
        }

        res.status(200).json({
            message: "superman details",
            superman,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.updateSuperman = async (req, res) => {
    try {
        const updateBody = {
            nickname: req.body.nickname,
        }
        const cloudinaryImage = getCloudinaryImageUrl()
        updateBody.image = cloudinaryImage || req.body.image

        const superman = await Superman.findById(req.params.id)

        if (!superman) {
            return res.status(404).json({
                message: "superman not found",
            })
        }

        Object.assign(superman, updateBody)
        await superman.save()

        res.status(200).json({
            message: "superman updated",
            superman,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.deleteSuperman = async (req, res) => {
    try {
        const superman = await Superman.findByIdAndDelete(req.params.id)

        if (!superman) {
            return res.status(404).json({
                message: "superman not found",
            })
        }

        res.status(200).json({
            message: "superman deleted",
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}
