import PropTypes from "prop-types"
import "./inputError.css"

function InputError  ({error}) {
  return (
    <div className="input__error" > {error} </div>
  )
}

InputError.propTypes = {
  error: PropTypes.string
}

export default InputError

