import PropTypes from "prop-types"
import { formatDate } from "../../utils/formatDate"
import UpdateButton from "../buttons/UpdateButton"
import "./userList.css"

function UserItem  ({
  id,
  name,
  lastName,
  userName,
  createAt,
  type,
  handleDisable,
  disable
}) {

  const fFechaDeCreacion =formatDate(createAt)
  return (          
  <ul className="user__item" >
    <li >{name}</li>
    <li >{lastName}</li>
    <li >{userName}</li>
    <li >{fFechaDeCreacion}</li>
    <li >{type}</li>
    <button 
    className={disable ? "disable": "enable"}
     onClick={ ()=> handleDisable({id, disabled: !disable}) } > 
      {disable ? "habilitar": "desabilitar"} 
      </button>
    <UpdateButton goTo={`/managment/${id}`} title="cambiar contraseña" />
  </ul>
  )
}

function UserList  ({children}) {
  return (
    <div className="user__list" >
      <ul className="schema" >
        <li>nombre</li>
        <li>apellido</li>
        <li>UserName</li>
        <li>fecha de creacion</li>
        <li>tipo</li>
        <li>acciones</li>
      </ul>
      <div>
        {children}
      </div>
    </div>
  )
}


UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  handleDisable: PropTypes.func.isRequired
}

export default UserList
export {
  UserItem
}
