const mongoose = require("mongoose")

const pokemonSchema = new mongoose.Schema({
    pokemonId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    baseExperience: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    types: {
        type: [String],
        default: [],
    },
    abilities: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
    },
    nickname: {
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model("Pokemon", pokemonSchema)
