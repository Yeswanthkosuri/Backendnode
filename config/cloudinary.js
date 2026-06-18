require("dotenv").config()

const cloudinary = require("cloudinary").v2

const hasCloudinaryConfig = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
)

let cloudinaryImageUrl = ""

const createImageBuffer = () => {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="url(#bg)"/>
  <circle cx="600" cy="520" r="220" fill="#e11d48" opacity="0.18"/>
  <circle cx="600" cy="520" r="150" fill="#f59e0b" opacity="0.18"/>
  <text x="600" y="520" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="86" font-weight="700">SUPERMAN</text>
  <text x="600" y="610" text-anchor="middle" fill="#bfdbfe" font-family="Arial, sans-serif" font-size="40">CLOUDINARY</text>
</svg>`

    return Buffer.from(svg)
}

const initializeCloudinary = async () => {
    if (!hasCloudinaryConfig) {
        return ""
    }

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })

        const buffer = createImageBuffer()

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "superman-backend",
                    resource_type: "image",
                },
                (error, uploaded) => {
                    if (error) {
                        return reject(error)
                    }

                    resolve(uploaded)
                }
            )

            stream.end(buffer)
        })

        cloudinaryImageUrl = result.secure_url
        return cloudinaryImageUrl
    } catch (error) {
        cloudinaryImageUrl = ""
        return ""
    }
}

const getCloudinaryImageUrl = () => cloudinaryImageUrl

module.exports = {
    getCloudinaryImageUrl,
    hasCloudinaryConfig,
    initializeCloudinary,
}
