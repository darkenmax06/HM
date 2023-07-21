import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";


function Redirect({ children }) {
    const { user } = useUser()
    console.log(user)
    if (!user) return <Navigate to="/login" />
    return <>{children}</>

}

export default Redirect