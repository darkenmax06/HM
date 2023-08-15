import PropTypes from "prop-types"
import { formatDate } from "../../utils/formatDate"
import DisableButton from "../buttons/DisableButton"
import EnableButton from "../buttons/EnableButton"
import UpdateButton from "../buttons/UpdateButton"
import "./userItem.css"

function UserItem  (props) {
  const {
    id,
    name,
    lastName,
    userName,
    createAt,
    type,
    handleDisable,
    disable
  } = props

  const fFechaDeCreacion =formatDate(createAt)
  return (          
  <ul className="user__item" >
    <li >{name}</li>
    <li >{lastName}</li>
    <li >{userName}</li>
    <li >{fFechaDeCreacion}</li>
    <li >{type}</li>
    {disable 
      ? <EnableButton handleEnable={ ()=> handleDisable({id, disabled: !disable}) } />
      : <DisableButton handleDisable={ ()=> handleDisable({id, disabled: !disable})} />
    }
    <UpdateButton goTo={`/managment/${id}`} title="cambiar contraseña" />
  </ul>
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

export default UserItem