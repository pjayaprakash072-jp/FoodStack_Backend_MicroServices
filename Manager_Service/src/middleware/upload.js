const multer = require('multer')
const cloudinary = require('../config/cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage(
    {
        cloudinary:cloudinary,
        params:{
            folder:"foodstack",
            allowed_formats:["jpg","jpeg","png"]
        }
    }
)
const upload = multer(
    {storage}
)
module.exports = upload;