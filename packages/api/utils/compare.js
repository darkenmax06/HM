const fs = require("node:fs/promises")
const path = require("node:path")

async function compare (data){
    const src = path.join(__dirname, "../public/compare.json")

    try{
        const res = await fs.readFile(src, "utf-8")
        if (!res) return null

        const parsedData = JSON.parse(res)
        for (let i = 0; i < data.length; i++){
            const currentData = data[i]

            const hasMatch = parsedData.data.find(res =>{
                if (res.hcn == currentData.hcn && res.fechaDeIngreso == currentData.fechaDeIngreso) return true
            })

            if (hasMatch) throw {
                name: "MATCH_FOUND",
                data: hasMatch
            }
        }

    }catch(err){
        if (err?.code) return null
        throw err
    }
}


module.exports = {compare}