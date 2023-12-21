import readFile from "read-excel-file"
import useRegisters from "../../hooks/useRegisters"
import InputError from "../../components/InputError"
import SuccesModal from "../../components/modals/SuccessModal"
import "./createWithExcel.css"
import UserLayout from "../../components/UserLayout"
import Loader from "../../components/alerts/Loader"

function CreateWithExcel (){
    const fileUrl = "/api/public/plantilla-archivos.xlsx"
    const {createSomeRegister,error,message,clearMessage, loading} = useRegisters()

    const dragOverEvent = e => {
        e.preventDefault()
        console.log("a")
    }

    const handleDrop = async(e) =>{
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        const result = await readFile(file)
        const position ={}

        const results = result.map((row,y) =>{
            if (position.x){
                const hcn = result[y][position.x]
                const referencia = result[y][position.x + 1]
                const fechaDeIngreso = result[y][position.x + 2]
                const ubicacion = result[y][position.x +3]
                const fechaDeRecibo = result[y][position.x +4]
                const patologia = result[y][position.x +5]

                const register = {hcn,referencia,fechaDeIngreso,ubicacion,fechaDeRecibo,patologia}
                return register
            }

            row.some((value,x) => {
                console.log("valor de la pasada " + y + " " + value)
                if (typeof value === "string" && value.toLowerCase().includes("hcn")){
                    position.x=x
                    position.y=y
                    return true
                }
                
                return false 
            })
        })

        const parsedResults = results.filter(res => res !== undefined)
        console.log("resultados")
        console.log(parsedResults)
        createSomeRegister(parsedResults)
        e.target.value = ""
    }

    return (
        <UserLayout>
          <section className="upload">
            <div className="upload__box">
                <h2 className="upload__title" >Subir archivo de excel</h2>
                {
                  loading 
                  ? <Loader/>
                  : (
                      <div className="upload__drop" onDrop={handleDrop} onDragOver={dragOverEvent} >
                        Arrastre el archivo que desea subir aqui
                      </div>   
                  )
                } 
                {error && <InputError error={error} />}                  
                {message && <SuccesModal message={message} clearMessage={clearMessage} />}
                <p className="upload__plantilla" >En canso de que no tengas la plantilla puedes descargarla <a download href={fileUrl}>aqui</a> </p>
            </div>
        </section>
        </UserLayout>
    )
}

export default CreateWithExcel