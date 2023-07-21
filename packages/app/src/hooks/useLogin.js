import { useContext } from "react"
import { userContext } from "../context/userContext"

function useLogin() {
    const { saveUser } = useContext(userContext)
}

return useLogin