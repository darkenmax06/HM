import { UserCheck } from "lucide-react";
import "./enableButton.css";

function EnableButton ({handleEnable}){
  return (
    <button onClick={handleEnable} id="button__enable" >
      Habilitar <UserCheck/>
    </button>
  )
}

export default EnableButton