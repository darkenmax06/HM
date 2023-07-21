import { useContext, useRef, useState } from "react"
import { create } from "../services/adminServices"
import { userContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

function useAdmin() {
    const { saveUser } = useContext(userContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const timeOut = useRef()

    const errorHandler = (err) => {
        console.log(error)
        if (timeOut.current) {
            clearInterval(timeOut.current)
        }
        setError(err)
        timeOut.current = setTimeout(() => setError(null), 5000)
    }

    const createAdmin = (admin) => {
        if (admin.name.length < 2) return errorHandler("el nombre debe ser mayor a 2 caracteres")
        else if (admin.lastName.length < 2) return errorHandler("el apellido debe ser mayor a 2 caracteres")
        else if (admin.password.length < 4) return errorHandler("la password debe ser mayor a 4 caracteres")
        else if (admin.key == "") return errorHandler("debe proporcionar la key para poder realizar esta accion")

        setLoading(true)

        create({ admin })
            .then(res => {
                saveUser(res)
                console.log(res)
                navigate("/home")
            })
            .catch(err => {
                console.log(err)
                errorHandler(err.error)
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