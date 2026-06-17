const express = require("express")
const multer = require("multer")
const {
    addPokemon,
    getAllPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon,
} = require("../controller/pokemonController")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage
})

router.post("/add/pokemon", upload.single("image"), addPokemon)
router.get("/get/pokemons", getAllPokemon)
router.get("/get/pokemons/:id", getPokemonById)
router.put("/update/pokemons/:id", updatePokemon)
router.delete("/del/pokemons/:id", deletePokemon)

module.exports = router
