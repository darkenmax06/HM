import { LogOutIcon } from "lucide-react"
import PropTypes from "prop-types"
import "./logoutButton.css"

function LogoutButton  ({handleClick}) {
  return (
    <button 
    className="logout__button"
    onClick={handleClick} >
      Cerrar Sesion <LogOutIcon/>
    </button>
  )
}

LogoutButton.displayName = "LogoutButton"
LogoutButton.propTypes = {
  handleClick: PropTypes.func
}

export default LogoutButton