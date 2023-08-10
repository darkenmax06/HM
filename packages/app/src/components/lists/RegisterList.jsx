import PropTypes from "prop-types"
import { formatDate } from "../../utils/formatDate"
import DeleteButton from "../buttons/DeleteButton"
import UpdateButton from "../buttons/UpdateButton"
import "./registerList.css"

function RegisterList  ({children}) {
  return (
    <div className="registers__list" >
      {children}
    </div>
  )
}

export  function RegisterItem({
  id,
  hcn,
  referencia,
  fechaDeIngreso,
  ubicacion,
  fechaDeRecibo,
  fechaDeProceso,
  patologia,
  usuario,
  handleDelete
}){

  const fFechaDeIngreso = formatDate(fechaDeIngreso)
  const fFechaDeRecibo = formatDate(fechaDeRecibo)
  const fFechaDeProceso = formatDate(fechaDeProceso)
  
  
  return (
    <ul className="register__item" >
      <li><b>hcn:</b> {hcn} </li>
      <li><b>referencia:</b> {referencia} </li>
      <li><b>fecha de ingreso:</b> {fFechaDeIngreso} </li>
      <li><b>ubicacion:</b> {ubicacion} </li>
      <li><b>fecha de recibo:</b> {fFechaDeRecibo} </li>
      <li><b>fecha del proceso:</b> {fFechaDeProceso} </li>
      <li><b>usuario:</b> {usuario} </li>
      <li><b className="patologia" >patologia:</b> {patologia} </li>
      <div className="actions">
        <DeleteButton handleClick={()=> handleDelete({id})} />
        <UpdateButton goTo={`/update/registers/${id}`} />
      </div>
    </ul>
  )
}

RegisterItem.propTypes = {
  id: PropTypes.string.isRequired,
  hcn: PropTypes.string.isRequired,
  referencia: PropTypes.string.isRequired,
  fechaDeIngreso: PropTypes.string.isRequired,
  ubicacion: PropTypes.string.isRequired,
  fechaDeRecibo: PropTypes.string.isRequired,
  fechaDeProceso: PropTypes.string.isRequired,
  patologia: PropTypes.string.isRequired,
  usuario: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default RegisterList