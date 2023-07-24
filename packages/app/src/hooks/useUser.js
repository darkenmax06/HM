import { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { loginUser } from "../services/loginService";

function useUser() {
  const { user, saveUser, logout } = useContext(userContext)
  const [error, setError] = useState(null)
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

  const login = ({ userInfo }) => {
    if (userInfo.userName == "") return errorHandler("debes proveer tu userName para poder loguearte")
    if (userInfo.password == "") return errorHandler("debes proveer tu password para poder loguearte")

    loginUser({ userInfo })
      .then(res => {
        saveUser(res)
        navigate("/search")
      }).catch(err => {
        setError(err)
      })
  }

  const token = useMemo(() => user?.token, [user])

  return {
    user,
    saveUser,
    logout,
    login,
    error,
    token
  }
}

export default useUser