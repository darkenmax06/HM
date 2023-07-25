

function RegisterList  ({children}) {
  return (
    <div>
      {   children      }
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
  
  return (
    <ul>
      <li>id: {id} </li>
      <li>hcn: {hcn} </li>
      <li>referencia: {referencia} </li>
      <li>fecha de ingreso: {fechaDeIngreso} </li>
      <li>ubicacion: {ubicacion} </li>
      <li>fecha de recibo: {fechaDeRecibo} </li>
      <li>fecha del proceso: {fechaDeProceso} </li>
      <li>patologia: {patologia} </li>
      <li>usuario: {usuario} </li>
      <div className="actions">
        <button onClick={()=> handleDelete({id})} >delete</button>
      </div>
    </ul>
  )
}

export default RegisterList