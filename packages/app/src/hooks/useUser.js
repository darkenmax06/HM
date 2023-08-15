import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { loginUser } from "../services/loginService";
import useError from "./useError";


// este es el UseUser
// este se encarga de gestionar la sesion del usuario
// osea, el login logout etc...

function useUser() {
  const { user, saveUser, logout } = useContext(userContext)
  const {error, errorHandler} = useError()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  const login = ({ userInfo }) => {
    if (userInfo.userName == "") return errorHandler({error: "debes proveer tu userName para poder loguearte"})
    if (userInfo.password == "") return errorHandler({error: "debes proveer tu password para poder loguearte"})

    setLoading(true)
    loginUser({ userInfo })
      .then(res => {
        saveUser(res)
        navigate("/search")
      }).catch(err => {
        errorHandler({error: err})
      })
      .finally(()=> setLoading(false))
  }
  
  const token = useMemo(() => user?.token, [user])

  return {
    user,
    saveUser,
    logout,
    login,
    error,
    token,
    loading
  }
}

export default useUser