const fs = require("node:fs/promises")
const path = require("node:path")

async function addCompare (data){
    // obtenemos el archivo de la cache
    // este servira para eitar la subida de archivos repetidos
    const src = path.join(__dirname, "../public/compare.json")

    try{
        const res = await fs.readFile(src, "utf-8")
        let parsedData = null

        // entra aqui si el archivo existe y si no tiene contenido
        if (!res) {
            const datos = JSON.stringify({data})
            await fs.writeFile(src, datos)
            return null
        }

        parsedData = JSON.parse(res)
        parsedData.data = [...parsedData.data,...data]
        const jsonData = JSON.stringify(parsedData)
        await fs.writeFile(src, jsonData)
    }catch(err){
        const content = JSON.stringify({ data})
        await fs.writeFile(src, content)
    }
}


module.exports = {
    addCompare
}