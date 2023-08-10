import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/userContext"
import { create } from "../services/adminServices"
import useError from "./useError"

function useAdmin() {
    const { saveUser } = useContext(userContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {error,errorHandler} = useError()

    const createAdmin = (admin) => {
      console.log(admin)
        if (admin.name.length < 2) return errorHandler({error: "el nombre debe ser mayor a 2 caracteres"})
        else if (admin.lastName.length < 2) return errorHandler({error: "el apellido debe ser mayor a 2 caracteres"})
        else if (admin.userName.length < 2) return errorHandler({error: "el userName debe ser mayor a 2 caracteres"})
        else if (admin.password.length < 4) return errorHandler({error: "la password debe ser mayor a 4 caracteres"})
        else if (admin.key == "") return errorHandler({error: "debe proporcionar la key para poder realizar esta accion"})

        setLoading(true)

        create({ admin })
            .then(res => {
                saveUser(res)
                console.log(res)
                navigate("/managment")
            })
            .catch(err => {
                console.log(err)
                errorHandler({error: err.error})
            })
            .finally(() => setLoading(false))
    }

    return {
        error,
        loading,
        createAdmin
    }
}

export default useAdmin