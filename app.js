const express = require('express');
const tesseract = require("tesseract.js")
const app = express();
const multer = require("multer");




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single('profile'), (req, res) => {
    // console.log(req.file)
    try {
        tesseract.recognize(
            'uploads/' + req.file.filename,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            let allData = text.split("\n")
            let dob = allData[4].split(' ')
            let n = allData[3].replace('o', '')
            let father = n.replace('t', '')
            let d = dob[0].split('')
            return res.json({
                message: {
                    'idtype': 'panCard',
                    "idNumber": allData[7].replace('*', '').trim(),
                    'info': {
                        "name": allData[2],
                        "fatherName": father.trim(),
                        "dob": `${d[0]}${d[1]}/${d[2]}${d[3]}/${d[5]}${d[6]}${d[7]}${d[8]}`
                    }
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
})

app.listen(3000, () => {
    console.log("server up and running");
})