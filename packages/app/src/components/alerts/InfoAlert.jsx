import { Info } from "lucide-react"
import Alert from "./Alert"

function InfoAlert ({description, handleClose}){
  return (
    <Alert 
    title="message" 
    description={description}
    handleClose={handleClose}
    color="red">
      <Info/>
    </Alert>
  )
}

export default InfoAlert