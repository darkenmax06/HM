import { CheckCircle2 } from "lucide-react"
import PropTypes from "prop-types"
import { createPortal } from "react-dom"
import "./successModal.css"

function SuccessModal  ({message,clearMessage}) {

  const element = (
    <div className="modal__container" > 
      <div className="modal" >
        <div className="icon">
           <CheckCircle2 strokeWidth={1} />
        </div>
        <div className="text__box">
          <p>{message}</p>
          <button onClick={clearMessage} >continuar</button>
        </div>
      </div>
    </div>
  )
  const container = document.body

  return createPortal(element, container)
}

SuccessModal.propTypes = {
  message: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired
}

export default SuccessModal