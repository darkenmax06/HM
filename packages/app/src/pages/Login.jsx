import { useEffect } from "react"
import InputError from "../components/InputError"
import MakeAction from "../components/buttons/MakeAction"
import useField from "../hooks/useField"
import useUser from "../hooks/useUser"
import "./Login.css"

function Login  () {
  const {logout,error,login} = useUser()
  const [userName] = useField({placeholder: "ingrese su userName"})
  const [password] = useField({placeholder:"ingrese su password", type:"password"})

  useEffect(()=>{
    logout()
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
         {error && <InputError error={error}/>}
        </div>
      <MakeAction title="Iniciar Sesion"/>
      </form>
    </section>
  )
}

export default Login