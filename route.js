const express=require('express')

const {controllers}=require('./app')
const multer = require("multer");

const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


router.post("/upload",upload.single('profile'),controllers)
  

module.exports =router