
const tesseract = require("tesseract.js")

function controllers(req,res){
    try {
        ///////////////for pan card//////////////////////
        let data=req.query
        let {type}=data
        if(type==='panCard'){
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
                    'idtype': type,
                    "idNumber": allData[7].replace('*', '').trim(),
                    'info': {
                        "name": allData[2],
                        "fatherName": father.trim(),
                        "dob": `${d[0]}${d[1]}/${d[2]}${d[3]}/${d[5]}${d[6]}${d[7]}${d[8]}`
                    }
                }
            })
        })
    }
    //////////////////////////for Adhar///////////
    if(type==='Adhar'){
        tesseract.recognize(
            'uploads/' + req.file.filename,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            
             let allData = text.split("\n")
             let str=''
             for(let i=0;i<allData.length;i++){
                var expr = /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                let res=expr.test(allData[i])
                if(res===true){
                  str=allData[i]
                }
             }
            
            let gender=allData[5].split(' ')
            let dob=allData[4].split(' ')
            return res.json({
                message: {
                    
                     'idtype': type,
                     "idNumber": str,
                     'info': {
                        "name": allData[3].replace('¥','').trim(),
                        'DOB':dob[4],
                         "gender": gender[4].replace('/',''),
                  
                     }
                }
            })
        })
    }
   
   
    } catch (error) {
        console.error(error)
    }
}



module.exports={controllers}
