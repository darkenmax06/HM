import PropTypes from "prop-types"
import { useState } from "react"
import InputError from "../../components/InputError"
import MakeAction from "../../components/buttons/MakeAction"
import useField from "../../hooks/useField"
import useRegisters from "../../hooks/useRegisters"
import { formatCH } from "../../utils/formatCH"
import { formatInputDate } from "../../utils/formatDate"
import SuccessModal from "../modals/SuccessModal"
import "./registerForm.css"

function RegisterForm  (props) {
  const [editMode] = useState(()=> props.hcn != undefined)
  const { createRegister, error, updateRegister, message,clearMessage ,loading} = useRegisters()

  const fUbicacion = props.ubicacion && formatCH(props.ubicacion)
  const fFechaDeIngreso = props.ubicacion && formatInputDate(props.fechaDeIngreso)
  const fFechaDeRecibo = props.ubicacion && formatInputDate(props.fechaDeRecibo)

  const [hcn,resetHcn] = useField({placeholder: "hcn", initialValue: props.hcn})
  const [referencia, resetReferencia] = useField({placeholder: "referencia", initialValue: props.referencia})
  const [fechaDeIngreso, resetFDI] = useField({placeholder: "fecha de ingreso",initialValue:fFechaDeIngreso , type: "date"})
  const [ubicacion, resetUbucacion] = useField({placeholder :"ubicacion (0000-0000)", initialValue: fUbicacion})
  const [fechaDeRecibo, resetFDR] = useField({placeholder: "fecha de recibo", type: "date", initialValue: fFechaDeRecibo})
  const [patologia, resetPatologia] = useField({placeholder: "patologia", initialValue: props.patologia})

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

    if (editMode) {
      updateRegister({data, id: props.id})
    }
    else createRegister({ data })
  }

  const handleClear = ()=>{
      clearMessage()
      resetHcn()
      resetFDI()
      resetFDR()
      resetPatologia()
      resetReferencia()
      resetUbucacion()
  }

  return (
    <form onSubmit={handleSubmit} className="register__form" >
    <h2> {props.title || "Crear Registros"  } </h2>
    <div className="inputs">
      <div>
        <label htmlFor="hcn">hcn</label>
        <input id="hcn" {...hcn} />
      </div>
      <div>
        <label htmlFor="referencia">referencia</label>
      <input id="referencia" {...referencia} />
      </div>
      <div>
        <label htmlFor="fecha-de-ingreso">fecha de ingreso</label>
      <input id="fecha-de-ingreso" {...fechaDeIngreso} />
      </div>
      <div>
        <label htmlFor="ubicacion">ubicacion</label>
      <input id="ubicacion" {...ubicacion} />
      </div>
      <div>
        <label htmlFor="fecha-de-recibo">fecha de recibo</label>
      <input id="fecha-de-recibo" {...fechaDeRecibo} />
      </div>
      <div>
        <label htmlFor="patologia">patologia</label>
      <textarea id="patologia" {...patologia}></textarea>
      </div>
    </div>
    {error && <InputError error={error} />}
    <MakeAction isLoading={loading} title={editMode ? "Actualizar Registro": "Crear Registro" } />
    {message && <SuccessModal message={message} clearMessage={handleClear} />}
  </form>
  )
}

RegisterForm.propTypes = {
  hcn: PropTypes.string,
  ubicacion : PropTypes.string,
  fechaDeRecibo: PropTypes.string,
  fechaDeIngreso: PropTypes.string,
  referencia : PropTypes.string,
  patologia: PropTypes.string,
  id : PropTypes.string,
}

export default RegisterForm