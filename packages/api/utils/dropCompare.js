const {unlink} = require("node:fs/promises")
const path = require("node:path")

function dropCompare ({interval}){
    // Esto es temporal, despues se hara para que se elimine
    // por el lote y no todo
    const dias = interval* 1000 *60 *60 *24
    setInterval(async()=>{
        const src = path.join(__dirname, "../public/compare.json")
        try{
            await unlink(src)
        }catch(err){
            return null
        }finally{
            console.log("archivo eliminado")
        }

    }, dias)
}

dropCompare({interval:3})