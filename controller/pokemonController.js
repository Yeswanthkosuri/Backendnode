const mongoose = require("mongoose")
const Pokemon = require("../models/Pokemon")
const { getPokemonByNameOrId, getPokemonList } = require("../services/pokeApi")

exports.addPokemon = async (req, res) => {
    try {
        const pokemonKey = req.body.pokemonId || req.body.name

        if (!pokemonKey) {
            return res.status(400).json({
                message: "send pokemonId or name to add a pokemon",
            })
        }

        const pokemon = await getPokemonByNameOrId(pokemonKey)

        const savedPokemon = await Pokemon.findOneAndUpdate(
            { pokemonId: pokemon.pokemonId },
            {
                ...pokemon,
                image: req.file?.path || pokemon.image,
                nickname: req.body.nickname,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        )

        res.status(201).json({
            message: "pokemon added from PokeAPI",
            pokemon: savedPokemon,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.getAllPokemon = async (req, res) => {
    try {
        const savedPokemon = await Pokemon.find().sort({ pokemonId: 1 })
        const limit = Number(req.query.limit) || 20
        const offset = Number(req.query.offset) || 0
        const pokemon = savedPokemon.length > 0 ? savedPokemon : await getPokemonList(limit, offset)

        res.status(200).json({
            message: savedPokemon.length > 0 ? "saved pokemon details" : "live pokemon details from PokeAPI",
            pokemon,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.getPokemonById = async (req, res) => {
    try {
        let pokemon = null

        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            pokemon = await Pokemon.findById(req.params.id)
        }

        if (!pokemon) {
            pokemon = await getPokemonByNameOrId(req.params.id)
        }

        res.status(200).json({
            message: "pokemon details",
            pokemon,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.updatePokemon = async (req, res) => {
    try {
        const updateBody = {
            nickname: req.body.nickname,
        }

        if (req.body.image) {
            updateBody.image = req.body.image
        }

        const pokemon = await Pokemon.findByIdAndUpdate(
            req.params.id,
            updateBody,
            {
                new: true,
                runValidators: true,
            }
        )

        if (!pokemon) {
            return res.status(404).json({
                message: "pokemon not found",
            })
        }

        res.status(200).json({
            message: "pokemon updated",
            pokemon,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.deletePokemon = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id)

        if (!pokemon) {
            return res.status(404).json({
                message: "pokemon not found",
            })
        }

        res.status(200).json({
            message: "pokemon deleted",
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}
