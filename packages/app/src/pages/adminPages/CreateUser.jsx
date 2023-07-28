import AdminLayout from "../../components/AdminLayout"
import MakeAction from "../../components/buttons/MakeAction"
import SuccessModal from "../../components/modals/SuccessModal"
import useField from "../../hooks/useField"
import useUsers from "../../hooks/useUsers"
import "./createUser.css"

function CreateUser  () {
  const {create, error, message, clearMessage} = useUsers()
  const [name, resetName] = useField({placeholder:"ingrese el nombre"})
  const [lastName, resetLastName] = useField({placeholder:"ingrese el apellido"})
  const [password, resetPassword] = useField({placeholder: "ingrese la password", type: "password"})
  const [confirmPassword,resetCP] = useField( {placeholder: "confirme la password", type: "password"})

  const handleSubmit = event =>{
    event.preventDefault()

    const data = {
      name:name.value.trim(),
      lastName: lastName.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim()
    }

    create({data})
  }

  const handleClose = ()=>{
    clearMessage()
    resetCP()
    resetLastName()
    resetName()
    resetPassword()
  }
  
  return (
    <AdminLayout>
      <form className="create__user__form"  onSubmit={handleSubmit} >
        <h2>crear usuario</h2>
        <div className="inputs">
          <input {...name} />
          <input {...lastName} />
          <input {...password} />
          <input {...confirmPassword} />
        </div>
        {error && <span> {error} </span> }
        {message && <SuccessModal message={message} clearMessage={handleClose} />}
        <MakeAction title="crear usuario"/>
        
      </form>
    </AdminLayout>
  )
}

export default CreateUser