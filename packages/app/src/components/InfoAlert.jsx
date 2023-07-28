import PropTypes from "prop-types"
import "./infoAlert.css"

function InfoAlert  ({info}) {
  return (
    <div className="info__alert" > {info} </div>
  )
}

InfoAlert.propTypes = {
  info: PropTypes.string.isRequired
}

export default InfoAlert