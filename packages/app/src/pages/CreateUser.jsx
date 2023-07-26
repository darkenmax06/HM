import AdminLayout from "../components/AdminLayout"
import useField from "../hooks/useField"
import useUsers from "../hooks/useUsers"


function CreateUser  () {
  const {create, error, message} = useUsers()
  const name = useField("ingrese el nombre")
  const lastName = useField("ingrese el apellido")
  const password = useField("ingrese la password")
  const confirmPassword = useField("confirme la password")

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
  
  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} >
        <h2>crear usuario</h2>
        <div className="inputs">
          <input {...name} />
          <input {...lastName} />
          <input {...password} />
          <input {...confirmPassword} />
        </div>
        {error && <span> {error} </span> }
        {message && <span> {message} </span> }
        <button>enviar</button>
      </form>
    </AdminLayout>
  )
}

export default CreateUser