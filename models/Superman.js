const mongoose = require("mongoose")

const supermanSchema = new mongoose.Schema(
    {
        heroId: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
        },
        publisher: {
            type: String,
            trim: true,
        },
        alignment: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            trim: true,
        },
        race: {
            type: String,
            trim: true,
        },
        height: {
            type: [String],
            default: [],
        },
        weight: {
            type: [String],
            default: [],
        },
        occupation: {
            type: String,
            trim: true,
        },
        base: {
            type: String,
            trim: true,
        },
        groupAffiliation: {
            type: String,
            trim: true,
        },
        relatives: {
            type: String,
            trim: true,
        },
        powerstats: {
            intelligence: {
                type: String,
                default: "",
            },
            strength: {
                type: String,
                default: "",
            },
            speed: {
                type: String,
                default: "",
            },
            durability: {
                type: String,
                default: "",
            },
            power: {
                type: String,
                default: "",
            },
            combat: {
                type: String,
                default: "",
            },
        },
        image: {
            type: String,
        },
        originalImage: {
            type: String,
        },
        nickname: {
            type: String,
            trim: true,
        }
    },
    {
        collection: "supermans",
    }
)

module.exports = mongoose.model("Superman", supermanSchema)
