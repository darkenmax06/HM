import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";


function Redirect({ type = null, goTo = "/login", children }) {
    const { user } = useUser()

    if (!user) return <Navigate to="/login" />
    else if (user.type !== type) return <Navigate to={goTo} />
    return <>{children}</>

}

export default Redirect