import { useNavigate, useParams } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import InputError from "../../components/InputError"
import MakeAction from "../../components/buttons/MakeAction"
import SuccessModal from "../../components/modals/SuccessModal"
import useField from "../../hooks/useField"
import useUsers from "../../hooks/useUsers"
import "./changePassword.css"


function ChangePassword  () {
  const {id} = useParams()
  const navigate = useNavigate()
  const {replacePassword, error, message, clearMessage} = useUsers()
  const [password] = useField({placeholder: "ingrese la nueva password", type: "password"})
  const [confirmPassword] = useField({placeholder: "confirme la password", type: "password"})

  const handleSubmit = event => {
    event.preventDefault()

    const data = {
      password: password.value,
      confirmPassword: confirmPassword.value,
      id
    }

    replacePassword({data})
  }

  const handleClose = ()=>{
    clearMessage()
    navigate("/managment")
  }

  return (
    <AdminLayout>
      <form className="change__password" onSubmit={handleSubmit} >
        <h2>cambiar contraseña</h2>
        <div className="inputs">
          <input {...password} />
          <input {...confirmPassword} />
          {error && <InputError error={error} />}
        </div>
        {message && <SuccessModal message={message} clearMessage={handleClose} /> }
        <MakeAction title="Cambiar" />
      </form>
    </AdminLayout>
  )
}

export default ChangePassword