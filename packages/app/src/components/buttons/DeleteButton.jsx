import { Trash2 } from "lucide-react"
import PropTypes from "prop-types"
import "./deleteButton.css"

function DeleteButton  ({handleClick}) {
  return (
    <button className="delete__btn" onClick={handleClick} >
      Eliminar <Trash2/>
    </button>
  )
}

DeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default DeleteButton