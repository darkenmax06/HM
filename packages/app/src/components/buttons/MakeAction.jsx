import { ChevronRight } from "lucide-react";
import "./makeAction.css";


function MakeAction ({title, handleClick = ()=>{}}){
  return (
    <button className="action" onClick={handleClick} >
      {title} 
      <ChevronRight/> 
    </button>
  )
}

export default MakeAction