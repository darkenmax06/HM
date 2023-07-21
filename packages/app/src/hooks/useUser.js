import { useContext } from "react";
import { userContext } from "../context/userContext";


function useUser() {
    const { user, saveUser } = useContext(userContext)

    return { user, saveUser }
}

export default useUser