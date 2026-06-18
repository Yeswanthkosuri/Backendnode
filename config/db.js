const mongoose = require("mongoose")
const Superman = require("../models/Superman")
const { getSeedSupermans } = require("../services/supermanApi")
const { getCloudinaryImageUrl } = require("./cloudinary")

const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not set")
        }

        await mongoose.connect(mongoUri)
        await Superman.syncIndexes()
        const seedSupermans = getSeedSupermans()
        const seedIds = seedSupermans.map((item) => item.heroId)
        const cloudinaryImage = getCloudinaryImageUrl()

        await Superman.deleteMany({ heroId: { $nin: seedIds } })

        for (const seed of seedSupermans) {
            await Superman.updateOne(
                { heroId: seed.heroId },
                {
                    $set: {
                        ...seed,
                        image: cloudinaryImage || seed.image,
                        originalImage: cloudinaryImage || seed.image,
                    },
                },
                {
                    upsert: true,
                }
            )
        }

        console.log("db connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb
