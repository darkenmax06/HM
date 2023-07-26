import { ChevronRight } from "lucide-react"
import { useEffect } from "react"
import useField from "../hooks/useField"
import useUser from "../hooks/useUser"

function Login  () {
  const {logout,error,login} = useUser()
  const userName = useField("ingrese su userName")
  const password = useField("ingrese su password", "password")

  useEffect(()=>{
    logout()
    document.title = 'Iniciar Sesion'
  },[logout])

  const handleSubmit = event =>{
    event.preventDefault()
    console.log("logueado")  
    const userInfo = {
      userName: userName.value,
      password: password.value
    }

    login({userInfo})
  }

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesion</h2>

        <div className="inputs">
          <input {...userName} />
          <input {...password} />
        </div>
      {error && <span>{error}</span>}
        <button>iniciar sesion <ChevronRight/> </button>
      </form>
    </section>
  )
}

export default Login