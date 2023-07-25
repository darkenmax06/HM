import UserLayout from "../components/UserLayout"
import useField from "../hooks/useField"
import useRegisters from "../hooks/useRegisters"

// REFERENCIA
// {
//   "hcn": "juan",
//   "referencia":"asdasd sa das as",
//   "fechaDeIngreso": "11/6/2023",
//   "ubicacion": "ch-0000-0000",
//   "fechaDeRecibo": "12/6/2023",
//   "patologia": "el paciente sufrio una lesion de la rodilla"
// }

function Create() {
  const hcn = useField("hcn")
  const referencia = useField("referencia")
  const fechaDeIngreso = useField("fechaDeIngreso", "date")
  const ubicacion = useField("ubicacion")
  const fechaDeRecibo = useField("fechaDeRecibo", "date")
  const patologia = useField("patologia")

  const { createRegister, error } = useRegisters()

  const handleSubmit = event => {
    event.preventDefault()

    const data = {
      hcn: hcn.value,
      referencia: referencia.value,
      fechaDeIngreso: fechaDeIngreso.value,
      ubicacion: ubicacion.value,
      fechaDeRecibo: fechaDeRecibo.value,
      patologia: patologia.value
    }

    console.log(data)

    createRegister({ data })
  }

  return (
    <UserLayout>
      <form onSubmit={handleSubmit} className="create__register" >
        <h2>crear registro</h2>
        <div className="inputs">
          <input {...hcn} />
          <input {...referencia} />
          <input {...fechaDeIngreso} />
          <input {...ubicacion} />
          <input {...fechaDeRecibo} />
          <textarea {...patologia}></textarea>
        </div>
        {error && <span>{error}</span>}
        <button>Crear</button>
      </form>
    </UserLayout>
  )
}


export default Create