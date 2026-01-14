const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authorization = require("../middleware/authorization");

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "acecoder-blogs",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1200, crop: "limit" }] // Max width 1200px
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/upload/image - Upload image to Cloudinary
router.post("/image", authorization, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }

        res.json({
            success: true,
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Failed to upload image" });
    }
});

module.exports = router;
