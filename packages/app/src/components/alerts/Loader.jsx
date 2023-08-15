import { Loader2 } from "lucide-react";
import "./loader.css";

function Loader ({size = 50}){
  return (
    <div id="loader" >
      <Loader2 size={size} />
    </div>
  )
}

export default Loader