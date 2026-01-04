const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dcxmwr4mj',
    api_key: '438451982634141',
    api_secret: 'lqhr7oCDXoMKma_owPak_Ls-_F8'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cse_courses',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const uploadCloud = multer({ storage: storage });

module.exports = { uploadCloud, cloudinary };
