import { ChevronRight, Loader2 } from "lucide-react";
import "./makeAction.css";


function MakeAction ({isLoading,title, handleClick = ()=>{}}){
  return (
    <button className="action" onClick={handleClick} >
      {title} 
      {isLoading
        ? <i id="action__loading" ><Loader2/></i> 
        : <ChevronRight/>}
    </button>
  )
}

export default MakeAction