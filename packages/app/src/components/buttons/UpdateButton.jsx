import { RefreshCcw } from "lucide-react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import "./updateButton.css"

function UpdateButton  ({goTo, title = "actualizar"}) {
  return (
    <Link className="update__btn" to={goTo} > {title} <RefreshCcw/> </Link>
  )
}

UpdateButton.propTypes = {
  goTo: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default UpdateButton