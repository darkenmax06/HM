import { UserX } from "lucide-react";
import "./disableButton.css";

function DisableButon ({handleDisable}){
  return (
    <button onClick={handleDisable} className="disable__button" >
      Desabilitar <UserX/> 
    </button>
  )
}

export default DisableButon