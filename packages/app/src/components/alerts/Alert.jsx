import { X } from "lucide-react"
import PropTypes from "prop-types"
import { useEffect } from "react"
import "./alert.css"

function Alert ({
  title = "alert",
  time = 5000,
  description,
  handleClose,
  color = "black",
  children: Icon
}){

  useEffect(()=>{
    const timeOut = setTimeout(
      ()=> {
        console.log("a")
        handleClose()
      },
      time
    )

    return ()=> clearTimeout(timeOut)
  },[handleClose, time])

  return (
    <div className="alert" >
      <div className="line" style={{"--color": color}} ></div>

      <div className="icon">
        {Icon}
      </div>

      <div className="text__box">
        <h3 className="title" > {title} </h3>
        <p className="description" > {description} </p>
      </div>

      <div className="exit">
        <i onClick={handleClose}>
          <X/>
        </i>
      </div>
    </div>
  )
}

Alert.proptypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired
}

export default Alert